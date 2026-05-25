/**
 * Daily Shastra Quiz — Static Question Bank
 * Organized by lesson modules with explanations
 */

export type Question = {
  id: string;
  lessonId: string;
  module: string;
  question: string;
  icon: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
};

export const QUESTIONS: Question[] = [
  // ─── Bhagavad Gita Basics ─────────────────────────────────────────────────
  {
    id: 'bg-001',
    lessonId: 'bhagavad-gita-basics',
    module: 'Bhagavad Gita',
    question: 'What is the eternal nature of the soul (Atman) according to the Bhagavad Gita?',
    icon: '✨',
    context: 'Chapter 2 — Sankhya Yoga',
    options: [
      'It is born with the body and dies with it',
      'It is eternal, indestructible, and beyond birth and death',
      'It is a product of the mind and ego',
      'It merges with the universe upon death',
    ],
    correctIndex: 1,
    explanation:
      "Krishna tells Arjuna: 'The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval.' (Gita 2.20)",
    difficulty: 'beginner',
    xpReward: 20,
  },
  {
    id: 'bg-002',
    lessonId: 'bhagavad-gita-basics',
    module: 'Bhagavad Gita',
    question: 'On which battlefield was the Bhagavad Gita spoken?',
    icon: '⚔️',
    context: 'Chapter 1 — The Setting',
    options: ['Hastinapura', 'Kurukshetra', 'Vrindavana', 'Mathura'],
    correctIndex: 1,
    explanation:
      'The Bhagavad Gita was spoken on the battlefield of Kurukshetra, just before the start of the great Mahabharata war between the Pandavas and the Kauravas.',
    difficulty: 'beginner',
    xpReward: 20,
  },
  {
    id: 'bg-003',
    lessonId: 'bhagavad-gita-basics',
    module: 'Bhagavad Gita',
    question: 'How many chapters does the Bhagavad Gita contain?',
    icon: '📖',
    context: 'Gita Overview',
    options: ['12 chapters', '14 chapters', '18 chapters', '24 chapters'],
    correctIndex: 2,
    explanation:
      'The Bhagavad Gita contains 18 chapters and 700 verses (shlokas). The number 18 is sacred — there were 18 days of battle, 18 armies, and 18 key warriors on each side.',
    difficulty: 'beginner',
    xpReward: 20,
  },
  {
    id: 'bg-004',
    lessonId: 'bhagavad-gita-basics',
    module: 'Bhagavad Gita',
    question: "What was Arjuna's crisis that led Krishna to deliver the Gita?",
    icon: '🪶',
    context: 'Chapter 1 — Arjuna Vishada Yoga',
    options: [
      'He feared physical injury',
      'He wanted to rule the kingdom alone',
      'He was grief-stricken at having to fight his own family and teachers',
      'He disagreed with Krishna about strategy',
    ],
    correctIndex: 2,
    explanation:
      "Arjuna's bow fell from his hands as he saw his relatives, teachers, and loved ones arrayed against him. This crisis of dharma — doing right in a painful situation — is the very reason Krishna imparts the eternal wisdom of the Gita.",
    difficulty: 'beginner',
    xpReward: 20,
  },

  // ─── Karma Yoga ──────────────────────────────────────────────────────────
  {
    id: 'karma-001',
    lessonId: 'karma-yoga',
    module: 'Karma',
    question: 'What does Karma Yoga primarily teach?',
    icon: '⚡',
    context: 'Chapter 3 — Karma Yoga',
    options: [
      'Performing rituals for material gain',
      'Acting with attachment to desired results',
      "Performing one's duty without attachment to outcomes",
      'Renouncing all worldly action completely',
    ],
    correctIndex: 2,
    explanation:
      "Karma Yoga is the path of selfless action. Krishna says: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.' (Gita 2.47) Act, but offer the results to the Divine.",
    difficulty: 'beginner',
    xpReward: 20,
  },
  {
    id: 'karma-002',
    lessonId: 'karma-yoga',
    module: 'Karma',
    question: 'According to Vedic understanding, what creates karma?',
    icon: '🌀',
    context: 'Karma Theory',
    options: [
      'Only physical actions',
      'Actions, words, AND intentions/thoughts',
      'Only negative or harmful actions',
      'Actions performed by others that affect us',
    ],
    correctIndex: 1,
    explanation:
      'Karma is created by actions (kayika), words (vachika), and mental intentions (manasika). This is why purifying the mind through meditation and cultivating pure intentions is considered essential in Vedic practice.',
    difficulty: 'intermediate',
    xpReward: 25,
  },
  {
    id: 'karma-003',
    lessonId: 'karma-yoga',
    module: 'Karma',
    question: 'What is "Nishkama Karma" in Vedic philosophy?',
    icon: '🌸',
    context: 'Karma & Moksha',
    options: [
      'Karma performed under compulsion',
      'Desireless action — performing duties without craving the fruits',
      'Karma that leads to immediate rebirth',
      'Sacred karma performed during festivals',
    ],
    correctIndex: 1,
    explanation:
      "Nishkama means 'without desire' and Karma means 'action'. Nishkama Karma — desireless action offered to the Divine — is the highest path because it purifies the heart and leads to liberation (moksha).",
    difficulty: 'intermediate',
    xpReward: 25,
  },

  // ─── Bhakti Yoga ─────────────────────────────────────────────────────────
  {
    id: 'bhakti-001',
    lessonId: 'bhakti-yoga',
    module: 'Bhakti Yoga',
    question: 'What is Bhakti Yoga?',
    icon: '🙏',
    context: 'Chapter 12 — Bhakti Yoga',
    options: [
      'The path of physical yoga postures',
      'The path of philosophical reasoning and debate',
      'The path of pure love and devotion to God',
      'The path of extreme austerity and fasting',
    ],
    correctIndex: 2,
    explanation:
      'Bhakti Yoga is the yoga of love and devotion — an intimate, personal relationship with the Divine through prayer, worship, chanting, and surrender. Krishna calls it the highest and easiest path for this age (Kali Yuga).',
    difficulty: 'beginner',
    xpReward: 20,
  },
  {
    id: 'bhakti-002',
    lessonId: 'bhakti-yoga',
    module: 'Bhakti Yoga',
    question: 'What are the nine forms of Bhakti (Navavidha Bhakti)?',
    icon: '🪷',
    context: 'Bhagavata Purana',
    options: [
      'Nine types of yoga postures',
      'Nine sacred rivers of India',
      'Shravanam, Kirtanam, Smaranam, Pada-sevanam, Archanam, Vandanam, Dasyam, Sakhyam, Atma-nivedanam',
      'Nine chapters of the Bhagavad Gita on devotion',
    ],
    correctIndex: 2,
    explanation:
      'Prahlada describes nine forms of devotion in the Bhagavata Purana: hearing (shravanam), chanting (kirtanam), remembering (smaranam), serving the feet (pada-sevanam), worshipping (archanam), praying (vandanam), being a servant (dasyam), being a friend (sakhyam), and complete surrender (atma-nivedanam).',
    difficulty: 'advanced',
    xpReward: 30,
  },

  // ─── Maya & Illusion ─────────────────────────────────────────────────────
  {
    id: 'maya-001',
    lessonId: 'maya-illusion',
    module: 'Maya',
    question: "What is 'Maya' in Vedic philosophy?",
    icon: '🌀',
    context: 'Vedanta & Upanishads',
    options: [
      'The supreme absolute consciousness (Brahman)',
      'The cosmic illusion or power that veils the true reality',
      'The physical human body',
      'The sacred river Yamuna',
    ],
    correctIndex: 1,
    explanation:
      "Maya is the divine power of illusion (shakti) that makes us perceive the temporary material world as the ultimate reality. It causes us to identify with the body and forget our true eternal spiritual nature. 'Mama maya duratyaya' — My maya is very difficult to overcome. (Gita 7.14)",
    difficulty: 'intermediate',
    xpReward: 25,
  },
  {
    id: 'maya-002',
    lessonId: 'maya-illusion',
    module: 'Maya',
    question: 'How does Krishna say one can overcome Maya?',
    icon: '🕉',
    context: 'Chapter 7 — Knowledge of the Absolute',
    options: [
      'Through wealth and social status',
      'Through physical strength and willpower alone',
      'By surrendering to the Divine with devotion',
      'By completely avoiding all activity',
    ],
    correctIndex: 2,
    explanation:
      "Krishna says: 'This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me can easily cross beyond it.' (Gita 7.14) Surrender and devotion are the keys to transcending Maya.",
    difficulty: 'intermediate',
    xpReward: 25,
  },

  // ─── Soul & Consciousness ─────────────────────────────────────────────────
  {
    id: 'soul-001',
    lessonId: 'soul-consciousness',
    module: 'Soul & Atman',
    question: 'What does the Bhagavad Gita say about the size of the soul?',
    icon: '✨',
    context: 'Chapter 2 — Nature of the Soul',
    options: [
      'It is as large as the universe',
      'It has no size',
      'It is smaller than the smallest atom (anu)',
      'It is the size of a thumb',
    ],
    correctIndex: 2,
    explanation:
      "The Upanishads describe the soul (Atman/jiva) as smaller than the smallest (anor aniyan) yet greater than the greatest (mahato mahiyan). It is described as 1/10,000th the size of the tip of a hair — infinitesimally small yet eternally conscious.",
    difficulty: 'advanced',
    xpReward: 30,
  },
  {
    id: 'soul-002',
    lessonId: 'soul-consciousness',
    module: 'Soul & Atman',
    question: "What is the difference between 'Atman' and 'Paramatman'?",
    icon: '🌟',
    context: 'Chapter 13 — The Field & Knower of the Field',
    options: [
      'Atman is the individual soul; Paramatman is the Supreme Soul (God) residing in all hearts',
      'They are different names for the same thing',
      'Atman is the mind; Paramatman is the body',
      'Atman is God; Paramatman is the individual',
    ],
    correctIndex: 0,
    explanation:
      "Atman is the individual eternal soul residing in each being. Paramatman is the Supreme Soul — God (Krishna/Vishnu) — who resides as the Supersoul in the heart of every living entity as the witness, permitter, and maintainer. Both reside in the body like two birds on the same tree.",
    difficulty: 'advanced',
    xpReward: 30,
  },

  // ─── Sanatana Dharma ─────────────────────────────────────────────────────
  {
    id: 'sd-001',
    lessonId: 'sanatana-dharma',
    module: 'Sanatana Dharma',
    question: "What does 'Sanatana Dharma' literally translate to?",
    icon: '🌸',
    context: 'The Eternal Way',
    options: [
      'The Hindu religion of India',
      'The Eternal Way or Eternal Righteous Order',
      'The law of karma and rebirth',
      'The path of complete renunciation',
    ],
    correctIndex: 1,
    explanation:
      "'Sanatana' means eternal or timeless, and 'Dharma' means righteousness, duty, cosmic order, or the intrinsic nature of a thing. Together, Sanatana Dharma is the Eternal Way — the timeless principles of right living that apply to all souls across all time.",
    difficulty: 'beginner',
    xpReward: 20,
  },
  {
    id: 'sd-002',
    lessonId: 'sanatana-dharma',
    module: 'Sanatana Dharma',
    question: 'What are the four Purusharthas (goals of human life) in Sanatana Dharma?',
    icon: '⭐',
    context: 'Dharmic Living',
    options: [
      'Brahma, Vishnu, Shiva, Shakti',
      'Birth, Life, Death, Rebirth',
      'Dharma (righteousness), Artha (prosperity), Kama (pleasure), Moksha (liberation)',
      'Satya, Ahimsa, Brahmacharya, Aparigraha',
    ],
    correctIndex: 2,
    explanation:
      'The four Purusharthas define the complete aims of human existence: Dharma (righteous living), Artha (material prosperity through ethical means), Kama (sensory pleasures in accord with dharma), and Moksha (liberation from the cycle of birth and death) — the highest goal.',
    difficulty: 'intermediate',
    xpReward: 25,
  },
];

