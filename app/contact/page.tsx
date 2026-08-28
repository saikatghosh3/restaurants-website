'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { loadWishlist } from '@/lib/wishlist'
import MobileMenu from '@/components/MobileMenu'

const WHATSAPP = '8801322422282'
const INSTAGRAM = 'ziliankacchiandchinese'
const FACEBOOK = 'ZilianKacchiAndChinese'
const EMAIL = 'ziliankacchiandchinese@gmail.com'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
          <a href="/about">Story</a>
          <a href="/contact" style={{ color: 'var(--gold)' }}>Contact</a>
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

        <MobileMenu active="contact" />
      </nav>
      </header>

      {/* ── Hero ── */}
      <section className="contact-hero shell">
        <p className="eyebrow">Get in touch</p>
        <h1>We&apos;d love to<br /><em>hear from you.</em></h1>
        <p className="contact-hero-text">
          Whether you have a question, want to plan a gathering, or just want to say hello — we&apos;re here for you.
        </p>
      </section>

      {/* ── Quick Connect ── */}
      <section className="quick-connect shell">
        <p className="eyebrow">Quick connect</p>
        <div className="social-grid">
          <a className="social-card whatsapp" href={`https://wa.me/${WHATSAPP}?text=Hi%20Zilian!`} target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <div>
              <span className="social-label">WhatsApp</span>
              <span className="social-value">Chat with us instantly</span>
            </div>
            <span className="social-arrow">↗</span>
          </a>

          <a className="social-card instagram" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <div>
              <span className="social-label">Instagram</span>
              <span className="social-value">@{INSTAGRAM}</span>
            </div>
            <span className="social-arrow">↗</span>
          </a>

          <a className="social-card facebook" href={`https://facebook.com/${FACEBOOK}`} target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <div>
              <span className="social-label">Facebook</span>
              <span className="social-value">{FACEBOOK}</span>
            </div>
            <span className="social-arrow">↗</span>
          </a>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="contact-body shell">
        <div className="contact-grid">
          {/* Left — Info */}
          <div className="contact-info-col">
            <div className="contact-card">
              <span className="contact-card-label">Call us</span>
              <a href="tel:+8801322422282">+880 1322 422 282</a>
              <a href="tel:+8801333207660">+880 1333 207 660</a>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">Visit us</span>
              <p>House-01, Road-10, Block-A<br />Chandrima Model Town, Dhaka</p>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">Email us</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">Hours</span>
              <p>Sat – Thu : 12:00 PM – 11:00 PM</p>
              <p>Friday : 3:00 PM – 11:00 PM</p>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">Quick order</span>
              <a className="whatsapp-link" href={`https://wa.me/${WHATSAPP}?text=Hi%20Zilian!%20I%20want%20to%20place%20an%20order.`} target="_blank" rel="noopener noreferrer">
                Order via WhatsApp ↗
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-col">
            {submitted ? (
              <div className="form-success">
                <span className="check">✓</span>
                <p className="eyebrow">Message sent</p>
                <h2>Thank you for<br /><em>reaching out.</em></h2>
                <p>We&apos;ll get back to you within 24 hours.</p>
                <button className="button gold" onClick={() => { setSubmitted(false); setName(''); setPhone(''); setSubject(''); setMessage('') }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="eyebrow">Send a message</p>
                <h2>Let&apos;s <em>talk.</em></h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your name</label>
                    <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahim" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1XXX XXX XXX" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" required value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="" disabled>Choose a topic</option>
                    <option value="reservation">Table reservation</option>
                    <option value="catering">Catering inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="bulk-order">Bulk / group order</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" className="button gold full">Send message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="contact-map shell">
        <div className="map-placeholder">
          <p>Find us at Chandrima Model Town, Dhaka</p>
          <a className="button gold" href="https://maps.google.com/?q=Chandrima+Model+Town+Dhaka" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
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
                <li><a href="mailto:ziliankacchiandchinese@gmail.com">ziliankacchiandchinese@gmail.com</a></li>
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
