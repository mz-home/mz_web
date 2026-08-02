import BorderGlow from './BorderGlow.jsx'

const glowProps = {
  edgeSensitivity: 28,
  glowColor: '260 40 78',
  backgroundColor: '#14171C',
  borderRadius: 28,
  glowRadius: 36,
  glowIntensity: 1.1,
  coneSpread: 28,
  colors: ['#c084fc', '#f472b6', '#38bdf8'],
}

// 身份：在校学生 / 求职实习（职位暂以在读身份呈现，确定后告诉我替换）
const NAME = '毛章'
const ROLE = '在校学生 / 求职实习'

// 教育背景（在读信息）
const edu = {
  school: '四川城市职业学院',
  major: '计算机应用技术',
  year: '2027 届',
  city: '成都',
}

const skills = ['品牌识别', '视觉系统', '艺术指导', '字体设计', '包装', '展陈 / 空间']
const tools = ['Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Blender']

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="sec-head">
          <span className="sec-head__num">02</span>
          <h2 className="sec-head__title">About</h2>
        </div>

        <div className="about__grid">
          {/* 模块一：身份 + 简介（一句定位） */}
          <BorderGlow className="about-card about-card--bio" {...glowProps}>
            <p className="eyebrow">ABOUT — 关于我</p>
            <p className="about__name">
              {NAME} <span>{ROLE}</span>
            </p>
            <h2 className="about__title">把学到的代码，做成能跑起来的东西。</h2>
            <p className="about__text">
              计算机应用技术专业在读，平时喜欢折腾网站与设计。这个站就是我自己
              用 React + Vite 搭的——下面记了搭建时踩过的坑，也是我找实习的敲门砖。
            </p>
          </BorderGlow>

          {/* 模块二：技能 / 工具清单（替代头像） */}
          <BorderGlow className="about-card about-card--skills" {...glowProps}>
            <p className="eyebrow">SKILLS — 擅长</p>
            <ul className="about__tags">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="eyebrow about__tags-sub">TOOLS — 工具</p>
            <ul className="about__tags about__tags--tools">
              {tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </BorderGlow>

          {/* 模块三：联系方式（已同步为成都 + 真实邮箱） */}
          <BorderGlow className="about-card about-card--contact" {...glowProps}>
            <ul className="about__contact">
              <li>
                <span>Email</span>
                <a href="mailto:3244258402@qq.com">3244258402@qq.com</a>
              </li>
              <li>
                <span>Location</span>
                <p>成都 / 远程</p>
              </li>
              <li>
                <span>Social</span>
                <p>Behance · Instagram · 微信 mzmzmzcome</p>
              </li>
            </ul>
          </BorderGlow>

          {/* 模块四：工作方式（首个网站无履历数据，改用真实的设计流程） */}
          <BorderGlow className="about-card about-card--process" {...glowProps}>
            <p className="eyebrow">PROCESS — 工作方式</p>
            <ol className="about__process">
              <li>
                <b>01</b>
                <span>沟通 Brief</span>
                <p>了解目标、受众与边界</p>
              </li>
              <li>
                <b>02</b>
                <span>调研策略</span>
                <p>梳理定位与视觉方向</p>
              </li>
              <li>
                <b>03</b>
                <span>视觉设计</span>
                <p>从概念到系统化产出</p>
              </li>
              <li>
                <b>04</b>
                <span>交付落地</span>
                <p>规范交付与持续支持</p>
              </li>
            </ol>
          </BorderGlow>

          {/* 模块五：教育背景（在读信息） */}
          <BorderGlow className="about-card about-card--edu" {...glowProps}>
            <p className="eyebrow">EDUCATION — 教育背景</p>
            <ul className="about__edu">
              <li>
                <span>学校</span>
                <b>{edu.school}</b>
              </li>
              <li>
                <span>专业</span>
                <b>{edu.major}</b>
              </li>
              <li>
                <span>届别</span>
                <p>{edu.year}</p>
              </li>
              <li>
                <span>城市</span>
                <p>{edu.city}</p>
              </li>
            </ul>
          </BorderGlow>
        </div>
      </div>
    </section>
  )
}
