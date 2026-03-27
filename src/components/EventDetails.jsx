import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data/eventData.json'

function EventoCard({ num, title, main, details }) {
  return (
    <div className="evento-card">
      <div className="card-num">{num}</div>
      <div className="card-title">{title}</div>
      <div className="card-main">
        {main.split('\n').map((line, i) => (
          <span key={i}>{line}{i < main.split('\n').length - 1 && <br />}</span>
        ))}
      </div>
      <div className="card-sub">
        {details.map((d, i) => (
          <span key={i}>{d}{i < details.length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  )
}

export default function EventDetails() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="evento">
      <div className="section-label">Data &amp; Local</div>
      <motion.div
        ref={ref}
        className="evento-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <EventoCard
          num={data.ceremony.num}
          title={data.ceremony.title}
          main={data.ceremony.main}
          details={data.ceremony.details}
        />
        <EventoCard
          num={data.venue.num}
          title={data.venue.title}
          main={data.venue.main}
          details={data.venue.details}
        />
      </motion.div>
    </section>
  )
}
