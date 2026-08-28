'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { loadWishlist } from '@/lib/wishlist'
import MobileMenu from '@/components/MobileMenu'
import Hero3D from '@/components/Hero3D'

const reviews = [
  {
    name: 'Nusrat Jahan',
    role: 'Food blogger',
    text: 'The mutton kacchi is hands-down the closest to home I\'ve found in the city. The meat falls off the bone and the rice is fragrant without being oily. Zilian has ruined every other biryani for me.',
    stars: 5, initial: 'N',
    highlight: 'Best kacchi in town',
  },
  {
    name: 'Rafiq Chowdhury',
    role: 'Regular since 2016',
    text: 'We\'ve celebrated every family occasion here — birthdays, Eid dinners, you name it. The family portions are generous, the staff treat you like guests in their own home, and the Chinese dishes are as good as the biryani.',
    stars: 5, initial: 'R',
    highlight: 'Our family\u2019s go-to',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Ordered online',
    text: 'Ordered the Family Feast for delivery and it arrived hot, sealed and on time. The handi still had that smoky, freshly-layered taste. Price felt fair for the quality — you can tell nothing is rushed.',
    stars: 4, initial: 'T',
    highlight: 'Delivery done right',
  },
  {
    name: 'Sharmin Sultana',
    role: 'First-time guest',
    text: 'Came in on a friend\u2019s recommendation and left a regular. The service was welcoming, the place is clean and elegant, and the chicken kacchi was beautifully spiced. Already planning my next table booking.',
    stars: 5, initial: 'S',
    highlight: 'Won me over instantly',
  },
]

const services = [
  {
    icon: '🍽',
    title: 'Dine-in',
    desc: 'Step into Zilian and enjoy a royal dining experience. Our warm, elegant space is perfect for family dinners, couple dates, or a meal with friends. Every table gets the full Zilian treatment — fresh food, attentive service, and an ambiance worth savouring.',
  },
  {
    icon: '📦',
    title: 'Takeout',
    desc: 'Craving Zilian at home? Place your order and pick it up hot and fresh. Our takeout packaging keeps your biryani fragrant and your Chinese dishes crisp — restaurant quality, wherever you eat.',
  },
  {
    icon: '🎉',
    title: 'Party Booking',
    desc: 'Hosting a birthday, anniversary, or celebration? Let Zilian handle the food. We offer customised party menus, bulk ordering, and special platters designed to make your event truly memorable. Call us to book ahead.',
  },
  {
    icon: '🏨',
    title: 'Catering Service',
    desc: 'From corporate gatherings to weddings, our catering team delivers the full Zilian experience to your venue. We work with you on menu planning, portioning, and logistics — so you can focus on your guests while we handle the feast.',
  },
]

