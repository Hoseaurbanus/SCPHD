import Hero from '@/components/Hero'
import ImpactStats from '@/components/ImpactStats'
import FeaturedPrograms from '@/components/FeaturedPrograms'
import GlobalImpactMap from '@/components/GlobalImpactMap'
import DonationBanner from '@/components/DonationBanner'
import EventsSection from '@/components/EventsSection'
import NewsSection from '@/components/NewsSection'
import VolunteerSection from '@/components/VolunteerSection'
import PartnersSection from '@/components/PartnersSection'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  const navigateTo = (p: string) => navigate(`/${p}`)

  return (
    <>
      <Helmet>
        <title>SCPHD — Peace, Justice & Human Dignity | Humanitarian NGO</title>
        <meta name="description" content="SCPHD delivers measurable humanitarian impact across 47 countries through peace education, healthcare, emergency relief, and community development programs." />
        <meta property="og:title" content="SCPHD — Peace, Justice & Human Dignity" />
        <meta property="og:description" content="Delivering measurable humanitarian impact across 47 countries through peace education, healthcare, and community development." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://scphd.org" />
      </Helmet>
      <Hero navigate={navigateTo as (p: any) => void} />
      <ImpactStats />
      <FeaturedPrograms navigate={navigateTo as (p: any) => void} />
      <GlobalImpactMap />
      <DonationBanner navigate={navigateTo as (p: any) => void} />
      <EventsSection />
      <NewsSection />
      <VolunteerSection />
      <PartnersSection />
    </>
  )
}
