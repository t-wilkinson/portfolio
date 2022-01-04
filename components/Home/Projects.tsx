import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { A } from '../Layout'

const PortfolioVideo = ({ src }) => {
  return <video key={src} src={'/assets/sites/' + src} autoPlay muted loop className="video" />
}

// TODO: stagger `li` and title/subtitle animations?
const Project = ({
  direction,
  title,
  subtitle,
  children,
  mainimg,
  views,
  alt,
  href,
  themeColor,
}) => {
  const [hover, setHover] = React.useState(false)
  return (
    <article className={`project ${direction} ${hover ? 'hover' : ''}`}>
      <A
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`
          project__img
          justify-self-stretch self-stretch relative
          theme overflow-hidden
          transition duration-300 ease-in-out
        `}
      >
        <Link href={href}>
          <a target="_blank" className="absolute inset-0">
            {/* <Image className="" src={mainimg} alt={alt} layout="fill" objectFit="cover" /> */}
            <img className="" src={mainimg} alt={alt} />
          </a>
        </Link>
      </A>
      <div
        style={{ gridArea: 'title' }}
        className={`relative duration-300 ease-in-out project__title
        `}
      >
        <A>
          <span className="font-bold text-3xl">{title}</span>
          <span>{subtitle}</span>
        </A>
      </div>
      <A
        className={`project__content relative bg-sec p-4 theme shadow-lg shadow-bg/50 transition-all duration-300 ease-in-out z-10
            `}
        style={{
          gridArea: 'content',
        }}
      >
        {children}
      </A>
    </article>
  )
}

const projects = [
  {
    direction: 'right',
    views: [
      <img key={1} alt="Home page" src="/assets/sites/infinite-closet/home.png" />,
      <img key={2} alt="Clothing section" src="/assets/sites/infinite-closet/clothing.png" />,
    ],
    alt: 'Infinite Closet fashion rental',
    mainimg: '/assets/sites/infinite-closet/intro.png',
    title: 'Infinite Closet',
    subtitle: 'Fashion rental',
    href: 'https://infinitecloset.co.uk',
    themeColor: '#16ff03',
    children: (
      <ul className="list-disc ml-4">
        <A>
          <li>
            Platform which allows individuals to wear nice clothes while being sustainable and
            cost-friendly.
          </li>
          <li>
            The site integrates with a sustainable delivery and cleaning service to automate many
            actions required in the order lifecycle.
          </li>
          <li>Business owners can easily add/modify products in the store.</li>
          <li>Fully responsive.</li>
        </A>
      </ul>
    ),
  },

  {
    direction: 'left',
    views: [
      <img key="1" alt="Home page" src="/assets/sites/landdecorinc/home.png" />,
      <img key="2" alt="Services" src="/assets/sites/landdecorinc/services.png" />,
    ],
    alt: 'Land Decor Inc; Outdoor decor and equipment distributer',
    mainimg: '/assets/sites/landdecorinc/home.png',
    title: 'Land Decor Inc',
    subtitle: 'Outdoor decor and equipment distributer',
    href: 'https://landdecorinc.com',
    themeColor: '#16ff03',
    children: (
      <ul className="list-disc ml-4">
        <A>
          <li>Request services through the website.</li>
          <li>Users can order equipment directly from the website.</li>
          <li>Owners can easily add/remove products.</li>
          <li>I handled domain and server hosting.</li>
          <li>Made in Webflow.</li>
          <li>Fully responsive.</li>
        </A>
      </ul>
    ),
  },

  {
    direction: 'right',
    views: [
      <img key={0} alt="Klean studios home page" src="/assets/sites/max.k-studio/home.png" />,
      <PortfolioVideo key={1} src="max.k-studio/home.mp4" />,
      <PortfolioVideo key={2} src="max.k-studio/portfolio.mp4" />,
    ],
    alt: 'Klean Studios website',
    mainimg: '/assets/sites/max.k-studio/klean-studios.png',
    title: 'Klean Studios',
    subtitle: 'Studio recording and artist promotion',
    href: 'https://kleanstudio.com',
    themeColor: '#000',
    children: (
      <ul className="list-disc ml-4">
        <A>
          <li>Provides a user dashboard to simplify life for the business owner.</li>
          <li>Clients can schedule recording times and get expected cost for session.</li>
          <li>After sessions, clients can pay online.</li>
          <li>
            Admin can easily view scheduled sessions, update/change existing ones and change service
            rates.
          </li>
          <li>Fully responsive.</li>
        </A>
      </ul>
    ),
  },
]

export const Projects = () => {
  return (
    <>
      {projects.map(project => (
        <Project key={project.title} {...project} />
      ))}
    </>
  )
}
