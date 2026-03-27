import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import data from '../data/eventData.json'

export default function Gallery() {
  const { gallery } = data
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState(null) // index of open photo

  const photos = gallery.photos

  // Mosaic layout: [0]=tall left, [1]=top-mid, [2]=top-right, [3]=bot-mid, [4]=bot-right
  const frameClass = ['frame-1', 'frame-2', 'frame-3', 'frame-4', 'frame-5']

  return (
    <section id="galeria" ref={ref}>
      <div className="gallery-inner">
        <div className="section-label">Galeria</div>

        <div className="gallery-text">
          <h2 className="gallery-title">{gallery.title}</h2>
          <p className="gallery-subtitle">{gallery.subtitle}</p>
        </div>

        <div className="gallery-mosaic">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`gallery-frame ${frameClass[i]}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: 'easeOut' }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-img-overlay">
                <span className="gallery-img-zoom">✦</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href={gallery.albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gallery-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Ver todas as fotos</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              key={lightbox}
              src={photos[lightbox].url}
              alt={photos[lightbox].alt}
              className="lightbox-img"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            />

            {/* prev / next */}
            {lightbox > 0 && (
              <button className="lightbox-btn lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1) }}>‹</button>
            )}
            {lightbox < photos.length - 1 && (
              <button className="lightbox-btn lightbox-next" onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1) }}>›</button>
            )}

            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