export const MODULES = [
  {
    id: 'bhagavad-gita-basics',
    title: 'Bhagavad Gita Basics',
    icon: '📖',
    description:
      "Explore the fundamental teachings of Lord Krishna to Arjuna on the battlefield of Kurukshetra — the song of God that reveals life's eternal purpose.",
    lessonCount: 12,
    difficulty: 'beginner' as const,
    xpReward: 500,
    color: 'saffron',
    progress: 75,
  },
  {
    id: 'karma-yoga',
    title: 'Law of Karma',
    icon: '⚡',
    description:
      "Understand the cosmic law of cause and effect — how our actions, thoughts, and intentions shape our destiny across lifetimes.",
    lessonCount: 8,
    difficulty: 'beginner' as const,
    xpReward: 350,
    color: 'gold',
    progress: 45,
  },
  {
    id: 'bhakti-yoga',
    title: 'Bhakti Yoga',
    icon: '🙏',
    description:
      "The path of devotion — surrender, love, and union with the Divine through pure-hearted bhakti. The easiest and highest path for this age.",
    lessonCount: 10,
    difficulty: 'intermediate' as const,
    xpReward: 450,
    color: 'lotus',
    progress: 20,
  },
  {
    id: 'maya-illusion',
    title: 'Maya & Illusion',
    icon: '🌀',
    description:
      'Discover the nature of cosmic illusion and how to transcend the material bondage that keeps us from experiencing our true spiritual nature.',
    lessonCount: 7,
    difficulty: 'intermediate' as const,
    xpReward: 400,
    color: 'teal',
    progress: 0,
  },
  {
    id: 'soul-consciousness',
    title: 'Soul & Atman',
    icon: '✨',
    description:
      "Explore the nature of the eternal soul, consciousness, and the self beyond the body and mind. Who are we, really?",
    lessonCount: 9,
    difficulty: 'advanced' as const,
    xpReward: 500,
    color: 'saffron',
    progress: 0,
  },
  {
    id: 'sanatana-dharma',
    title: 'Sanatana Dharma',
    icon: '🌸',
    description:
      "The Eternal Way — understand the cosmic order, dharmic living, the four goals of life, and the timeless principles of existence.",
    lessonCount: 11,
    difficulty: 'advanced' as const,
    xpReward: 600,
    color: 'gold',
    progress: 0,
  },
];

export function getQuestionsForLesson(lessonId: string): Question[] {
  return QUESTIONS.filter(q => q.lessonId === lessonId);
}

export function getRandomQuestions(count = 5): Question[] {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
