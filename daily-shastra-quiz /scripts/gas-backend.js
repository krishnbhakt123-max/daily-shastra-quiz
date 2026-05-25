/**
 * Daily Shastra Quiz — Google Apps Script Backend
 * 
 * SETUP:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file
 * 3. Replace SHEET_ID below with your Sheet ID (from the URL)
 * 4. Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL → paste in Vercel env as NEXT_PUBLIC_GAS_URL
 */

const SHEET_ID = '19C3JtGxjH7tIJdrAIkUAhnzFlsl0y-GdzN-yQN09M6o'; // ← REPLACE THIS

function doGet(e)  { return handle(e); }
function doPost(e) { return handle(e); }

function handle(e) {
  const out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  try {
    const p = e.parameter || {};
    const body = e.postData ? JSON.parse(e.postData.contents || '{}') : {};
    const data = Object.assign({}, p, body);
    let result;
    switch (data.action) {
      case 'getQuestions':   result = getQuestions(data);   break;
      case 'registerUser':   result = registerUser(data);   break;
      case 'getUser':        result = getUser(data);        break;
      case 'submitQuiz':     result = submitQuiz(data);     break;
      case 'getLeaderboard': result = getLeaderboard(data); break;
      case 'updateStreak':   result = updateStreak(data);   break;
      default: throw new Error('Unknown action: ' + data.action);
    }
    out.setContent(JSON.stringify({ success: true, data: result }));
  } catch(err) {
    out.setContent(JSON.stringify({ success: false, error: err.message }));
  }
  return out;
}

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
// Reads questions from the "Questions" sheet
// You can add/edit rows directly in the sheet and they appear in quizzes live

function getQuestions(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Questions');
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0]; // LessonID, Question, OptionA, OptionB, OptionC, OptionD, CorrectIndex, Explanation, Difficulty

  let questions = rows.slice(1)
    .filter(r => r[0] && r[1]) // skip empty rows
    .map(r => ({
      lessonId:     String(r[0]).trim(),
      question:     String(r[1]).trim(),
      options:      [String(r[2]), String(r[3]), String(r[4]), String(r[5])],
      correctIndex: parseInt(r[6]) || 0,
      explanation:  String(r[7] || ''),
      difficulty:   String(r[8] || 'beginner').toLowerCase(),
    }));

  // Filter by lessonId if provided
  if (data.lessonId && data.lessonId !== 'random') {
    questions = questions.filter(q => q.lessonId === data.lessonId);
  }

  // Shuffle and limit to 5
  questions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
  return { questions };
}

// ─── USERS ────────────────────────────────────────────────────────────────────

function registerUser(data) {
  const { username } = data;
  if (!username) throw new Error('Username required');
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Users');
  const existing = findUserRow(username, sheet);
  if (existing) return { user: rowToUser(existing.row), isNew: false };

  const now = new Date().toISOString();
  const newRow = [username, 0, 1, 'Seeker 🌱', 0, now, 0, 0];
  sheet.appendRow(newRow);
  return {
    user: { username, xp: 0, level: 1, badge: 'Seeker 🌱', streak: 0, lastActive: now, totalQuizzes: 0, perfectScores: 0 },
    isNew: true
  };
}

function getUser(data) {
  const { username } = data;
  if (!username) throw new Error('Username required');
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Users');
  const found = findUserRow(username, sheet);
  if (!found) throw new Error('User not found');
  return { user: rowToUser(found.row) };
}

function findUserRow(username, sheet) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === String(username).toLowerCase()) {
      return { row: values[i], rowIndex: i + 1 };
    }
  }
  return null;
}

function rowToUser(row) {
  return {
    username:     String(row[0]),
    xp:           Number(row[1]) || 0,
    level:        Number(row[2]) || 1,
    badge:        String(row[3] || 'Seeker 🌱'),
    streak:       Number(row[4]) || 0,
    lastActive:   String(row[5] || ''),
    totalQuizzes: Number(row[6]) || 0,
    perfectScores:Number(row[7]) || 0,
  };
}

// ─── QUIZ SUBMISSION ──────────────────────────────────────────────────────────

