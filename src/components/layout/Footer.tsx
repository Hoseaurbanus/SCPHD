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
    'Healthcare Access',
    'Emergency Relief',
    'Women Empowerment',
    'Clean Water',
    'Climate Action',
  ],
  legal: [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'Financial Transparency',
  ],
}

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
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-500 rounded-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-navy-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-lg">SCPHD</span>
                <span className="block text-[10px] text-gold-400 tracking-widest uppercase">Springfield Center</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              Building peace and advancing humanitarian development across 47+ countries worldwide.
            </p>
            <div className="flex gap-3 pt-2">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-500/50 hover:bg-gold-500/10 transition-all"
                >
                  <span className="text-xs uppercase">{social[0]}</span>
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
                123 Peace Avenue, Springfield, IL 62701
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-0.5">&#9679;</span>
                info@scphd.org
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-0.5">&#9679;</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">&#9679;</span>
                Emergency: +1 (555) 999-0000
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} SCPHD. All rights reserved.</p>
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
