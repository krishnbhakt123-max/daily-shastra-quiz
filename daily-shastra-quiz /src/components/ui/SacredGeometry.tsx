'use client';
import { useEffect, useRef } from 'react';

export default function SacredGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let t = 0;
    let raf: number;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const chakraColors = ['#FF6B35','#FFD700','#FF4499','#00DDAA','#4488FF','#AA44FF','#FF8844'];

    function drawFlowerOfLife(cx: number, cy: number, r: number, alpha: number, hue: number) {
      ctx!.save(); ctx!.globalAlpha = alpha;
      const step = (Math.PI * 2) / 6;
      ctx!.beginPath(); ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.strokeStyle = `hsl(${hue},80%,65%)`; ctx!.lineWidth = 0.5; ctx!.stroke();
      for (let i = 0; i < 6; i++) {
        const ax = cx + r * Math.cos(i * step), ay = cy + r * Math.sin(i * step);
        ctx!.beginPath(); ctx!.arc(ax, ay, r, 0, Math.PI * 2);
        ctx!.strokeStyle = `hsl(${hue + i * 12},80%,65%)`; ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawSriYantra(cx: number, cy: number, size: number, alpha: number, rot: number) {
      ctx!.save(); ctx!.globalAlpha = alpha; ctx!.translate(cx, cy); ctx!.rotate(rot);
      for (let i = 0; i < 5; i++) {
        const s = size * (1 - i * 0.16);
        ctx!.beginPath(); ctx!.moveTo(0,-s); ctx!.lineTo(s*0.866,s*0.5); ctx!.lineTo(-s*0.866,s*0.5); ctx!.closePath();
        ctx!.strokeStyle = `hsl(${30+i*18},90%,62%)`; ctx!.lineWidth=0.7; ctx!.stroke();
        ctx!.beginPath(); ctx!.moveTo(0,s); ctx!.lineTo(s*0.866,-s*0.5); ctx!.lineTo(-s*0.866,-s*0.5); ctx!.closePath();
        ctx!.strokeStyle = `hsl(${200+i*18},80%,65%)`; ctx!.stroke();
      }
      ctx!.beginPath(); ctx!.arc(0,0,size*1.2,0,Math.PI*2);
      ctx!.strokeStyle='rgba(240,192,96,0.35)'; ctx!.lineWidth=0.5; ctx!.stroke();
      ctx!.restore();
    }

    function drawChakra(cx: number, cy: number, r: number, petals: number, color: string, alpha: number, rot: number) {
      ctx!.save(); ctx!.globalAlpha = alpha; ctx!.translate(cx, cy); ctx!.rotate(rot);
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2;
        ctx!.beginPath(); ctx!.ellipse(r*0.65*Math.cos(a), r*0.65*Math.sin(a), r*0.32, r*0.13, a, 0, Math.PI*2);
        ctx!.strokeStyle = color; ctx!.lineWidth = 0.7; ctx!.stroke();
      }
      ctx!.beginPath(); ctx!.arc(0,0,r*0.22,0,Math.PI*2);
      ctx!.strokeStyle=color; ctx!.lineWidth=1; ctx!.stroke();
      ctx!.restore();
    }

    function drawMetatron(cx: number, cy: number, r: number, alpha: number, rot: number) {
      ctx!.save(); ctx!.globalAlpha = alpha; ctx!.translate(cx, cy); ctx!.rotate(rot);
      const pts: [number,number][] = [[0,0]];
      for (let i=0;i<6;i++) pts.push([r*Math.cos(i*Math.PI/3), r*Math.sin(i*Math.PI/3)]);
      for (let i=0;i<6;i++) pts.push([r*2*Math.cos(i*Math.PI/3), r*2*Math.sin(i*Math.PI/3)]);
      for (let i=0;i<pts.length;i++) for (let j=i+1;j<pts.length;j++) {
        ctx!.beginPath(); ctx!.moveTo(pts[i][0],pts[i][1]); ctx!.lineTo(pts[j][0],pts[j][1]);
        ctx!.strokeStyle='rgba(232,131,42,0.1)'; ctx!.lineWidth=0.35; ctx!.stroke();
      }
      ctx!.restore();
    }

    const particles = Array.from({length:70}, () => ({
      x: Math.random()*1400, y: Math.random()*900,
      r: Math.random()*1.8+0.4, speed: Math.random()*0.4+0.08,
      color: chakraColors[Math.floor(Math.random()*chakraColors.length)],
      alpha: Math.random()*0.35+0.1, px: Math.random()*1400,
    }));

    function draw() {
      ctx!.clearRect(0,0,W,H); t += 0.004;

      // Radial ambient glow
      const g = ctx!.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.65);
      g.addColorStop(0,'rgba(232,131,42,0.05)'); g.addColorStop(1,'rgba(0,0,0,0)');
      ctx!.fillStyle=g; ctx!.fillRect(0,0,W,H);

      // Big Metatron background
      drawMetatron(W/2, H/2, 70, 0.07+0.025*Math.sin(t*0.5), t*0.04);

      // Flower of life corners
      [[W*0.12,H*0.18,32,35],[W*0.88,H*0.14,26,55],[W*0.07,H*0.78,30,25],[W*0.93,H*0.82,28,45],[W*0.5,H*0.95,22,40]].forEach(([x,y,r,hue],i) => {
        drawFlowerOfLife(x,y,r,0.09+0.04*Math.sin(t+i),hue+Math.sin(t*0.4+i)*25);
      });

      // Central Sri Yantra
      drawSriYantra(W/2, H*0.48, 130+6*Math.sin(t*0.6), 0.07+0.025*Math.sin(t*0.4), t*0.018);

      // 3 orbiting yantras
      for (let i=0;i<3;i++) {
        const a = t*0.12+(i*Math.PI*2)/3;
        drawSriYantra(W/2+Math.cos(a)*W*0.33, H/2+Math.sin(a)*H*0.28, 45, 0.055, t*0.25+i*1.2);
      }

      // Chakra columns
      for (let i=0;i<7;i++) {
        drawChakra(48+Math.sin(t*0.3+i)*6, H*0.12+i*H*0.115, 20, 4+i*2, chakraColors[i], 0.14+0.06*Math.sin(t+i*0.7), t*(0.25+i*0.04));
        drawChakra(W-48+Math.sin(t*0.3+i+Math.PI)*6, H*0.12+i*H*0.115, 20, 4+i*2, chakraColors[i], 0.14+0.06*Math.sin(t+i*0.7+1), -t*(0.25+i*0.04));
      }

      // Floating particles
      particles.forEach(p => {
        p.y -= p.speed; p.x += Math.sin(t*0.5+p.px*0.01)*0.3;
        if (p.y < -5) { p.y = H+5; p.x = Math.random()*W; }
        ctx!.beginPath(); ctx!.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx!.fillStyle=p.color; ctx!.globalAlpha=p.alpha*(0.5+0.5*Math.sin(t*1.5+p.px));
        ctx!.fill();
      });

      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{zIndex:0}} />;
}
