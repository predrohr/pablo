import { motion } from 'framer-motion'
import data from '../data/eventData.json'

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {data.nav.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </motion.nav>
  )
}
