import { useEffect, useRef } from 'react'
import CircularGallery from './CircularGallery.jsx'

// 自动收集 src/assets/gallery/ 下的图片（构建时由 Vite 打包/指纹化，
// 配合 vite.config.js 的 base:'./'，部署到任意子目录图片都可见）
const galleryModules = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true, import: 'default' }
)
const galleryItems = Object.values(galleryModules).map((src, i) => ({
  image: src,
  text: `作品 ${i + 1}`
}))

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) v.play?.().catch(() => {})
        else v.pause()
      },
      { threshold: 0.1 }
    )
    io.observe(v)
    const onVis = () => {
      if (document.hidden) v.pause()
      else if (io) v.play?.().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <section className="hero" id="top">
      {/* 视频背景：将 public/hero.mp4 放入即可启用；暂无视频时由 fallback 渐变兜底 */}
      <div className="hero__bg">
        <div className="hero__bg-fallback" />
        <video ref={videoRef} className="hero__video" autoPlay muted loop playsInline preload="metadata">
          {/* 放入 public/hero.webm 可获得更小体积（需存在该文件，否则不要保留 source） */}
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__bg-overlay" />
      </div>

      {/* 作品画廊：贴在视频画面底部（缩小） */}
      <div className="hero__gallery" aria-hidden="true">
        <CircularGallery
          items={galleryItems}
          bend={-2}
          textColor="#ffffff"
          borderRadius={0.07}
          scrollEase={0.08}
          scrollSpeed={3.6}
        />
      </div>

      <div className="container hero__inner">
        <p className="hero__eyebrow">PORTFOLIO — 2026</p>
        <h1 className="hero__title">
          <span className="hero__name">毛章</span>
          <span className="hero__role">在读学生</span>
        </h1>
        <p className="hero__desc">
          计算机应用技术专业在读，正在找一份能动手做的实习。
        </p>
      </div>

      <div className="container hero__foot">
        <div className="hero__meta"></div>
        <a href="#work" className="hero__scroll">
          SCROLL <span className="hero__scroll-line" />
        </a>
      </div>
    </section>
  )
}
