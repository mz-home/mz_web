// 优势文案：基于你真实做过的事（独立搭建本站点 + BUILD LOG 踩坑），
// 作为实习求职的诚实呈现。措辞可按你的感觉再调。
const strengths = [
  {
    n: '01',
    t: '前端基础 · 能动手做网站',
    d: '用 React + Vite 从零搭起这个站点，能写组件、调样式、接动效——不只是会用，是能落地。',
  },
  {
    n: '02',
    t: '设计与审美',
    d: '视觉与交互自己把控，熟练 Figma / PS / AE，做出来的东西干净、有质感。',
  },
  {
    n: '03',
    t: '自学 & 解决问题',
    d: '部署 404、动效冲突、性能卡顿……这些坑都是自己查资料啃下来的（见搭建笔记）。',
  },
  {
    n: '04',
    t: '踏实肯学',
    d: '愿意从基础做起，边做边学；把每一次踩坑都变成可复用的经验。',
  },
]

export default function Strengths() {
  return (
    <section className="strengths section" id="strengths">
      <div className="container">
        <header className="sec-head">
          <span className="sec-head__num">03 / WHAT I DO</span>
          <h2 className="sec-head__title">我能做什么</h2>
        </header>

        <div className="strengths__grid">
          {strengths.map((s) => (
            <div className="strength" key={s.n}>
              <span className="strength__n">{s.n}</span>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
