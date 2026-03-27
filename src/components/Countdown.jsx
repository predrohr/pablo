import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data/eventData.json'

function pad(n) {
  return String(n).padStart(2, '0')
}

function calcTime() {
  const wedding = new Date(data.wedding.date)
  const now = new Date()
  const diff = wedding - now
  if (diff <= 0) return { d: '00', h: '00', m: '00', s: '00', over: true }
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s), over: false }
}

const units = [
  { key: 'd', label: 'Dias' },
  { key: 'h', label: 'Horas' },
  { key: 'm', label: 'Min' },
  { key: 's', label: 'Seg' },
]

export default function Countdown() {
  const [time, setTime] = useState(calcTime)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="contagem">
      <motion.p
        className="countdown-label"
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {time.over ? 'Hoje é o grande dia!' : 'Faltam'}
      </motion.p>

      <div className="countdown-grid">
        {units.map(({ key, label }, i) => (
          <motion.div
            key={key}
            className="count-item"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
          >
            <div className="count-num">{time[key]}</div>
            <div className="count-unit">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