function submitQuiz(data) {
  const { username, lessonId, score, total } = data;
  if (!username || !lessonId) throw new Error('Missing fields');

  const accuracy   = Math.round((score / total) * 100);
  const isPerfect  = score === parseInt(total);
  let xpEarned     = score * 20 + 50; // 20 per correct + 50 completion bonus
  if (isPerfect) xpEarned += 50;      // perfect score bonus

  const ss          = SpreadsheetApp.openById(SHEET_ID);
  const usersSheet  = ss.getSheetByName('Users');
  const attSheet    = ss.getSheetByName('Attempts');

  // Log attempt
  attSheet.appendRow([username, lessonId, score, total, accuracy, xpEarned, new Date().toISOString()]);

  // Update user
  const found = findUserRow(username, usersSheet);
  if (!found) throw new Error('User not found. Register first.');

  const user       = rowToUser(found.row);
  const newXP      = user.xp + xpEarned;
  const newLevel   = calcLevel(newXP);
  const newBadge   = calcBadge(newXP, user.streak);
  const newTotal   = user.totalQuizzes + 1;
  const newPerfect = user.perfectScores + (isPerfect ? 1 : 0);

  // Update streak
  const newStreak = calcStreak(user.lastActive, user.streak);

  usersSheet.getRange(found.rowIndex, 2).setValue(newXP);
  usersSheet.getRange(found.rowIndex, 3).setValue(newLevel);
  usersSheet.getRange(found.rowIndex, 4).setValue(newBadge);
  usersSheet.getRange(found.rowIndex, 5).setValue(newStreak);
  usersSheet.getRange(found.rowIndex, 6).setValue(new Date().toISOString());
  usersSheet.getRange(found.rowIndex, 7).setValue(newTotal);
  usersSheet.getRange(found.rowIndex, 8).setValue(newPerfect);

  // Update leaderboard
  syncLeaderboard(ss);

  return { xpEarned, newXP, newLevel, newBadge, newStreak, isPerfect, accuracy, leveledUp: newLevel > user.level };
}

// ─── STREAK ───────────────────────────────────────────────────────────────────

function updateStreak(data) {
  const { username } = data;
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Users');
  const found = findUserRow(username, sheet);
  if (!found) throw new Error('User not found');
  const user = rowToUser(found.row);
  const newStreak = calcStreak(user.lastActive, user.streak);
  sheet.getRange(found.rowIndex, 5).setValue(newStreak);
  sheet.getRange(found.rowIndex, 6).setValue(new Date().toISOString());
  return { newStreak };
}

function calcStreak(lastActive, currentStreak) {
  if (!lastActive) return 1;
  const last = new Date(lastActive);
  const now  = new Date();
  const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  if (diff === 0) return currentStreak; // same day
  if (diff === 1) return currentStreak + 1; // next day
  return 1; // streak broken
}

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────

function getLeaderboard(data) {
  const { type = 'xp', limit = 50 } = data;
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Leaderboard');
  const rows  = sheet.getDataRange().getValues();

  let entries = rows.slice(1)
    .filter(r => r[1])
    .map(r => ({
      rank:        Number(r[0]),
      username:    String(r[1]),
      xp:          Number(r[2]) || 0,
      badge:       String(r[3] || ''),
      streak:      Number(r[4]) || 0,
      totalQuizzes:Number(r[5]) || 0,
    }));

  // Sort by type
  if (type === 'streak')      entries.sort((a,b) => b.streak - a.streak);
  else if (type === 'quizzes') entries.sort((a,b) => b.totalQuizzes - a.totalQuizzes);
  else                         entries.sort((a,b) => b.xp - a.xp);

  entries = entries.slice(0, limit).map((e, i) => ({ ...e, rank: i + 1 }));
  return { leaderboard: entries };
}

// Rebuilds the leaderboard sheet from Users sheet
function syncLeaderboard(ss) {
  const usersSheet = ss.getSheetByName('Users');
  const lbSheet    = ss.getSheetByName('Leaderboard');

  const rows = usersSheet.getDataRange().getValues().slice(1)
    .filter(r => r[0])
    .map(r => rowToUser(r))
    .sort((a, b) => b.xp - a.xp);

  // Clear and rewrite leaderboard
  lbSheet.clearContents();
  lbSheet.appendRow(['Rank','Username','XP','Badge','Streak','TotalQuizzes']);
  rows.forEach((u, i) => {
    lbSheet.appendRow([i+1, u.username, u.xp, u.badge, u.streak, u.totalQuizzes]);
  });
}

// ─── LEVEL & BADGE HELPERS ────────────────────────────────────────────────────

function calcLevel(xp) {
  const thresholds = [0,200,500,1000,1800,3000,5000,8000,12000,20000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) return i + 1;
  }
  return 1;
}

function calcBadge(xp, streak) {
  if (xp >= 20000 || streak >= 100) return 'Diamond Guru 💎';
  if (xp >= 5000  || streak >= 30)  return 'Gold Scholar 🥇';
  if (xp >= 1000  || streak >= 7)   return 'Silver Devotee 🥈';
  return 'Bronze Seeker 🥉';
}
