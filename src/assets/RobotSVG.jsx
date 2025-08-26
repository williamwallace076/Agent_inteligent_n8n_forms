import React, { useEffect, useMemo, useRef, useState } from "react";

// Funções auxiliares para o componente RobotSVG
const shade = (hex, percent) => {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  const to = (c) => Math.round((t - c) * p) + c;
  return `#${(0x1000000 + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1)}`;
};

const eyebrowPath = (side, expression) => {
  const offset = side === "left" ? -25 : 25;
  switch (expression) {
    case "happy": return `M${offset - 10},-62 Q${offset},-68 ${offset + 10},-62`;
    case "sad": return `M${offset - 10},-58 Q${offset},-52 ${offset + 10},-58`;
    case "thinking": return side === "left" ? `M${offset - 10},-62 Q${offset},-56 ${offset + 10},-60` : `M${offset - 10},-56 Q${offset},-64 ${offset + 10},-58`;
    case "surprised": return `M${offset - 10},-70 Q${offset},-76 ${offset + 10},-70`;
    case "wink": return side === "left" ? `M${offset - 10},-48 Q${offset},-48 ${offset + 10},-48` : `M${offset - 10},-62 Q${offset},-66 ${offset + 10},-62`;
    default: return `M${offset - 10},-60 Q${offset},-62 ${offset + 10},-60`;
  }
};

const progressFor = (expr) => {
  const progressMap = { thinking: 30, neutral: 40, sad: 25, surprised: 55, wink: 65, happy: 90 };
  return progressMap[expr] || 50;
};

// Componente RobotSVG
export default function RobotSVG({ expression = "neutral", speak = "", color = "#4f80ff", size = 260, blink = true }) {
  const [isBlinking, setIsBlinking] = useState(false);
  const blinkTimer = useRef(null);

  useEffect(() => {
    if (!blink) return;
    const loop = () => {
      const next = 1200 + Math.random() * 3000;
      blinkTimer.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          loop();
        }, 120);
      }, next);
    };
    loop();
    return () => clearTimeout(blinkTimer.current);
  }, [blink]);

  const palette = useMemo(() => {
    const base = color;
    const dark = shade(base, -25);
    const light = shade(base, +30);
    return { base, dark, light, metal: "#e9eef3", line: "#1f2937" };
  }, [color]);

  const mouthPath = useMemo(() => {
    const paths = {
      happy: "M-35,15 Q0,45 35,15",
      sad: "M-35,30 Q0,0 35,30",
      thinking: "M-25,20 Q0,10 25,20",
      neutral: "M-28,22 Q0,26 28,22",
      wink: "M-28,22 Q0,26 28,22",
    };
    return paths[expression] || paths.neutral;
  }, [expression]);

  const isSurprised = expression === "surprised";
  const isWink = expression === "wink";

  return (
    <div style={{ position: "relative", width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {speak && (
        <div
          aria-live="polite"
          className="speech-bubble"
        >
          {speak}
          <span className="speech-bubble-arrow" />
        </div>
      )}
      <svg width={size} height={size} viewBox="-150 -150 300 300" role="img" aria-label={`Robô expressão ${expression}`}>
        <title>Robô — expressão {expression}</title>
        <ellipse cx="0" cy="110" rx="70" ry="12" fill="rgba(0,0,0,.12)" />
        <g>
          <rect x="-70" y="10" width="140" height="90" rx="18" fill={palette.metal} stroke={palette.line} strokeWidth="2.5" />
          <rect x="-50" y="78" width="100" height="10" rx="5" fill="#fff" />
          <rect x="-50" y="78" width={progressFor(expression)} height="10" rx="5" fill={palette.base} />
        </g>
        <g>
          <rect x="-80" y="-100" width="160" height="110" rx="22" fill={palette.metal} stroke={palette.line} strokeWidth="2.5" />
          <line x1="0" y1="-120" x2="0" y2="-100" stroke={palette.dark} strokeWidth="4" />
          <circle cx="0" cy="-125" r="6" fill={palette.base} stroke={palette.dark} strokeWidth="2" />
          <rect x="-60" y="-80" width="120" height="70" rx="12" fill="#0b1220" stroke="#111827" strokeWidth="2" />
          {isBlinking ? (
            <line x1="-30" y1="-45" x2="-10" y2="-45" stroke="#9dd7ff" strokeWidth="6" strokeLinecap="round" />
          ) : isWink ? (
            <>
              <line x1="-30" y1="-45" x2="-10" y2="-45" stroke="#9dd7ff" strokeWidth="6" strokeLinecap="round" />
              <circle cx="25" cy="-45" r="8" fill="#9dd7ff" />
            </>
          ) : (
            <>
              <circle cx="-20" cy="-45" r="8" fill="#9dd7ff" />
              <circle cx="20" cy="-45" r="8" fill="#9dd7ff" />
            </>
          )}
          <path d={eyebrowPath("left", expression)} fill="none" stroke="#79bfff" strokeWidth="4" strokeLinecap="round" />
          <path d={eyebrowPath("right", expression)} fill="none" stroke="#79bfff" strokeWidth="4" strokeLinecap="round" />
          {isSurprised ? (
            <circle cx="0" cy="-20" r="10" fill="#9dd7ff" />
          ) : (
            <path d={mouthPath} fill="none" stroke="#9dd7ff" strokeWidth="6" strokeLinecap="round" />
          )}
        </g>
        <g>
          <rect x="-90" y="0" width="30" height="30" rx="8" fill={palette.light} stroke={palette.line} strokeWidth="2" />
          <rect x="60" y="0" width="30" height="30" rx="8" fill={palette.light} stroke={palette.line} strokeWidth="2" />
        </g>
        <g>
          <circle cx="-40" cy="38" r="6" fill={palette.base} />
          <circle cx="-22" cy="38" r="6" fill={palette.light} />
          <circle cx="-4" cy="38" r="6" fill={palette.dark} />
          <rect x="18" y="32" width="40" height="12" rx="6" fill={palette.base} />
        </g>
      </svg>
    </div>
  );
}
