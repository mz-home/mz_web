import { useEffect, useState } from 'react'
import PillNav from './PillNav.jsx'

const items = [
  { label: '关于', href: '#about', ariaLabel: '关于' },
  { label: '搭建笔记', href: '#work', ariaLabel: '搭建笔记' },
  { label: '优势', href: '#strengths', ariaLabel: '优势' },
  { label: '联系', href: '#contact', ariaLabel: '联系' }
]

export default function Nav() {
  const [active, setActive] = useState('')

  // 滚动时高亮当前所在区块的导航项
  useEffect(() => {
    const ids = items.map(i => i.href.replace('#', '')).filter(Boolean)
    const sections = ids
      .map(id => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <PillNav
      logo="./logo.svg"
      logoAlt="MZ"
      items={items}
      activeHref={active}
      className="site-nav"
      ease="power3.easeOut"
      baseColor="#0A0B0D"
      pillColor="#FFFFFF"
      pillTextColor="#0A0B0D"
      hoveredPillTextColor="#FFFFFF"
      initialLoadAnimation
    />
  )
}
