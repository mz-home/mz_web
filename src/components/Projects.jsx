// 把“作品集”变成搭建这个网站时遇到的真实问题与解法（学生实习向作品集）。
// 这些都是实际踩过的坑，真实可信，能展示解决问题与技术复盘的能力。
const logs = [
  {
    id: '01',
    tag: 'Vite · 部署',
    q: '画廊图片部署后打不开',
    a: '最初把图片放 public/ 并用绝对路径 /gallery/x.jpg，部署到子路径（如 GitHub Pages 的仓库目录）就 404。改成用 Vite 的 import.meta.glob 收集 src/assets/gallery 下的图片，构建时打包并加哈希；配合 vite.config.js 的 base:\'./\' 相对路径，部署到任意目录都能正常加载。',
  },
  {
    id: '02',
    tag: 'CSS · 定位',
    q: '导航栏不居中、滚动不跟随',
    a: 'site-nav 类只加在了内部 <nav>，外层容器没命中，导致固定/居中样式失效，导航跑到顶部且不跟随。把类名同时加到外层容器，让 .pill-nav-container.site-nav 双类选择器生效；再用 position: fixed + transform 居中，滚动时始终停在顶部跟随。',
  },
  {
    id: '03',
    tag: 'GSAP · 动效',
    q: '开场 Logo 动画太普通',
    a: '最初用模糊+微缩聚焦，不够设计感。改成把 M / Z / . 各自包进 overflow:hidden 遮罩，从下方依次浮出（GSAP 逐字 stagger + expo.out），更高级且完全没有廉价弹跳感。',
  },
  {
    id: '04',
    tag: 'GSAP · 性能',
    q: '图片缩放揭示和 hover 过渡打架',
    a: '项目图进场用 GSAP 逐帧 scale，但 CSS 上又有 transform 过渡，两者互相干扰导致卡顿。揭示动画期间用 gsap.set 临时把 CSS transition 设为 none，结束再 clearProps 还原——既保留 hover 效果，进场又丝滑。',
  },
  {
    id: '05',
    tag: '性能 · 无障碍',
    q: '首屏动效怕卡、怕劝退',
    a: '只用 transform / opacity / clip-path（GPU 友好，不触发重排）；每个区块进场 once:true 一次即停，不反复计算；并尊重 prefers-reduced-motion，开启该偏好的用户直接看到内容、跳过动画。',
  },
  {
    id: '06',
    tag: 'GitHub Pages · 路径',
    q: '视频和 Logo 部署后不显示',
    a: '首页 Hero 视频、导航栏 MZ 图标、浏览器 favicon 最初都用了绝对路径（/hero.mp4、/logo.svg、/favicon.svg）。项目页部署在 GitHub Pages 的子路径 /mz_web/ 下，绝对路径会指向根域名顶层而 404。统一改成相对路径（./hero.mp4、./logo.svg、./favicon.svg），跟随页面位置加载，子路径部署也能正常显示。',
  },
  {
    id: '07',
    tag: 'CI · GitHub Actions',
    q: '部署报错：找不到 Pages 站点',
    a: 'GitHub Actions 第一次部署报 HttpError: 找不到 Pages 站点。原因是仓库刚建、Pages 还没启用。在 workflow 的 actions/configure-pages 步骤加上 enablement: true，让 CI 自动激活 Pages，之后每次 push 都自动构建并发布。',
  },
  {
    id: '08',
    tag: 'Git · 网络',
    q: 'git push 连不上 GitHub',
    a: '本机直连 github.com 网络不稳定，push 经常 Failed to connect / Connection was reset。两种办法：一是直接重试 git push，多试几次通常能连上；二是改用国内镜像中转 git push https://ghproxy.com/https://github.com/用户名/仓库.git main，由镜像服务器代连 GitHub，终点仓库完全一样。',
  },
]

export default function Projects() {
  return (
    <section className="work section" id="work">
      <div className="container">
        <header className="sec-head">
          <span className="sec-head__num">02 / BUILD LOG</span>
          <h2 className="sec-head__title">做这个网站，我踩过的坑</h2>
        </header>

        <div className="work__list">
          {logs.map((l) => (
            <article className="project" key={l.id}>
              <div className="project__bar">
                <span className="project__id">{l.id}</span>
                <span className="project__tag">{l.tag}</span>
              </div>
              <p className="project__q">{l.q}</p>
              <p className="project__a">{l.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