export default function Page() {
  const [reviewIndex, setReviewIndex] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [savedCount, setSavedCount] = useState(0)
  const prevReview = () => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length)
  useEffect(() => {
    setSavedCount(loadWishlist().length)
  }, [])
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main id="top">
      {/* ── Nav ── */}
      <header className="topbar">
        <nav className="nav shell">
          <a href="#top" className="brand">
            <Image src="/images/z-logo.jpg" width={42} height={42} alt="Zilian logo" className="brand-logo" priority />
            <span>ZILIAN<small>KACCHI &amp; CHINESE</small></span>
          </a>
        <div className="navlinks">
          <a href="/menu">Menu</a>
          <a href="/about">Story</a>
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

        <MobileMenu active="home" />
      </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow-shimmer">Rich flavour. Royal experience.</p>
          <h1>A table worth<br /><em>gathering</em> for.</h1>
          <p className="hero-text">
            Authentic kacchi biryani and Chinese favourites, made with patience,
            generous spice and a little royal theatre.
          </p>
          <div className="hero-actions">
            <a className="button gold" href="/menu">Explore the menu</a>
            <a className="text-link" href="tel:+8801322422282">Call to reserve ↗</a>
          </div>
        </div>
        <div className="hero-art">
          <Hero3D
            fill
            src="/images/zilian-new-hero.jpg"
            alt="Mutton kacchi biryani in a copper handi"
            sizes="(max-width:760px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      {/* ── Ribbon ticker ── */}
      <section className="ribbon" aria-label="Zilian highlights">
        <div className="shell">
          <div className="ribbon-track">
            {[0, 1].map((dup) => (
              <div className="ribbon-set" key={dup} aria-hidden={dup === 1}>
                <span>Made for sharing</span><i>✦</i>
                <span>House spices</span><i>✦</i>
                <span>Dhaka, Bangladesh</span><i>✦</i>
                <span>Dine in · Take out · Catering</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we offer</p>
            <h2>Our services.</h2>
          </div>
          <p className="section-note">From a quiet dinner to a grand celebration,<br />Zilian has you covered.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={s.title}>
              <div className="service-top">
                <span className="service-num">0{i + 1}</span>
                <div className="service-icon-wrap">
                  <span className="service-icon">{s.icon}</span>
                </div>
              </div>
              <div className="service-body">
                <h3>{s.title}</h3>
                <div className="service-line"></div>
                <p>{s.desc}</p>
              </div>
              <a className="service-link" href="/contact">Enquire now ↗</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Today's Offer ── */}
      <section className="offers shell">
        <div className="offers-banner">
          <div className="offers-badge">Today&apos;s special</div>
          <div className="offers-header">
            <h2>Deals worth<br /><em>every bite.</em></h2>
            <p>Fresh offers daily — because great food shouldn&apos;t wait.</p>
          </div>
          <div className="offers-grid">
            <div className="offer-card offer-highlight">
              <div className="offer-tag">Best deal</div>
              <h3>Family Feast Combo</h3>
              <p className="offer-desc">Mutton Kacchi + Chicken Roast + Firni for 3 — the perfect family spread.</p>
              <div className="offer-pricing">
                <span className="offer-old">৳ 1,100</span>
                <span className="offer-new">৳ 899</span>
              </div>
              <a className="button gold" href="/menu">Order now</a>
            </div>
            <div className="offer-card">
              <div className="offer-tag">Limited</div>
              <h3>Lunch Special</h3>
              <p className="offer-desc">Any single plate biryani + soft drink — every weekday, 12–3 PM only.</p>
              <div className="offer-pricing">
                <span className="offer-old">৳ 450</span>
                <span className="offer-new">৳ 349</span>
              </div>
              <a className="button outline" href="/menu">View menu</a>
            </div>
            <div className="offer-card">
              <div className="offer-tag">Free</div>
              <h3>Free Delivery</h3>
              <p className="offer-desc">Order above ৳ 800 and get doorstep delivery on us. No hidden charges.</p>
              <div className="offer-pricing">
                <span className="offer-old">৳ 100</span>
                <span className="offer-new">Free</span>
              </div>
              <a className="button outline" href="/menu">Order now</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Menu teaser ── */}
      <section className="fullmenu shell">
        <div className="fullmenu-card">
          <div className="fullmenu-copy">
            <div className="fullmenu-badge">Full menu · 12 dishes</div>
            <h2>Every dish,<br /><em>in full detail.</em></h2>
            <p>
              Our dedicated menu page is the complete guide to everything Zilian serves — real
              descriptions of every dish, all serving options (single plate, full handi, family
              portion), tags, and honest prices.
            </p>
            <ul className="fullmenu-picks">
              <li>Kacchi Biryani</li>
              <li>Chinese</li>
              <li>Platters</li>
              <li>Desserts</li>
            </ul>
            <div className="fullmenu-actions">
              <a className="button gold" href="/menu">Browse the full menu</a>
              <a className="text-link" href="/menu">See all dishes with details ↗</a>
            </div>
          </div>
          <div className="fullmenu-meta">
            <div className="fullmenu-stat">
              <b>12</b>
              <span>dishes listed with full details</span>
            </div>
            <div className="fullmenu-stat">
              <b>4</b>
              <span>menu categories, all in one place</span>
            </div>
            <div className="fullmenu-stat">
              <b>2–4</b>
              <span>serving options on every dish</span>
            </div>
            <div className="fullmenu-stat">
              <b>৳</b>
              <span>honest prices, servings &amp; tags</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="story shell">
        <div className="story-image">
          <Image
            src="/images/zilian-new-hero.jpg"
            alt="Freshly prepared biryani at Zilian"
            fill
            sizes="(max-width:760px) 100vw, 50vw"
            style={{ objectFit: 'cover', filter: 'brightness(.65)' }}
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">The Zilian table</p>
          <h2>Food with a little more <em>feeling.</em></h2>
          <p>
            There is a certain warmth to food that takes time. At Zilian, our kacchi
            is layered by hand, our Chinese dishes leave the wok at just the right
            moment, and every recipe is made to bring people closer.
          </p>
          <a className="text-link" href="/contact">Get in touch ↗</a>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="reviews shell">
        <div className="reviews-heading">
          <p className="eyebrow">Word on the street</p>
          <h2>Guests, <em>unfiltered.</em></h2>
          <p className="reviews-sub">Real words from the people who keep our handis busy.</p>
        </div>
        <div className="slider-wrap">
          <div className="slider-track" style={{ transform: `translateX(-${reviewIndex * 100}%)` }}>
            {reviews.map((r) => (
              <article className="review-card" key={r.name}>
                <span className="review-mega">“</span>
                <div className="review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <p className="review-text">“{r.text}”</p>
                <footer className="review-foot">
                  <span className="review-avatar">{r.initial}</span>
                  <div className="review-id">
                    <p className="review-name">{r.name}</p>
                    <p className="review-role">{r.role}</p>
                  </div>
                  <span className="review-highlight">{r.highlight}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
        <div className="slider-controls">
          <button className="slider-arrow" onClick={prevReview} aria-label="Previous review">←</button>
          <div className="slider-dots">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                className={`slider-dot ${i === reviewIndex ? 'active' : ''}`}
                onClick={() => setReviewIndex(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button className="slider-arrow" onClick={nextReview} aria-label="Next review">→</button>
        </div>
      </section>

      {/* ── CTA Contact ── */}
      <section id="contact" className="cta-section shell">
        <div className="cta-inner">
          <div className="cta-glow"></div>
          <Image src="/images/z-logo.jpg" width={64} height={64} alt="Zilian logo" className="cta-mark-img" />
          <p className="eyebrow">Come as you are</p>
          <h2>Your next feast<br /><em>starts here.</em></h2>
          <p className="cta-text">
            Visit us in Chandrima Model Town or give us a call. We&apos;re always happy to help you plan the perfect meal.
          </p>
          <div className="cta-actions">
            <div className="cta-contact">
              <span className="cta-contact-icon">☎</span>
              <div>
                <span className="cta-contact-label">Reserve a table</span>
                <a className="cta-contact-value" href="tel:+8801322422282">+880 1322 422 282</a>
              </div>
            </div>
            <div className="cta-contact">
              <span className="cta-contact-icon">✉</span>
              <div>
                <span className="cta-contact-label">Write to us</span>
                <a className="cta-contact-value" href="mailto:ziliankacchiandchinese@gmail.com">ziliankacchiandchinese@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="cta-buttons">
            <a className="button gold" href="tel:+8801322422282">Call now</a>
            <a className="button outline" href="https://wa.me/8801322422282" target="_blank" rel="noopener noreferrer">
              <svg className="cta-wa" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp us
            </a>
          </div>
          <p className="cta-note">Open daily · Dine-in, takeout &amp; catering</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="shell">
          <div className="footer-top">
            <div className="footer-brand-col">
              <a href="#top" className="brand footer-brand">
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
              <a href="/contact">Book a table</a>
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