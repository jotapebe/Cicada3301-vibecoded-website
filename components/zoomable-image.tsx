"use client"

import { useEffect, useState } from "react"

type ZoomableImageProps = {
  src: string
  alt: string
  className?: string
}

export default function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [isOpen])

  const openViewer = () => {
    setZoom(1)
    setIsOpen(true)
  }

  return (
    <>
      <img
        className={className}
        src={src}
        alt={alt}
        role="button"
        tabIndex={0}
        aria-label={`Ampliar imagen: ${alt}`}
        onClick={openViewer}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openViewer()
          }
        }}
      />
      {isOpen && (
        <div className="image-viewer" role="dialog" aria-modal="true" aria-label={`Imagen ampliada: ${alt}`} onClick={() => setIsOpen(false)}>
          <div className="image-viewer-toolbar" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.25))} aria-label="Alejar imagen">−</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((value) => Math.min(4, value + 0.25))} aria-label="Acercar imagen">+</button>
            <button type="button" onClick={() => setZoom(1)} aria-label="Restablecer zoom">1:1</button>
            <button type="button" className="image-viewer-close" onClick={() => setIsOpen(false)} aria-label="Cerrar imagen">×</button>
          </div>
          <div className="image-viewer-viewport" onClick={(event) => event.stopPropagation()} onWheel={(event) => {
            event.preventDefault()
            setZoom((value) => Math.min(4, Math.max(1, value + (event.deltaY < 0 ? 0.2 : -0.2))))
          }}>
            <img className="image-viewer-full" src={src} alt={alt} style={{ transform: `scale(${zoom})` }} />
          </div>
          <p className="image-viewer-hint">Usa la rueda o los controles para cambiar el zoom · Esc para cerrar</p>
        </div>
      )}
    </>
  )
}
