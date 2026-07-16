import Hero from '../components/Hero'
import ImpactStats from '../components/ImpactStats'
import FeaturedPrograms from '../components/FeaturedPrograms'
import GlobalImpactMap from '../components/GlobalImpactMap'
import DonationBanner from '../components/DonationBanner'
import EventsSection from '../components/EventsSection'
import NewsSection from '../components/NewsSection'
import VolunteerSection from '../components/VolunteerSection'
import PartnersSection from '../components/PartnersSection'
import type { Page } from '../App'

interface HomePageProps {
  navigate: (p: Page) => void
}

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <>
      <Hero navigate={navigate} />
      <ImpactStats />
      <FeaturedPrograms navigate={navigate} />
      <GlobalImpactMap />
      <DonationBanner navigate={navigate} />
      <EventsSection />
      <NewsSection />
      <VolunteerSection />
      <PartnersSection />
    </>
  )
}
