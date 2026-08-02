import { useState } from 'react'

// 可选：在 .env 中配置 VITE_FORMSPREE_ID 即可用 Formspree 收信；
// 未配置时，表单提交会自动打开访客的邮件客户端（mailto 回退），本地也能用。
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
const MAIL_TO = '32442558402@qq.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const subject = `实习 / 合作咨询 · ${form.name || '匿名'}`
    const body = `${form.name}（${form.email}）\n\n${form.message}`

    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          setSent(true)
          setForm({ name: '', email: '', message: '' })
          return
        }
      } catch {
        /* 网络异常 → 回退 mailto */
      }
    }
    // mailto 回退
    window.location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <footer className="contact" id="contact">
      <div className="container contact__inner">
        <p className="eyebrow">GET IN TOUCH</p>

        <div className="contact__grid">
          <aside className="contact__aside">
            <h2 className="contact__title">
              一起把想法，
              <br />
              变成作品。
            </h2>
            <p className="contact__lead">
              如果你在找一位踏实、愿意边做边学的前端实习生，欢迎聊聊。
              我通常会在 1–2 个工作日内回复。
            </p>

            <a href={`mailto:${MAIL_TO}`} className="contact__email">
              {MAIL_TO}
            </a>

            <ul className="contact__meta">
              <li>
                <span>所在地</span>中国 · 成都
              </li>
              <li>
                <span>可实习</span>6 个月以上 · 每周 5 天
              </li>
              <li>
                <span>响应时间</span>1–2 个工作日
              </li>
            </ul>

            <div className="contact__social">
              <a href="#" target="_blank" rel="noreferrer">
                Behance
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="微信：mzmzmzcome"
                onClick={(e) => e.preventDefault()}
              >
                微信 · mzmzmzcome
              </a>
            </div>
          </aside>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span>称呼</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="你的名字 / 公司"
              />
            </label>

            <label className="field">
              <span>邮箱</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="name@email.com"
              />
            </label>

            <label className="field">
              <span>项目简述</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="说说实习岗位、团队，以及你能提供的机会"
              />
            </label>

            <button type="submit" className="contact__submit">
              发送留言 →
            </button>

            {sent && <p className="contact__ok">已收到，我会尽快回复你 ✓</p>}
            <p className="contact__hint">
              未配置后端时，提交会直接打开你的邮件客户端。
            </p>
          </form>
        </div>
      </div>

      <div className="container contact__bottom">
        <span>© 2026 MAO ZHANG STUDIO</span>
        <a href="#top" className="contact__top">
          回到顶部 ↑
        </a>
      </div>
    </footer>
  )
}
