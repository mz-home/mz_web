import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 缓动：expo.out 丝滑无廉价弹跳；expo.inOut 用于幕布
const EASE = 'expo.out'
const EASE_INOUT = 'expo.inOut'

export function useSiteMotion({ onSplashDone } = {}) {
  const doneRef = useRef(onSplashDone)
  doneRef.current = onSplashDone

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 无障碍 / 性能优先：直接显示内容并收起开场幕布
    if (reduce) {
      doneRef.current?.()
      return
    }

    const ctx = gsap.context(() => {
      /* ============ 1. 开场动画 ============ */
      const intro = gsap.timeline({
        defaults: { ease: EASE },
        onComplete: () => doneRef.current?.(),
      })

      // 幕布：Logo 逐字符从遮罩下方浮出（错位 stagger），随后整块上滑揭开
      intro
        .fromTo(
          '.splash__char-i',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.05, ease: EASE, stagger: 0.09 }
        )
        .to('.splash', { yPercent: -100, duration: 1.15, ease: EASE_INOUT }, '+=0.12')

      // 标题强视觉进场：遮罩揭开 + 位移 + 压缩后归位（与幕布上滑重叠）
      intro
        .fromTo('.hero__eyebrow', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.7')
        .fromTo(
          '.hero__name',
          { yPercent: 62, scaleY: 1.25, transformOrigin: 'top', clipPath: 'inset(0 0 100% 0)' },
          {
            yPercent: 0,
            scaleY: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: EASE,
            clearProps: 'transform,clipPath',
          },
          '-=0.55'
        )
        .fromTo('.hero__role', { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=1.05')
        .fromTo('.hero__desc', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.8')
        .fromTo('.hero__foot', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
        .fromTo(
          '.hero__gallery',
          { opacity: 0, y: 34, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: EASE },
          '-=0.95'
        )

      /* ============ 2. 区块标题：英文大标题大幅进场 ============ */
      gsap.utils.toArray('.sec-head').forEach((head) => {
        const num = head.querySelector('.sec-head__num')
        const title = head.querySelector('.sec-head__title')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: head, start: 'top 82%', once: true },
          defaults: { ease: EASE },
        })
        if (num)
          tl.fromTo(num, { x: -26, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 })
        if (title)
          tl.fromTo(
            title,
            { yPercent: 58, clipPath: 'inset(0 0 100% 0)' },
            {
              yPercent: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.25,
              ease: EASE,
              clearProps: 'transform,clipPath',
            },
            '-=0.4'
          )
      })

      /* ============ 3. 卡片依次交错出现 ============ */
      const revealCards = (gridSel, itemSel) => {
        gsap.utils.toArray(gridSel).forEach((grid) => {
          gsap.fromTo(
            grid.querySelectorAll(itemSel),
            { y: 52, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              stagger: 0.1,
              ease: EASE,
              scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
            }
          )
        })
      }
      revealCards('.about__grid', '.about-card')
      revealCards('.strengths__grid', '.strength')

      /* ============ 4. 踩坑笔记：卡片依次错落进场 ============ */
      revealCards('.work__list', '.project')

      /* ============ 5. 联系区块大标题 ============ */
      const cTitle = document.querySelector('.contact__title')
      const cEmail = document.querySelector('.contact__email')
      const cSocial = document.querySelector('.contact__social')
      if (cTitle) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.contact', start: 'top 75%', once: true },
          defaults: { ease: EASE },
        })
        tl.fromTo(
          cTitle,
          { yPercent: 60, clipPath: 'inset(0 0 100% 0)' },
          {
            yPercent: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.45,
            ease: EASE,
            clearProps: 'transform,clipPath',
          }
        )
        if (cEmail) tl.fromTo(cEmail, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, '-=0.95')
        if (cSocial) tl.fromTo(cSocial, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
      }

      // 字体加载后布局可能变化，刷新触发点位置
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
      }
      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
