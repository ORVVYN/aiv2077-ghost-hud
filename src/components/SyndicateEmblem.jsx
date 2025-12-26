/**
 * Syndicate Emblem Components
 * Phase 6: Neural Syndicates
 *
 * 12 SVG emblem types with neon glow effects
 */

import React from 'react'
import { SYNDICATE_EMBLEMS } from '../data/syndicates'

const SyndicateEmblem = ({
  type = SYNDICATE_EMBLEMS.SHIELD,
  size = 64,
  primaryColor = '#00e5ff',
  secondaryColor = '#a855f7',
  className = '',
  animated = true
}) => {
  const baseClasses = `transition-all duration-300 ${animated ? 'hover:scale-110' : ''} ${className}`
  const glowFilter = `drop-shadow(0 0 8px ${primaryColor}) drop-shadow(0 0 16px ${primaryColor}40)`

  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    className: baseClasses,
    style: { filter: glowFilter }
  }

  switch (type) {
    case SYNDICATE_EMBLEMS.BLADE:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* Blade */}
          <path
            d="M50 10 L60 40 L55 70 L50 90 L45 70 L40 40 Z"
            fill="none"
            stroke="url(#bladeGrad)"
            strokeWidth="2"
          />
          {/* Edge highlight */}
          <path
            d="M50 10 L60 40 L55 70"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Hilt */}
          <rect
            x="35"
            y="85"
            width="30"
            height="5"
            fill="url(#bladeGrad)"
          />
        </svg>
      )

    case SYNDICATE_EMBLEMS.SHIELD:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* Shield outline */}
          <path
            d="M50 10 L80 25 L80 55 Q80 75 50 90 Q20 75 20 55 L20 25 Z"
            fill="none"
            stroke="url(#shieldGrad)"
            strokeWidth="2.5"
          />
          {/* Center emblem */}
          <circle
            cx="50"
            cy="50"
            r="12"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          {/* Cross */}
          <line x1="50" y1="42" x2="50" y2="58" stroke={primaryColor} strokeWidth="2" />
          <line x1="42" y1="50" x2="58" y2="50" stroke={primaryColor} strokeWidth="2" />
        </svg>
      )

    case SYNDICATE_EMBLEMS.PHOENIX:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="phoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="50%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
          </defs>
          {/* Wings */}
          <path
            d="M30 40 Q20 30 15 35 Q10 40 20 45 L30 50"
            fill="none"
            stroke="url(#phoenixGrad)"
            strokeWidth="2"
          />
          <path
            d="M70 40 Q80 30 85 35 Q90 40 80 45 L70 50"
            fill="none"
            stroke="url(#phoenixGrad)"
            strokeWidth="2"
          />
          {/* Body */}
          <ellipse
            cx="50"
            cy="50"
            rx="10"
            ry="15"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          {/* Tail flames */}
          <path
            d="M45 65 Q40 75 35 85"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
          />
          <path
            d="M50 65 Q50 75 50 85"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          <path
            d="M55 65 Q60 75 65 85"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
          />
          {/* Head crest */}
          <path
            d="M45 35 Q50 25 55 35"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
        </svg>
      )

    case SYNDICATE_EMBLEMS.SKULL:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="skullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* Skull outline */}
          <ellipse
            cx="50"
            cy="40"
            rx="20"
            ry="25"
            fill="none"
            stroke="url(#skullGrad)"
            strokeWidth="2.5"
          />
          {/* Eyes */}
          <ellipse cx="42" cy="38" rx="5" ry="7" fill={primaryColor} />
          <ellipse cx="58" cy="38" rx="5" ry="7" fill={primaryColor} />
          {/* Nose */}
          <path
            d="M47 48 L50 52 L53 48"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          {/* Jaw */}
          <path
            d="M35 60 L40 65 L45 60 L50 65 L55 60 L60 65 L65 60"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
          />
        </svg>
      )

    case SYNDICATE_EMBLEMS.DRAGON:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
          </defs>
          {/* Dragon head */}
          <path
            d="M30 50 Q35 35 50 30 Q65 35 70 50 Q65 40 50 40 Q35 40 30 50"
            fill="none"
            stroke="url(#dragonGrad)"
            strokeWidth="2.5"
          />
          {/* Horns */}
          <path d="M35 35 L30 25 L32 35" fill="none" stroke={primaryColor} strokeWidth="2" />
          <path d="M65 35 L70 25 L68 35" fill="none" stroke={primaryColor} strokeWidth="2" />
          {/* Eye */}
          <circle cx="45" cy="38" r="3" fill={primaryColor} />
          <circle cx="55" cy="38" r="3" fill={primaryColor} />
          {/* Serpent body */}
          <path
            d="M50 50 Q60 60 55 70 Q50 75 45 70 Q40 60 50 50"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
          />
          {/* Tail */}
          <path
            d="M50 70 Q55 80 60 85"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
        </svg>
      )

    case SYNDICATE_EMBLEMS.WOLF:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="wolfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* Head outline */}
          <path
            d="M50 20 L35 35 L30 50 Q30 65 50 70 Q70 65 70 50 L65 35 Z"
            fill="none"
            stroke="url(#wolfGrad)"
            strokeWidth="2.5"
          />
          {/* Ears */}
          <path d="M35 35 L30 20 L40 30" fill="none" stroke={primaryColor} strokeWidth="2" />
          <path d="M65 35 L70 20 L60 30" fill="none" stroke={primaryColor} strokeWidth="2" />
          {/* Eyes */}
          <circle cx="42" cy="45" r="3" fill={primaryColor} />
          <circle cx="58" cy="45" r="3" fill={primaryColor} />
          {/* Snout */}
          <path
            d="M45 52 L50 58 L55 52"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
          />
          {/* Fangs */}
          <line x1="45" y1="58" x2="43" y2="65" stroke={primaryColor} strokeWidth="2" />
          <line x1="55" y1="58" x2="57" y2="65" stroke={primaryColor} strokeWidth="2" />
        </svg>
      )

    case SYNDICATE_EMBLEMS.CROWN:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={secondaryColor} />
              <stop offset="50%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* Crown base */}
          <path
            d="M20 60 L25 40 L35 50 L50 30 L65 50 L75 40 L80 60 Z"
            fill="none"
            stroke="url(#crownGrad)"
            strokeWidth="2.5"
          />
          {/* Crown band */}
          <rect
            x="20"
            y="60"
            width="60"
            height="8"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          {/* Jewels */}
          <circle cx="35" cy="50" r="3" fill={primaryColor} />
          <circle cx="50" cy="30" r="4" fill={secondaryColor} />
          <circle cx="65" cy="50" r="3" fill={primaryColor} />
        </svg>
      )

    case SYNDICATE_EMBLEMS.LIGHTNING:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* Lightning bolt */}
          <path
            d="M55 15 L35 50 L45 50 L30 85 L65 45 L52 45 Z"
            fill="none"
            stroke="url(#lightningGrad)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />
          {/* Energy lines */}
          <line x1="40" y1="35" x2="35" y2="40" stroke={primaryColor} strokeWidth="1.5" opacity="0.7" />
          <line x1="45" y1="60" x2="40" y2="65" stroke={primaryColor} strokeWidth="1.5" opacity="0.7" />
          <line x1="60" y1="30" x2="65" y2="35" stroke={primaryColor} strokeWidth="1.5" opacity="0.7" />
        </svg>
      )

    case SYNDICATE_EMBLEMS.STAR:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* 5-pointed star */}
          <path
            d="M50 15 L58 40 L85 40 L63 55 L70 80 L50 65 L30 80 L37 55 L15 40 L42 40 Z"
            fill="none"
            stroke="url(#starGrad)"
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
          {/* Center circle */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
        </svg>
      )

    case SYNDICATE_EMBLEMS.HEXAGON:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          {/* Outer hexagon */}
          <path
            d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z"
            fill="none"
            stroke="url(#hexGrad)"
            strokeWidth="2.5"
          />
          {/* Middle hexagon */}
          <path
            d="M50 25 L70 37.5 L70 62.5 L50 75 L30 62.5 L30 37.5 Z"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          {/* Inner hexagon */}
          <path
            d="M50 35 L60 42.5 L60 57.5 L50 65 L40 57.5 L40 42.5 Z"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="1.5"
          />
        </svg>
      )

    case SYNDICATE_EMBLEMS.INFINITY:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="50%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
          </defs>
          {/* Infinity symbol */}
          <path
            d="M20 50 Q20 30 35 30 Q50 30 50 50 Q50 70 35 70 Q20 70 20 50"
            fill="none"
            stroke="url(#infinityGrad)"
            strokeWidth="3"
          />
          <path
            d="M80 50 Q80 30 65 30 Q50 30 50 50 Q50 70 65 70 Q80 70 80 50"
            fill="none"
            stroke="url(#infinityGrad)"
            strokeWidth="3"
          />
          {/* Center dots */}
          <circle cx="35" cy="50" r="4" fill={primaryColor} />
          <circle cx="65" cy="50" r="4" fill={primaryColor} />
        </svg>
      )

    case SYNDICATE_EMBLEMS.VORTEX:
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="vortexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="50%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
          </defs>
          {/* Spiral arms */}
          <path
            d="M50 50 Q60 40 70 40 Q80 40 80 50"
            fill="none"
            stroke="url(#vortexGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M50 50 Q60 60 70 60 Q80 60 80 50"
            fill="none"
            stroke="url(#vortexGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M50 50 Q40 40 30 40 Q20 40 20 50"
            fill="none"
            stroke="url(#vortexGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M50 50 Q40 60 30 60 Q20 60 20 50"
            fill="none"
            stroke="url(#vortexGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Center core */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="3"
            fill={secondaryColor}
          />
        </svg>
      )

    default:
      return (
        <svg {...svgProps}>
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
          />
        </svg>
      )
  }
}

export default SyndicateEmblem
