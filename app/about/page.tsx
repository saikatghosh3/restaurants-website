'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { loadWishlist } from '@/lib/wishlist'
import MobileMenu from '@/components/MobileMenu'
import Hero3D from '@/components/Hero3D'

const EMAIL = 'ziliankacchiandchinese@gmail.com'

const stats = [
  { n: '1', label: 'Copper handi\nwhere it all began' },
  { n: '12+', label: 'Dishes with full details on the menu' },
  { n: '10+', label: 'Years of patient, layered cooking' },
  { n: '3', label: 'Dine-in · Takeout · Catering' },
]

const milestones = [
  {
    year: '2026',
    title: 'A handi, a home, a dream',
    text: 'Zilian began in a modest kitchen with one copper handi and a stubborn belief that kacchi should be slow, layered and honest. Word spread faster than the food went cold.',
  },
  {
    year: '2017',
    title: 'Dhaka welcomes us',
    text: 'We opened our first dining room in Chandrima Model Town. Families returned weekend after weekend, and our Chinese station found its own devoted following.',
  },
  {
    year: '2021',
    title: 'Made for sharing',
    text: 'Family portions, handis and platters took centre stage. We became the address for birthdays, Eid dinners and everything in between.',
  },
  {
    year: 'Now',
    title: 'The royal table, everywhere',
    text: 'Dine in, take out or get it delivered — the same patience and spice travel beyond our walls. Thank you for a decade at our table.',
  },
]

const values = [
  { icon: '⏱', title: 'Nothing rushed', text: 'Every dish is prepared to order. If it takes a little longer, it is because we refuse to cut corners.' },
  { icon: '✦', title: 'Spices by hand', text: 'Our blends are ground in-house daily from whole, sourced spices. No shortcuts, no pre-mixes.' },
  { icon: '🍽', title: 'Made to share', text: 'Food tastes better across a crowded table. Our portions are designed for family and friends.' },
  { icon: '🤝', title: 'Guests first', text: 'You are a guest in our home. Warm service and a clean, elegant space come with every meal.' },
]

