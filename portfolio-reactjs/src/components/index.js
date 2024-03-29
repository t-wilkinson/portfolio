import React from 'react'
import gsap from 'gsap'
import styled from 'styled-components'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const theme = {
  gray: '#1c2124',
  white: '#5b6165',
  pri: '#473d8f',
  pri1: '#dad8fa',
  pri3: '#8479d5',
  pri9: '#170f3e',
  sec: '#a9eaab',
}

export function ExternalLink({ ...props }) {
  return (
    <svg
      viewBox="0 0 283.922 283.922"
      space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="white" fill="white" {...props}>
        <path
          d="M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374
        c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13
        c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5
        C283.922,7.851,276.071,0,266.422,0z"
        />
        <path
          d="M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137
        c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"
        />
      </g>
    </svg>
  )
}

export const SLoading = styled(Loading)`
  position: absolute;
  display: grid;
  place-items: center;
  transform: scale(2.5);
  filter: blur(3px);

  #Atom {
    display: none;
    .atom {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 300px;
      perspective: 1000;
      margin-left: -170px;
      margin-top: -146px;
      transform-style: preserve-3d;
    }

    .nucleus {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -10px 0 0 -10px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #a9eaab;
    }

    .orbit {
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: 300px;
      border-radius: 300px;
      border: 5px solid #473d8f;
      transform-style: preserve-3d;
      transform: rotateX(80deg) rotateY(20deg);
    }

    .orbit:nth-child(2) {
      transform: rotateX(80deg) rotateY(70deg);
    }
    .orbit:nth-child(3) {
      transform: rotateX(80deg) rotateY(-20deg);
    }
    .orbit:nth-child(4) {
      transform: rotateX(80deg) rotateY(-50deg);
    }

    .path {
      width: 300px;
      height: 300px;
      position: relative;
      transform-style: preserve-3d;
    }

    .electron {
      position: absolute;
      top: -5px;
      left: 50%;
      margin-left: -5px;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background: #888;
    }
  }
`

function Loading({ className }) {
  React.useEffect(() => {
    const Atom = document.querySelector('#Atom')
    const dur = 2,
      del = 0.5

    const animation = {
      repeat: -1,
      repeatDelay: 1,
      duration: 6,
      repeatRefresh: true,
      ease: 'sine.inOut',
    }

    gsap.to(Atom, { display: 'block', scale: '0', duration: 0 })

    function moveAtom() {
      return gsap
        .timeline()
        .to(
          Atom,
          {
            x: 'random(-100, 100)',
            y: 'random(-100, 100)',
            scale: 'random(0.5, 1)',
            ...animation,
          },
          0
        )
        .to(
          Atom.querySelectorAll('.orbit'),
          {
            rotateX: 'random(-90, 90)',
            rotateY: 'random(-90, 90)',
            ...animation,
          },
          0
        )
    }

    function moveElectrons() {
      return gsap
        .timeline()
        .fromTo(
          '.electron',
          { rotationX: 90 },
          {
            rotationZ: -360,
            rotationX: 90,
            ease: 'none',
            duration: dur,
            stagger: { each: -del, repeat: -1 },
          },
          0
        )

        .to(
          '.path',
          {
            rotationZ: 360,
            ease: 'none',
            duration: dur,
            stagger: { each: -del, repeat: -1 },
          },
          0
        )
    }

    const tl = gsap.timeline()

    // Pause when off screen
    let observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) tl.play()
        else tl.pause()
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    )
    observer.observe(document.querySelector('#intro'))

    tl.add(moveElectrons(), '0')
    tl.progress(0.999)
    tl.add(moveAtom(), '0')
  }, [])

  return (
    <article className={className}>
      <div id="Atom">
        <div className="atom">
          <div className="orbit">
            <div className="path">
              <div className="electron"></div>
            </div>
          </div>
          <div className="orbit">
            <div className="path">
              <div className="electron"></div>
            </div>
          </div>
          <div className="orbit">
            <div className="path">
              <div className="electron"></div>
            </div>
          </div>
          <div className="orbit">
            <div className="path">
              <div className="electron"></div>
            </div>
          </div>
          <div className="nucleus"></div>
        </div>
      </div>
    </article>
  )
}

