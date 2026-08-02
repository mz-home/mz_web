import './Splash.css'

// 纯展示的开场幕布；上滑揭开与卸载由 src/animations/useSiteMotion.js 统一控制
// Logo 拆分为单字符遮罩，便于逐字上浮进场
const CHARS = ['M', 'Z', '.']

export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <span className="splash__logo">
        {CHARS.map((c, i) => (
          <span className="splash__char" key={i}>
            <span className={c === '.' ? 'splash__char-i splash__dot' : 'splash__char-i'}>
              {c}
            </span>
          </span>
        ))}
      </span>
    </div>
  )
}
