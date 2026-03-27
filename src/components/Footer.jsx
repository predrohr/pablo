import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data/eventData.json'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { wedding } = data

  return (
    <footer ref={ref}>
      <motion.div
        className="footer-names"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {wedding.groom} &amp; {wedding.bride}
      </motion.div>
      <motion.div
        className="footer-sub"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {wedding.displayDateShort}
      </motion.div>
    </footer>
  )
}