export default function AboutPage() {
  const [showTop, setShowTop] = useState(false)
  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setSavedCount(loadWishlist().length)
  }, [])

  return (
    <main id="top">
      {/* ── Nav ── */}
      <header className="topbar">
        <nav className="nav shell">
          <a href="/" className="brand">
            <Image src="/images/z-logo.jpg" width={42} height={42} alt="Zilian logo" className="brand-logo" priority />
            <span>ZILIAN<small>KACCHI &amp; CHINESE</small></span>
          </a>
        <div className="navlinks">
          <a href="/menu">Menu</a>
          <a href="/about" style={{ color: 'var(--gold)' }}>Story</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="nav-actions">
          <a className="wishlist-link" href="/menu?wl=1" title="Saved dishes">
            ♥ <b>{savedCount}</b>
          </a>
          <a className="cart-button" href="/menu" title="Order now">
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.2" />
              <circle cx="17.5" cy="20" r="1.2" />
              <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 2-1.6L20.5 7.5H6" />
            </svg>
            <span className="cart-label">Order</span>
          </a>
        </div>

        <MobileMenu active="about" />
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="story-hero shell">
        <div className="story-hero-inner">
          <div className="story-hero-copy">
            <p className="eyebrow">Est. 2026 · Chandrima Model Town, Dhaka</p>
            <h1>A decade of<br /><em>patient cooking.</em></h1>
            <p className="story-hero-text">
              Zilian means royal — and royal means nothing is ever rushed, reheated, or half-hearted.
              This is the story of how one copper handi grew into a table where Dhaka gathers.
            </p>
            <div className="story-hero-actions">
              <a className="button gold" href="/menu">Explore the menu</a>
              <a className="text-link" href="/about#milestones">Read the journey ↗</a>
            </div>
          </div>
          <div className="story-hero-media">
            <Hero3D
              fill
              src="/images/zilian-new-hero.jpg"
              alt="Freshly layered biryani at Zilian"
              sizes="(max-width:760px) 100vw, 50vw"
              priority
            />
            <div className="story-hero-filled">
              <span className="story-hero-stamp">EST</span>
              <b>Since 2026</b>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="story-stats">
        <div className="shell story-stats-inner">
          {stats.map((s) => (
            <div className="story-stat" key={s.label}>
              <b>{s.n}</b>
              <span>{s.label.replace('\n', '\n')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="story-intro shell">
        <div className="story-intro-grid">
          <div className="story-intro-copy">
            <p className="eyebrow">The Zilian table</p>
            <h2>Food with a little more <em>feeling.</em></h2>
            <p className="story-drop">
              There is a certain warmth to food that takes time. At Zilian, our kacchi is layered by
              hand, our Chinese dishes leave the wok at just the right moment, and every recipe is
              made to bring people closer.
            </p>
            <p>
              Since 2026, we have served authentic kacchi biryani and Chinese favourites in
              Chandrima Model Town, Dhaka — with generous spice and a little royal theatre on every plate.
            </p>
          </div>
          <div className="story-intro-media">
            <Hero3D
              fill
              src="/images/zilian-hero.png"
              alt="Zilian spread ready for the table"
              sizes="(max-width:760px) 100vw, 45vw"
            />
            <div className="story-intro-card">
              <b>2026</b>
              <span>Established —<br />still family-run</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Milestones timeline ── */}
      <section id="milestones" className="story-timeline shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">How we got here</p>
            <h2>The road to <em>royal.</em></h2>
          </div>
          <p className="section-note">From one handi to the table<br />where Dhaka gathers.</p>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <article className="timeline-item" key={m.year}>
              <div className="timeline-rail">
                <span className="timeline-dot" />
                {i < milestones.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-card">
                <div className="timeline-top">
                  <span className="milestone-num">0{i + 1}</span>
                  <b className="timeline-year">{m.year}</b>
                </div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we stand for</p>
            <h2>The Zilian <em>promise.</em></h2>
          </div>
          <p className="section-note">Four rules we refuse to break,<br />no matter how busy the season gets.</p>
        </div>
        <div className="values-grid">
          {values.map((v) => (
            <article className="value-card" key={v.title}>
              <span className="value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="story-quote shell">
        <div className="story-quote-inner">
          <span className="story-quote-mark">“</span>
          <blockquote>We never learned to cook fast.<br />We only learned to cook <em>right.</em></blockquote>
          <p className="story-quote-by">— The Zilian kitchen, on every plate since 2026</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section shell">
        <div className="cta-inner">
          <div className="cta-glow"></div>
          <Image src="/images/z-logo.jpg" width={64} height={64} alt="Zilian logo" className="cta-mark-img" />
          <p className="eyebrow">Come be part of it</p>
          <h2>Your table is<br /><em>waiting.</em></h2>
          <div className="cta-buttons">
            <a className="button gold" href="/menu">Explore the menu</a>
            <a className="button outline" href="/contact">Reserve a table</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="shell">
          <div className="footer-top">
            <div className="footer-brand-col">
              <a href="/" className="brand footer-brand">
                <Image src="/images/z-logo.jpg" width={42} height={42} alt="Zilian logo" className="brand-logo" />
                <span>ZILIAN<small>KACCHI &amp; CHINESE</small></span>
              </a>
              <p className="footer-tagline">Rich flavour. Royal experience.<br />Authentic kacchi and Chinese since 2026.</p>
              <div className="footer-social">
                <a href="https://wa.me/8801322422282" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="https://instagram.com/ziliankacchiandchinese" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://facebook.com/ZilianKacchiAndChinese" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick links</h4>
              <ul>
                <li><a href="/menu">Our menu</a></li>
                <li><a href="/about">Our story</a></li>
                <li><a href="/contact">Contact us</a></li>
                <li><a href="/menu">Order online</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:+8801322422282">+880 1322 422 282</a></li>
                <li><a href="tel:+8801333207660">+880 1333 207 660</a></li>
                <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li>House-01, Road-10, Block-A</li>
                <li>Chandrima Model Town, Dhaka</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Hours</h4>
              <ul>
                <li>Sat – Thu</li>
                <li className="footer-hours">12:00 PM – 11:00 PM</li>
                <li>Friday</li>
                <li className="footer-hours">3:00 PM – 11:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 Zilian Restaurant. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="https://wa.me/8801322422282?text=Hi%20Zilian!%20I%20want%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer">Order via WhatsApp</a>
              <span>·</span>
              <a href="https://maps.google.com/?q=Chandrima+Model+Town+Dhaka" target="_blank" rel="noopener noreferrer">View on map</a>
            </div>
          </div>
        </div>
      </footer>

      {showTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">↑</button>
      )}
    </main>
  )
}