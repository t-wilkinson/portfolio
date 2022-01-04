import React from 'react'
import { Waypoint } from 'react-waypoint'
import { useTrail, animated } from 'react-spring'

import { Heading, ButtonLink, Wrapper, TextLink } from './'
import Icon from './Icon'

export const Header = () => {
  const [scrollOffset, setScrollOffset] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      setScrollOffset(window.scrollY)
    }
    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <Wrapper
      outer={{
        className: `bg-bg transition-all duration-100 ${scrollOffset < 50 ? '' : 'shadow-md'}`,
      }}
    >
      <header className="flex text-light w-full py-4 items-center justify-between">
        <AnimateOnEnter
          className="flex-row items-center space-x-4"
          config={inView => ({
            to: {
              x: !inView ? -48 : 0,
              opacity: !inView ? 0 : 1,
            },
          })}
        >
          <TextLink href="/">
            <div className="flex-row items-center space-x-2">
              <Icon icon="treywilkinson" />
              <h2>Trey Wilkinson</h2>
            </div>
          </TextLink>
        </AnimateOnEnter>
        <AnimateOnEnter
          className="flex-row items-center space-x-4"
          config={inView => ({
            to: {
              x: !inView ? 48 : 0,
              opacity: !inView ? 0 : 1,
            },
          })}
        >
          <TextLink href="/">Home</TextLink>
          <TextLink href="#my-work">My work</TextLink>
          <TextLink href="#about-me">About me</TextLink>
          <ButtonLink href="#hire-me">Hire me</ButtonLink>
        </AnimateOnEnter>
      </header>
    </Wrapper>
  )
}

export const Footer = () => {
  return <div />
}

const animateEnterConfig = (inView: boolean) => ({
  delay: 500,
  config: {
    frequency: 0.15,
  },
  to: {
    y: !inView ? 48 : 0,
    opacity: !inView ? 0 : 1,
  },
})

export const AnimateOnEnter = ({
  config = () => ({}),
  children,
  ...props
}: {
  config?: (inView: boolean) => any
  children: any
  [x: string]: any
}) => {
  const [inView, setInView] = React.useState(false)
  children = React.Children.toArray(children)
  const trail = useTrail(children.length, {
    ...animateEnterConfig(inView),
    ...config(inView),
  } as any)

  return (
    // Waypoint needs a dom object to pass a `ref` to
    <Waypoint
      onEnter={() => setInView(true)}
      // onLeave={() => setInView(false)}
    >
      <div {...props}>
        {trail.map((transition, i) => (
          <animated.div key={i} style={transition}>
            {children[i]}
          </animated.div>
        ))}
      </div>
    </Waypoint>
  )
}

export const A = AnimateOnEnter

export const Section = ({ label, children = null as React.ReactNode, animate = false }) => {
  return (
    <Wrapper>
      <div
        id={label.toLowerCase().replace(' ', '-')}
        className="relative"
        style={{
          top: '-100px',
        }}
      />
      <section className="mb-32">
        <Heading>{label}</Heading>
        {animate ? <AnimateOnEnter>{children}</AnimateOnEnter> : children}
      </section>
    </Wrapper>
  )
}
