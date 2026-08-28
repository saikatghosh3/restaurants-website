'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const links = [
  { key: 'home', href: '/', label: 'Home' },
  { key: 'menu', href: '/menu', label: 'Menu' },
  { key: 'about', href: '/about', label: 'Our Story' },
  { key: 'contact', href: '/contact', label: 'Contact' },
]

export default function MobileMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        className={`hamburger ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="mobile-menu-backdrop" onClick={close}>
            <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-menu-head">
                <div className="mobile-menu-brand">
                  <Image src="/images/z-logo.jpg" width={36} height={36} alt="Zilian logo" />
                  <span>ZILIAN</span>
                </div>
                <button className="mobile-menu-close" onClick={close} aria-label="Close menu">×</button>
              </div>

              <ul className="mobile-menu-links">
                {links.map((l, i) => (
                  <li key={l.key} className={l.key === active ? 'active' : ''}>
                    <a href={l.href} onClick={close}>
                      <span className="mobile-menu-link-label">
                        <small>0{i + 1}</small>
                        {l.label}
                      </span>
                      <span className="mobile-menu-link-arrow">↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mobile-menu-foot">
                <a className="button gold" href="/menu" onClick={close}>
                  Order now
                </a>
                <p>Chandrima Model Town, Dhaka<br />12:00 PM – 11:00 PM</p>
              </div>
            </nav>
          </div>,
          document.body
        )}
    </>
  )
}