export const C = {
  github: (
    <svg viewBox="0 0 512 512">
      {' '}
      <g>
        <path d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872 c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464 c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496 c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368 c-56.832-6.496-116.608-28.544-116.608-127.008c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68 c0,0,21.504-6.912,70.4,26.336c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672 c48.864-33.248,70.336-26.336,70.336-26.336c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992 c0,98.72-59.84,120.448-116.864,126.816c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496 c0,6.88,4.608,14.88,17.6,12.352C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z" />{' '}
      </g>{' '}
    </svg>
  ),
  email: (
    <svg viewBox="0 0 512 512">
      {' '}
      <path d="M458.667,85.333H53.333C23.936,85.333,0,109.269,0,138.667v234.667c0,29.397,23.936,53.333,53.333,53.333h405.333 c29.397,0,53.333-23.936,53.333-53.333V138.667C512,109.269,488.064,85.333,458.667,85.333z M490.667,373.333 c0,17.643-14.357,32-32,32H53.333c-17.643,0-32-14.357-32-32V138.667c0-17.643,14.357-32,32-32h405.333c17.643,0,32,14.357,32,32 V373.333z" />{' '}
      <path d="M467.456,132.651c-3.307-4.864-9.941-6.08-14.827-2.773L277.675,249.579c-13.184,9.003-30.208,9.003-43.371,0 L59.349,129.877c-4.885-3.349-11.52-2.091-14.827,2.773c-3.307,4.864-2.069,11.499,2.795,14.827l174.955,119.701 c10.24,7.019,21.995,10.517,33.728,10.517s23.488-3.499,33.728-10.517l174.955-119.701 C469.547,144.149,470.784,137.515,467.456,132.651z" />{' '}
      <path d="M189.525,259.819c-3.776-4.501-10.517-5.12-15.04-1.365l-128,106.667c-4.523,3.776-5.141,10.517-1.365,15.04 c2.112,2.539,5.141,3.84,8.213,3.84c2.411,0,4.843-0.811,6.827-2.475l128-106.667 C192.683,271.083,193.301,264.341,189.525,259.819z" />{' '}
      <path d="M465.515,365.12l-128-106.667c-4.544-3.755-11.264-3.136-15.04,1.365c-3.776,4.544-3.157,11.264,1.365,15.04l128,106.667 c2.005,1.664,4.416,2.475,6.827,2.475c3.051,0,6.08-1.301,8.213-3.84C470.656,375.616,470.037,368.896,465.515,365.12z" />{' '}
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 382 382">
      <path
        d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
        C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
        H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
        c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
        s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
        c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
        c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
        c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
        L341.91,330.654L341.91,330.654z"
      />
    </svg>
  ), // style="fill:#0077B7"
  phone: (
    <svg viewBox="0 0 513.64 513.64">
      <path
        d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72
        c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68
        c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44
        l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z"
      />
    </svg>
  ),

  // close: <svg viewBox="0 0 386.667 386.667"> <path d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z"/> </svg>,
  close: (
    <svg
      viewBox="38.9 67.4 112.5 112.5"
      style={{ stroke: '#000', strokeWidth: '18', strokeLinecap: 'round' }}
    >
      <path d="M 142.96638,171.4546 47.345578,75.833802" />
      <path d="M 47.345578,171.4546 142.96638,75.833802" />
    </svg>
  ),
  arrow: (
    <svg
      viewBox="-19.4 55.5 84 136"
      style={{ stroke: '#fff', strokeWidth: '18', strokeLinecap: 'round' }}
    >
      <path d="M -5.9171716,178.13248 48.679164,123.53614" />
      <path d="M 48.679164,123.53614 -5.9171716,68.9398" />
    </svg>
  ),

  TreyWilkinson: (
    <svg viewBox="0 0 602.80329 602.80024">
      <g transform="translate(125.59092,-61.422999)">
        <path
          // @ts-ignore
          // prettier-ignore
          style={{ color: '#000000', fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'normal', fontStretch: 'normal', fontSize: 'medium', lineHeight: 'normal', fontFamily: 'sansSerif', fontVariantLigatures: 'normal', fontVariantPosition: 'normal', fontVariantCaps: 'normal', fontVariantNumeric: 'normal', fontVariantAlternates: 'normal', fontVariantEastAsian: 'normal', fontFeatureSettings: 'normal', fontVariationSettings: 'normal', textIndent: '0', textAlign: 'start', textDecoration: 'none', textDecorationLine: 'none', textDecorationStyle: 'solid', textDecorationColor: '#000000', letterSpacing: 'normal', wordSpacing: 'normal', textTransform: 'none', writingMode: 'lrTb', direction: 'ltr', textOrientation: 'mixed', dominantBaseline: 'auto', baselineShift: 'baseline', textAnchor: 'start', whiteSpace: 'normal', shapePadding: '0', shapeMargin: '0', inlineSize: '0', clipRule: 'nonzero', display: 'inline', overflow: 'visible', visibility: 'visible', isolation: 'auto', mixBlendMode: 'normal', colorInterpolation: 'sRGB', colorInterpolationFilters: 'linearRGB', solidColor: '#000000', solidOpacity: '1', vectorEffect: 'none', fill: '#6958d7', fillOpacity: '1', fillRule: 'nonzero', stroke: 'none', strokeWidth: '51.6786', strokeLinecap: 'square', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokeDashoffset: '0', strokeOpacity: '1', paintOrder: 'stroke fill markers', colorRendering: 'auto', imageRendering: 'auto', shapeRendering: 'auto', textRendering: 'auto', enableBackground: 'accumulate', stopColor: '#000000', }}
          d="m -125.59092,452.20628 59.513675,59.51367 C -39.531839,486.24452 -29.534473,474.1089 -2.9899005,448.6326 L -3.2771369,570.54208 H 84.388885 l 0.287236,-208.24737 c 16.025679,-16.02769 43.894139,-43.8946 59.923029,-59.9191 0.0366,87.94532 0.0757,180.22116 0.11328,268.16647 42.28844,-34.64254 84.57662,-69.2854 126.86523,-103.92773 29.64788,30.62229 74.27938,73.3059 103.92772,103.92773 33.90235,-35.03776 67.80469,-70.07552 101.70704,-105.11328 l -61.40625,-61.4043 c -14.38374,14.37083 -28.7653,28.74383 -43.15039,43.11328 -27.71509,-29.91368 -70.41629,-71.88645 -98.13281,-101.79882 -14.08513,11.62193 -28.17151,23.24235 -42.25586,34.86523 0,-52.26693 1e-5,-108.86438 0,-161.13131 -21.32291,-21.32292 -42.64583,-42.64583 -63.96874,-63.96875 -99.532557,99.5332 -194.356735,197.56895 -293.88929,297.10215 z"
        />
      </g>
    </svg>
  ),
}
