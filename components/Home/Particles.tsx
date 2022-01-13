import React from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NUMBER = 1000
const PI2 = Math.PI * 2

export default () => {
  const ref = React.useRef(null)
  const geometry = new THREE.Geometry()
  const material = new THREE.SpriteCanvasMaterial({
     color: 0xffffff,
    program: function ( context ) {
      context.beginPath();
      context.arc( 0, 0, 0.4, 0, PI2, true );
      context.fill();
    }})

  const { vec, transform, positions } = React.useMemo(() => {
    const vec = new THREE.Vector3()
    const transform = new THREE.Matrix4()
    const size = Math.sqrt(NUMBER)
    const positions = [...Array(NUMBER)].map((_, i) => {
      const position = new THREE.Vector3()
      // Place in a grid
      position.x = (i % size) - (size/2)
      position.y = Math.floor(i / size) - (size / 2)

      // Offset every other column (hexagonal pattern)
      // position.y += (i % 2) * 0.5

      return position
    })
    return { vec, transform, positions }
  }, [])

  useFrame(({ clock }) => {
    const scale = 1 + Math.sin(clock.elapsedTime) * 0.3
    for (let i = 0; i < NUMBER; ++i) {
      // vec.copy(positions[i]).multiplyScalar(scale)
      vec.copy(positions[i])
      transform.setPosition(vec)
      vec.setComponent(1, scale)
      ref.current.setMatrixAt(i, transform)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, NUMBER]}>
      <circleBufferGeometry args={[0.15, 10]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}
