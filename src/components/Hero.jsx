import { motion } from 'framer-motion'
import data from '../data/eventData.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: 'easeOut' },
})

export default function Hero() {
  const { wedding } = data

  return (
    <section id="hero">
      <div className="hero-line h top" />
      <div className="hero-line h bottom" />
      <div className="hero-line v left" />
      <div className="hero-line v right" />

      <motion.p className="hero-eyebrow" {...fadeUp(0.2)}>
        {wedding.eyebrow}
      </motion.p>

      <motion.h1 className="hero-names" {...fadeUp(0.5)}>
        <em>{wedding.groom}</em>
        <span className="hero-ampersand">&</span>
        {wedding.bride}
      </motion.h1>

      <motion.p className="hero-date" {...fadeUp(0.8)}>
        {wedding.displayDate}&nbsp;—&nbsp;{wedding.city}
      </motion.p>

      <motion.p className="hero-paragraph" {...fadeUp(1.0)}>
        {wedding.heroParagraph}
      </motion.p>

      <motion.div className="hero-scroll" {...fadeUp(1.2)}>
        <span>Rolar</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  )
}
