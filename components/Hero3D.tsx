'use client'

import { useRef, type MouseEvent } from 'react'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
}

export default function Hero3D({
  src,
  alt,
  fill = false,
  sizes = '100vw',
  priority = false,
  className = '',
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const root = rootRef.current
    const inner = innerRef.current
    if (!root || !inner) return
    const r = root.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * 14
    const ry = (px - 0.5) * 14
    inner.classList.add('tilting')
    inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
  }

  const onLeave = () => {
    const inner = innerRef.current
    if (!inner) return
    inner.classList.remove('tilting')
    inner.style.transform = ''
  }

  return (
    <div
      ref={rootRef}
      className={`hm3d ${fill ? 'fill' : ''} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="hm3d-glow" />
      <span className="hm3d-frame" />
      <div ref={innerRef} className="hm3d-inner">
        <div className="hm3d-img">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            style={{ objectFit: 'cover' }}
          />
          <span className="hm3d-shine" />
        </div>
      </div>
      <span className="hm3d-shadow" />
    </div>
  )
}