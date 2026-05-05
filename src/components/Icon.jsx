const Icon = ({ name, size = 18 }) => {
  const s = size
  const sw = 1.6
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: sw,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      )
    case 'edit':
      return (
        <svg {...common}>
          <path d="M14 4l6 6-11 11H3v-6L14 4z" />
        </svg>
      )
    case 'users':
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3.5" />
          <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
          <circle cx="17" cy="7" r="2.5" />
          <path d="M22 18c0-2-1.5-3.5-4-4" />
        </svg>
      )
    case 'scale':
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 7l-3 6c0 2 1.5 3 3 3s3-1 3-3l-3-6z" />
          <path d="M19 7l-3 6c0 2 1.5 3 3 3s3-1 3-3l-3-6z" />
        </svg>
      )
    case 'quote':
      return (
        <svg {...common}>
          <path d="M6 17c0-4 2-6 5-7" />
          <path d="M14 17c0-4 2-6 5-7" />
          <path d="M3 10h6v7H3z" />
          <path d="M11 10h6v7h-6z" />
        </svg>
      )
    case 'money':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9c-1-1.5-2-2-3-2s-3 .5-3 2.5S11 12 12 12s3 .5 3 2.5S13 17 12 17s-2-.5-3-2" />
          <path d="M12 5v14" />
        </svg>
      )
    case 'build':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="18" />
          <rect x="14" y="8" width="7" height="13" />
          <path d="M5 7h3M5 11h3M5 15h3M16 12h3M16 16h3" />
        </svg>
      )
    case 'help':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9c0-2 1.5-3 3-3s3 1 3 3-3 2-3 4" />
          <circle cx="12" cy="17" r="0.5" />
        </svg>
      )
    case 'palette':
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 100 18c1 0 2-1 2-2s-1-2-1-3 1-2 2-2h2a4 4 0 004-4c0-4-4-7-9-7z" />
          <circle cx="7" cy="11" r="1" />
          <circle cx="9" cy="7" r="1" />
          <circle cx="14" cy="6" r="1" />
        </svg>
      )
    case 'image':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="M3 17l5-5 4 4 3-3 6 6" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-5 3 3 5-7" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1z" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-5-5" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
    case 'chev':
      return (
        <svg {...common}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case 'logout':
      return (
        <svg {...common}>
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 0112 0v5l2 3H4l2-3z" />
          <path d="M10 20a2 2 0 004 0" />
        </svg>
      )
    case 'drag':
      return (
        <svg {...common}>
          <circle cx="9" cy="6" r="1" />
          <circle cx="15" cy="6" r="1" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="9" cy="18" r="1" />
          <circle cx="15" cy="18" r="1" />
        </svg>
      )
    case 'trash':
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M10 11v6M14 11v6" />
          <path d="M5 7l1 13a2 2 0 002 2h8a2 2 0 002-2l1-13" />
          <path d="M9 7V4h6v3" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'upload':
      return (
        <svg {...common}>
          <path d="M12 4v12" />
          <path d="M7 9l5-5 5 5" />
          <path d="M5 18v2h14v-2" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <path d="M5 5l14 14M5 19L19 5" />
        </svg>
      )
    case 'star':
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2l3 7 7 .5-5.5 4.8L18 22l-6-4-6 4 1.5-7.7L2 9.5 9 9z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
    case 'copy':
      return (
        <svg {...common}>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      )
    default:
      return null
  }
}

export default Icon
