'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { allTags, categories, dishes, PRICE_MAX, PRICE_MIN, type Dish } from '@/lib/menu'
import { loadWishlist, saveWishlist } from '@/lib/wishlist'
import MobileMenu from '@/components/MobileMenu'

type CartLine = { dish: Dish; option: string; quantity: number }
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

const WHATSAPP = '8801322422282'
const EMAIL = 'ziliankacchiandchinese@gmail.com'

const countFor = (c: string) =>
  c === 'All' ? dishes.length : dishes.filter((d) => d.category === c).length

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name A–Z' },
]

export default function MenuPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [popularOnly, setPopularOnly] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [range, setRange] = useState({ min: PRICE_MIN, max: PRICE_MAX })
  const [sort, setSort] = useState<SortKey>('featured')
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [wishlisted, setWishlisted] = useState<number[]>(() =>
    typeof window === 'undefined' ? [] : loadWishlist()
  )

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    saveWishlist(wishlisted)
  }, [wishlisted])

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('wl') === '1') {
      setWishlistOpen(true)
    }
  }, [])

  const [cart, setCart] = useState<CartLine[]>([])
  const [selected, setSelected] = useState<Dish | null>(null)
  const [option, setOption] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    method: 'Cash on Delivery',
    note: '',
  })

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = dishes.filter((d) => {
      if (category !== 'All' && d.category !== category) return false
      if (q && !`${d.name} ${d.description}`.toLowerCase().includes(q)) return false
      if (popularOnly && !d.popular) return false
      if (tags.length && !tags.every((t) => d.tags?.includes(t))) return false
      if (d.price < range.min || d.price > range.max) return false
      return true
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'featured')
      list = [...list].sort((a, b) => Number(b.popular ?? false) - Number(a.popular ?? false))
    return list
  }, [category, search, popularOnly, wishlisted, tags, range, sort])

  const totalItems = cart.reduce((s, l) => s + l.quantity, 0)
  const total = cart.reduce((s, l) => s + l.dish.price * l.quantity, 0)
  const deliveryFee = total >= 800 ? 0 : 60
  const grandTotal = total + deliveryFee
  const activeFilters =
    Number(category !== 'All') + Number(!!search) + Number(popularOnly) +
    tags.length + Number(range.min > PRICE_MIN) + Number(range.max < PRICE_MAX)

  const toggleWish = (id: number) =>
    setWishlisted((p) => (p.includes(id) ? p.filter((i) => i !== id) : [...p, id]))

  const openOptions = (dish: Dish) => {
    setSelected(dish)
    setOption(dish.options[0])
  }

  const addToCart = () => {
    if (!selected) return
    setCart((items) => {
      const ex = items.find((l) => l.dish.id === selected.id && l.option === option)
      return ex
        ? items.map((l) => (l === ex ? { ...l, quantity: l.quantity + 1 } : l))
        : [...items, { dish: selected, option, quantity: 1 }]
    })
    setSelected(null)
  }

  const changeQty = (i: number, d: number) =>
    setCart((items) =>
      items.flatMap((l, idx) => (idx !== i ? [l] : l.quantity + d < 1 ? [] : [{ ...l, quantity: l.quantity + d }]))
    )

  const setC = (k: keyof typeof customer) => (e: { target: { value: string } }) =>
    setCustomer((c) => ({ ...c, [k]: e.target.value }))

  const placeOrder = () => {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) return
    setCheckout(false)
    setOrdered(true)
  }

  const toggleTag = (t: string) =>
    setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))

  const resetFilters = () => {
    setCategory('All')
    setSearch('')
    setPopularOnly(false)
    setTags([])
    setRange({ min: PRICE_MIN, max: PRICE_MAX })
  }

  const minPct = ((range.min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
  const maxPct = ((range.max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100

  return (
    <main>
      {/* ── Nav ── */}
      <header className="topbar">
        <nav className="nav shell">
          <a href="/" className="brand">
            <Image src="/images/z-logo.jpg" width={42} height={42} alt="Zilian logo" className="brand-logo" priority />
            <span>ZILIAN<small>KACCHI &amp; CHINESE</small></span>
          </a>
        <div className="navlinks">
          <a href="/menu" style={{ color: 'var(--gold)' }}>Menu</a>
          <a href="/about">Story</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="nav-actions">
          <button
            className={`wishlist-link ${wishlistOpen ? 'active' : ''}`}
            onClick={() => setWishlistOpen((o) => !o)}
            aria-label={`${wishlistOpen ? 'Close' : 'Open'} saved dishes, ${wishlisted.length} saved`}
            aria-expanded={wishlistOpen}
            title={wishlistOpen ? 'Close saved dishes' : 'Open saved dishes'}
          >
            ♥ <b>{wishlisted.length}</b>
          </button>
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open order, ${totalItems} item${totalItems === 1 ? '' : 's'}`}
          >
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.2" />
              <circle cx="17.5" cy="20" r="1.2" />
              <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 2-1.6L20.5 7.5H6" />
            </svg>
            <span className="cart-label">Order</span>
            {totalItems > 0 && <b>{totalItems}</b>}
          </button>
        </div>

        <MobileMenu active="menu" />
      </nav>
      </header>

      {/* ── Hero ── */}
      <section className="menu-hero shell">
        <p className="eyebrow">From our kitchen</p>
        <h1>Every handi,<br /><em>every detail.</em></h1>
        <p className="menu-hero-text">
          The complete Zilian menu — every dish with its full description, options,
          servings and price. Filter by category, tag, price or just search for a craving.
        </p>
      </section>

      {/* ── Menu Layout ── */}
      <section className="menu-page shell">
        <aside className="menu-sidebar">
          <div className="sidebar-panel">
            <div className="sidebar-panel-head">
              <div className="sidebar-panel-title">
                <h3>Filters</h3>
                {activeFilters > 0 && <span className="sidebar-panel-count">{activeFilters} active</span>}
              </div>
              <button className="sidebar-reset" onClick={resetFilters} disabled={!activeFilters}>
                Reset all
              </button>
            </div>
            <div className="sidebar-blocks">
              <div className="sidebar-block">
                <h4>Categories</h4>
                <ul className="cat-list">
                  {categories.map((c) => (
                    <li key={c}>
                      <button className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>
                        <span>{c}</span>
                        <b>{countFor(c)}</b>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-block">
                <h4>Price range</h4>
                <div className="range-wrap">
                  <div className="range-track" />
                  <div className="range-fill" style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }} />
                  <input
                    type="range"
                    className="range-thumb"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    value={range.min}
                    onChange={(e) =>
                      setRange((r) => ({ ...r, min: Math.min(Number(e.target.value), r.max) }))
                    }
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    className="range-thumb range-thumb-top"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    value={range.max}
                    onChange={(e) =>
                      setRange((r) => ({ ...r, max: Math.max(Number(e.target.value), r.min) }))
                    }
                    aria-label="Maximum price"
                  />
                </div>
                <div className="range-prices">
                  <span>৳ {range.min}</span>
                  <span>৳ {range.max}</span>
                </div>
              </div>

              <div className="sidebar-block">
                <h4>Preferences</h4>
                <label className="check-row">
                  <input type="checkbox" checked={popularOnly} onChange={(e) => setPopularOnly(e.target.checked)} />
                  <span>Popular only</span>
                </label>
              </div>

              <div className="sidebar-block">
                <h4>Tags</h4>
                <div className="tag-list">
                  {allTags.map((t) => (
                    <button
                      key={t}
                      className={tags.includes(t) ? 'active' : ''}
                      onClick={() => toggleTag(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-note">
            <Image src="/images/z-logo.jpg" width={34} height={34} alt="Zilian logo" className="sidebar-note-mark" />
            <p>Full details for every dish — options, servings, tags and prices — are listed right here.</p>
            <a href="https://wa.me/8801322422282?text=Hi%20Zilian!%20I%20want%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer">
              Order via WhatsApp ↗
            </a>
          </div>
        </aside>

        <div className="menu-content">
          <div className="menu-toolbar">
            <div className="search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes..."
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear search">×</button>
              )}
            </div>
            <div className="sort-wrap">
              <label className="sort-label" htmlFor="sort">Sort</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="menu-meta">
            <p>
              {filtered.length < 1
                ? 'No dishes match your filters'
                : `Showing ${filtered.length} ${filtered.length === 1 ? 'dish' : 'dishes'}`}
            </p>
            {activeFilters && (
              <button className="reset-link" onClick={resetFilters}>Clear all filters</button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">🍽</span>
              <h3>Nothing here yet</h3>
              <p>Try removing a filter or two — the perfect dish is on your side of town.</p>
              <button className="button gold" onClick={resetFilters}>Clear filters</button>
            </div>
          ) : (
            <div className="menu-grid">
              {filtered.map((dish) => (
                <article className="dish-card menu-card" key={dish.id}>
                  <div className="dish-image">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width:1024px) 100vw, (max-width:1400px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="dish-image-top">
                      {dish.tags && dish.tags.length > 0 && (
                        <div className="dish-tags">
                          {dish.tags.map((t) => <span className="dish-tag" key={t}>{t}</span>)}
                        </div>
                      )}
                      <button
                        className={`heart ${wishlisted.includes(dish.id) ? 'saved' : ''}`}
                        onClick={() => toggleWish(dish.id)}
                        aria-label={`${wishlisted.includes(dish.id) ? 'Remove' : 'Save'} ${dish.name}`}
                      >{wishlisted.includes(dish.id) ? '♥' : '♡'}</button>
                    </div>
                    <button className="add" onClick={() => openOptions(dish)} aria-label={`Order ${dish.name}`}>+</button>
                  </div>
                  <div className="dish-body">
                    <div className="dish-text">
                      <div className="dish-title-row">
                        <h3>{dish.name}</h3>
                        {dish.popular && <span className="popular-pin">★ Popular</span>}
                      </div>
                      <p>{dish.description}</p>
                      {dish.serves && <span className="dish-serves">● {dish.serves}</span>}
                    </div>
                    <div className="dish-options-line">
                      {dish.options.map((o) => <span key={o}>{o}</span>)}
                    </div>
                    <div className="dish-foot">
                      <strong>৳ {dish.price}</strong>
                      <button className="order-btn" onClick={() => openOptions(dish)}>Order</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Info section: everything on our menu ── */}
      <section className="menu-info shell">
        <div className="menu-info-inner">
          <p className="eyebrow">The full menu</p>
          <h2>The complete story of <em>every dish.</em></h2>
          <p className="menu-info-text">
            This menu carries the full details of everything Zilian serves — nothing is left to guesswork.
          </p>
          <div className="info-grid">
            <div className="info-card">
              <span className="info-num">01</span>
              <h3>True-to-plate descriptions</h3>
              <p>From the handi to the wok, know exactly what lands on your plate before you order.</p>
            </div>
            <div className="info-card">
              <span className="info-num">02</span>
              <h3>Options on every dish</h3>
              <p>Full handi or single plate, dry or gravy, serving size — every choice is laid out in black and gold.</p>
            </div>
            <div className="info-card">
              <span className="info-num">03</span>
              <h3>Honest servings &amp; prices</h3>
              <p>Clear portion sizes and upfront pricing for every item, so sharing and billing are effortless.</p>
            </div>
            <div className="info-card">
              <span className="info-num">04</span>
              <h3>Tags to find your fit</h3>
              <p>Signature, spicy, homestyle, sharing — swipe through tags to land exactly on tonight&apos;s craving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Order CTA ── */}
      <section className="cta-section shell">
        <div className="cta-inner">
          <div className="cta-glow" />
          <Image src="/images/z-logo.jpg" width={64} height={64} alt="Zilian logo" className="cta-mark-img" />
          <p className="eyebrow">Ready when you are</p>
          <h2>Feeling the <em>craving?</em></h2>
          <p className="cta-text">Add to your order, pick up, or get it delivered — hot and fragrant.</p>
          <div className="cta-buttons">
            <a className="button gold" href="tel:+8801322422282">Call to order</a>
            <a className="button outline" href={`https://wa.me/${WHATSAPP}?text=Hi%20Zilian!%20I%20want%20to%20place%20an%20order.`} target="_blank" rel="noopener noreferrer">
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
              <a href={`https://wa.me/${WHATSAPP}?text=Hi%20Zilian!%20I%20want%20to%20place%20an%20order.`} target="_blank" rel="noopener noreferrer">Order via WhatsApp</a>
              <span>·</span>
              <a href="/contact">Book a table</a>
            </div>
          </div>
        </div>
      </footer>

      {showTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">↑</button>
      )}

      {/* ── Options Modal ── */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section className="options-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <p className="eyebrow">Customize your order</p>
            <h2>{selected.name}</h2>
            <p className="modal-desc">{selected.description}</p>
            <div className="option-list">
              {selected.options.map((o) => (
                <label key={o} className={`option ${option === o ? 'selected' : ''}`}>
                  <input type="radio" name="option" checked={option === o} onChange={() => setOption(o)} />
                  {o}<span>৳ {selected.price}</span>
                </label>
              ))}
            </div>
            <button className="button gold full" onClick={addToCart}>Add to order</button>
          </section>
        </div>
      )}

      {/* ── Wishlist Drawer ── */}
      {wishlistOpen && (
        <div className="drawer-backdrop" onClick={() => setWishlistOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setWishlistOpen(false)} aria-label="Close saved dishes">×</button>
            <p className="eyebrow">Saved for later</p>
            <h2>Your<br /><em>wishlist.</em></h2>
            {wishlisted.length === 0 ? (
              <div className="wishlist-empty">
                <span className="wishlist-empty-icon">♥</span>
                <p>No saved dishes yet — tap the ♡ on any dish to keep it here for later.</p>
                <button className="button gold" onClick={() => setWishlistOpen(false)}>Browse the menu</button>
              </div>
            ) : (
              <>
                <div className="wishlist-items">
                  {wishlisted.map((id) => {
                    const d = dishes.find((x) => x.id === id)
                    if (!d) return null
                    return (
                      <article className="wishlist-item" key={d.id}>
                        <div className="wishlist-img">
                          <Image src={d.image} alt={d.name} fill sizes="64px" style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="wishlist-info">
                          <b>{d.name}</b>
                          <span>{d.category}</span>
                          <span className="wishlist-price">৳ {d.price}</span>
                        </div>
                        <div className="wishlist-actions">
                          <button className="wishlist-add" onClick={() => { setWishlistOpen(false); openOptions(d) }} title={`Order ${d.name}`} aria-label={`Order ${d.name}`}>+</button>
                          <button className="wishlist-remove" onClick={() => toggleWish(d.id)} title="Remove from wishlist" aria-label={`Remove ${d.name} from wishlist`}>×</button>
                        </div>
                      </article>
                    )
                  })}
                </div>
                <p className="wishlist-hint">Tap + to add a saved dish straight to your order.</p>
              </>
            )}
          </aside>
        </div>
      )}

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setCartOpen(false)} aria-label="Close">×</button>
            {ordered ? (
              <div className="confirmation">
                <span className="check">✓</span>
                <p className="eyebrow">Order received</p>
                <h2>Thank you,<br /><em>{customer.name.split(' ')[0] || 'guest'}!</em></h2>
                <p>
                  {customer.method === 'Cash on Delivery'
                    ? `We'll deliver to "${customer.address}" and call ${customer.phone} to confirm.`
                    : 'Our team will contact you shortly to complete your payment and confirm delivery.'}
                </p>
                <div className="confirm-summary">
                  {cart.map((line) => (
                    <span key={`${line.dish.id}-${line.option}`}>{line.quantity} × {line.dish.name} — ৳ {line.dish.price * line.quantity}</span>
                  ))}
                  <strong>Total payable on delivery: ৳ {grandTotal}</strong>
                </div>
                <button className="button gold" onClick={() => { setOrdered(false); setCart([]); setCartOpen(false); setCustomer({ name: '', phone: '', address: '', method: 'Cash on Delivery', note: '' }) }}>Back to menu</button>
              </div>
            ) : checkout ? (
              <>
                <p className="eyebrow">Delivery details</p>
                <h2>Where to?<br /><em>We&apos;re coming.</em></h2>
                <div className="checkout-form">
                  <div className="form-group">
                    <label>Full name *</label>
                    <input value={customer.name} onChange={setC('name')} placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Phone number *</label>
                    <input value={customer.phone} onChange={setC('phone')} placeholder="01XXXXXXXXX" inputMode="tel" />
                  </div>
                  <div className="form-group">
                    <label>Delivery address *</label>
                    <textarea value={customer.address} onChange={setC('address')} placeholder="House, road, area, landmark" />
                  </div>
                  <div className="form-group">
                    <label>Payment method</label>
                    <select value={customer.method} onChange={setC('method')}>
                      <option>Cash on Delivery</option>
                      <option>bkash</option>
                      <option>Nagad</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Note for the kitchen (optional)</label>
                    <input value={customer.note} onChange={setC('note')} placeholder="Less spicy, no onion, etc." />
                  </div>
                </div>
                <div className="cart-total">
                  <span>Subtotal</span><strong>৳ {total}</strong>
                </div>
                <div className="cart-total">
                  <span>Delivery fee {deliveryFee === 0 ? <small className="free-tag">Free over ৳800</small> : null}</span>
                  <strong>{deliveryFee === 0 ? 'Free' : `৳ ${deliveryFee}`}</strong>
                </div>
                <div className="cart-total grand">
                  <span>Total</span><strong>৳ {grandTotal}</strong>
                </div>
                <button
                  className="button gold full"
                  disabled={!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()}
                  onClick={placeOrder}
                >Place order</button>
                <button className="back-link" onClick={() => setCheckout(false)}>← Back to order</button>
              </>
            ) : (
              <>
                <p className="eyebrow">Your order</p>
                <h2>Ready when<br /><em>you are.</em></h2>
                {cart.length === 0 ? (
                  <p className="empty">Your order is empty. Add something delicious from the menu.</p>
                ) : (
                  <>
                    <div className="cart-items">
                      {cart.map((line, i) => (
                        <div className="cart-item" key={`${line.dish.id}-${line.option}`}>
                          <div>
                            <span>{line.dish.name}</span>
                            <small>{line.option}</small>
                            <div className="quantity">
                              <button onClick={() => changeQty(i, -1)}>−</button>
                              <b>{line.quantity}</b>
                              <button onClick={() => changeQty(i, 1)}>+</button>
                            </div>
                          </div>
                          <strong>৳ {line.dish.price * line.quantity}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="cart-total">
                      <span>Subtotal</span><strong>৳ {total}</strong>
                    </div>
                    <button className="button gold full" onClick={() => setCheckout(true)}>Continue to checkout</button>
                  </>
                )}
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}