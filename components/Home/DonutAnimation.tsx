import React from 'react'
import { useSpring, animated as animatedSpring } from 'react-spring'
import { useTrail, config, animated } from '@react-spring/three'
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const palette = {
  pri: '#5037FF', // '#2F12FF',
  sec: '#473D8F',
  bg: '#1C2124',
  light: '#EEECFF',
  mono: {
    default: '#',
    '700': '#3A364E',
  },
}

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree()
  const controls = React.useRef<any>()
  React.useLayoutEffect(() => {
    camera.position.set(-47.6, -179, -100)
    camera.rotation.set(2.08, -0.23, 2.76)
  }, [])

  useFrame(() => {
    // console.log(state.camera)
    // controls.current.update()
  })

  return null
  // @ts-ignore
  // return <orbitControls ref={controls} args={[camera, domElement]} enablePan={true} />
}

const Donut = ({ size, ...props }) => {
  const ref = React.useRef<any>()
  const position = props.translate.to((translate: number) => [
    0,
    0,
    size ** 3 * 1 + translate * 100,
  ])
  const color = props.color.to({
    range: [0, 1],
    output: [palette.pri, palette.sec],
  })

  return (
    <animated.mesh {...props} ref={ref} position={position}>
      <torusGeometry args={[2 ** size * 3, size ** 2, size * 8, size * 25]} />
      {/* <torusGeometry args={[2 ** size * 3, size ** 2, 6, 7]} /> */}
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
}

export const DonutAnimation = () => {
  const [scroll, setScroll] = React.useState(0)
  const donuts = [1, 2, 3, 4, 5]
  const trail = useTrail(donuts.length, {
    loop: { reverse: true },
    config: config.gentle,
    // { frequency: 1, },
    from: { translate: 0, color: 0 },
    to: { translate: 1, color: 1 },
  })

  const [parallax, api] = useSpring(() => ({
    config: config.molasses,
  }))

  const lightPosition: [number, number, number] = [80, -100, -40]

  React.useEffect(() => {
    const onScroll = () => {
      api.start({
        to: {
          y: window.scrollY / 2.4,
          x: Math.sin(window.scrollY / 150) * -window.scrollY / 8,
        },
        config: config.molasses,
      })
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <animatedSpring.div
      className="absolute"
      style={{
        top: '100px',
        right: '100px',
        height: '32rem',
        width: '32rem',
        // transform: 'translate3d(0, 250px, 0)',
        ...parallax
      }}
    >
      <Canvas>
        <CameraControls />
        <ambientLight position={lightPosition} />
        <pointLight position={lightPosition} />
        <group rotation={[0, 0, 0]} position={[30, 20, -130]} scale={0.9}>
          {trail.map((props, i) => (
            <Donut key={i} size={i + 1} {...props} />
          ))}
        </group>
      </Canvas>
    </animatedSpring.div>
  )
}
