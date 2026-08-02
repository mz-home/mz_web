import { useState, useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ShapeGrid from './components/ShapeGrid.jsx'
import Splash from './components/Splash.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'
import { useSiteMotion } from './animations/useSiteMotion.js'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  useSiteMotion({ onSplashDone: () => setShowSplash(false) })

  // 安全兜底：若动效脚本异常，4s 后强制收起开场幕布
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {showSplash && <Splash />}
      <Nav />
      {/* 全站动态网格背景：位于内容之下、头部视频之下，不影响视频播放与交互 */}
      <div className="bg-grid" aria-hidden="true">
        <ShapeGrid
          speed={0.18}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.14)"
          hoverFillColor="#ffffff"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
      </main>
      <Contact />
    </>
  )
}
