import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Wrapper, ButtonLink } from '../components'
import { Animation, Projects, Contact } from '../components/Home'
import { Section, Header, Footer, A } from '../components/Layout'

const Home: NextPage = () => {
  const [activeSection, setActiveSection] = React.useState('home')

  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'))
    const onScroll = () => {
      const buffer = window.innerHeight / 2
      const section = sections.find(section => {
        const rect = section.getBoundingClientRect()
        return rect.top >= 0 && rect.top < buffer && rect.bottom > 0
      })
      if (!section) {
        return
      }
      const id = section.previousElementSibling?.getAttribute('id')
      setActiveSection(id)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-bg w-full text-light relative overflow-x-hidden">
      <Head>
        <title>Trey Wilkinson</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed top-0 w-full z-20">
        <Header activeSection={activeSection} />
      </div>
        <Animation />
      <main className="relative">
        <Hero />
        <MyWork />
        <AboutMe />
        <HireMe />
      </main>
      <Footer />
    </div>
  )
}

const Hero = () => {
  return (
    <Wrapper>
      <div id="home" />
      <section className="h-screen justify-center max-w-screen-sm relative">
        <A className="space-y-8">
          <h1 className="font-bold text-6xl text-light leading-tight">
            I solve your digital problems
          </h1>
          <div />
          <ButtonLink href="#my-work" className="text-2xl font-bold">
            My work
          </ButtonLink>
        </A>
      </section>
    </Wrapper>
  )
}

const MyWork = () => {
  return (
    <Section label="My work" className="bg-bg" animate>
      <div className="my-8 space-y-32">
        <Projects />
      </div>
    </Section>
  )
}

const AboutMe = () => {
  return (
    <Section label="About me">
      <div className="space-y-2">
        <A>
          <p>
            My name is Trey Wilkinson. I'm an independent freelance developer who enjoys helping small
            business navigate the digital age. I excel at creating dynamic, responsive, and
            functional websites that help your business thrive.
          </p>
          <strong className="text-xl mt-8">I can help you with:</strong>
        </A>
        <ul className="list-disc ml-8">
          <A>
            <li>
              Building/improving websites to help you share information about your business, sell
              your products, and more!
            </li>
            <li>
              Creating infrastructure to help you manage your business including managing product
              stock, tracking purchases, etc.
            </li>
            <li>Establishing your digital brand presence.</li>
            <li>Managing domains and hosting.</li>
            <li>
              Reaching as many people as possible by establishing strong SEO, responsive design that
              works for all devices, and accessibility.
            </li>
          </A>
        </ul>
      </div>
    </Section>
  )
}

const HireMe = () => {
  return (
    <Section label="Hire me" animate>
      <Contact />
    </Section>
  )
}

export default Home
