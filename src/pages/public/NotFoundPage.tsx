import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="bg-cream-100 dark:bg-navy-950 min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-gold-500 font-[family-name:var(--font-display)] font-bold mb-4" style={{ fontSize: 'clamp(5rem, 15vw, 10rem)' }}>
            404
          </div>
          <h1 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-500 dark:text-white/45 text-base mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="primary" size="md">Return Home</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md">Contact Us</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
