export const metadata = {
  title: 'PJI110-008',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import RaceColorPerRegion from '@/components/raceColorPerRegion'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <RaceColorPerRegion />
    </>
  )
}
