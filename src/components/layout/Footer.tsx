import { Link } from 'react-router-dom'

const footerLinks = {
  organization: [
    { label: 'About Us', path: '/about' },
    { label: 'Programs', path: '/programs' },
    { label: 'News & Updates', path: '/news' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ],
  programs: [
    'Peace Education',
    'Interfaith Dialogue',
    'Preventing Violent Extremism',
    'Community Resilience',
    'Humanitarian Development',
  ],
  legal: [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'Financial Transparency',
  ],
}

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/scphd.ng/', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'X', href: 'https://x.com/Springfield_NG', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'Instagram', href: 'https://www.instagram.com/springfield_ng', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
]

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img src="/images/favicon/Logo.jpg" alt="Springfield Centre for Peace and Humanitarian Development" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              Building peace and advancing humanitarian development worldwide.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-500/50 hover:bg-gold-500/10 transition-all"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">Organization</h4>
            <ul className="space-y-2.5">
              {footerLinks.organization.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">Programs</h4>
            <ul className="space-y-2.5">
              {footerLinks.programs.map((program) => (
                <li key={program}>
                  <span className="text-sm text-white/50">{program}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-0.5">&#9679;</span>
                Suite 308, 3rd Floor, Anbeez Plaza, Abuja, Nigeria, 900285
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-0.5">&#9679;</span>
                <a href="tel:+2348080472194" className="hover:text-white transition-colors">0808 047 2194</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-0.5">&#9679;</span>
                <a href="mailto:scphd.ng@gmail.com" className="hover:text-white transition-colors">scphd.ng@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-0.5">&#9679;</span>
                <a href="https://springfield.org.ng" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">springfield.org.ng</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Springfield Centre for Peace and Humanitarian Development. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <span key={link} className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
