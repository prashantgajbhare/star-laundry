import React from 'react';

interface StarLogoSvgProps {
  className?: string;
  glow?: boolean;
}

export const StarLogoSvg: React.FC<StarLogoSvgProps> = ({ className = 'w-32 h-12', glow = true }) => {
  return (
    <svg viewBox="0 0 350 155" className={className} aria-label="Star Laundry Logo">
      <defs>
        {glow && (
          <filter id="reactLogoGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.95" />
          </filter>
        )}
      </defs>
      <g filter={glow ? 'url(#reactLogoGlow)' : undefined}>
        {/* Crimson/Magenta offset accent stroke */}
        <path
          d="M 101 112
             L 64 134
             L 74 90
             L 38 62
             L 83 58
             L 100 18
             L 114 50
             L 168 42
             L 126 32
             C 129 22, 142 15, 138 6
             C 134 -2, 118 0, 117 11"
          fill="none"
          stroke="#a81c4b"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(2.5, 2.2)"
        />

        {/* Main Deep Navy Blue Star + Hanger Hook Path */}
        <path
          d="M 101 112
             L 64 134
             L 74 90
             L 38 62
             L 83 58
             L 100 18
             L 114 50
             L 168 42
             L 126 32
             C 129 22, 142 15, 138 6
             C 134 -2, 118 0, 117 11"
          fill="none"
          stroke="#1d295e"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tilted Bold Serif 'STAR' & 'LAUNDRY' */}
        <g transform="rotate(-11.5, 185, 88)">
          {/* Subtle crimson shadow text */}
          <text
            x="114"
            y="88"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="900"
            fontSize="45"
            letterSpacing="1.5"
            fill="#a81c4b"
            opacity="0.65"
          >
            STAR
          </text>
          <text
            x="74"
            y="133"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="900"
            fontSize="47"
            letterSpacing="1.2"
            fill="#a81c4b"
            opacity="0.65"
          >
            LAUNDRY
          </text>

          {/* Primary Navy Serif Text */}
          <text
            x="112"
            y="86"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="900"
            fontSize="45"
            letterSpacing="1.5"
            fill="#212f69"
            stroke="#ffffff"
            strokeWidth="1.2"
            paintOrder="stroke fill"
          >
            STAR
          </text>
          <text
            x="72"
            y="131"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="900"
            fontSize="47"
            letterSpacing="1.2"
            fill="#212f69"
            stroke="#ffffff"
            strokeWidth="1.2"
            paintOrder="stroke fill"
          >
            LAUNDRY
          </text>
        </g>
      </g>
    </svg>
  );
};
