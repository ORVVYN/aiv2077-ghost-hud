import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

/**
 * HeroSilhouette - Placeholder 3D character mesh
 * High-poly humanoid silhouette with rim-lighting
 */
function HeroSilhouette({ color, rimColor, glowColor }) {
  const meshRef = useRef()
  const outlineRef = useRef()

  // Idle breathing animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Gentle breathing motion
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.05
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.02
    }

    // Pulsing outline
    if (outlineRef.current) {
      outlineRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.01)
    }
  })

  // Create humanoid silhouette geometry
  const createHumanoidGeometry = () => {
    const group = new THREE.Group()

    // Torso (main body)
    const torsoGeometry = new THREE.CapsuleGeometry(0.4, 0.8, 8, 16)
    const torso = new THREE.Mesh(torsoGeometry)
    torso.position.y = 0.5
    group.add(torso)

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16)
    const head = new THREE.Mesh(headGeometry)
    head.position.y = 1.3
    group.add(head)

    // Shoulders
    const shoulderGeometry = new THREE.BoxGeometry(0.9, 0.2, 0.3)
    const shoulders = new THREE.Mesh(shoulderGeometry)
    shoulders.position.y = 1.0
    group.add(shoulders)

    // Arms (left)
    const armGeometry = new THREE.CapsuleGeometry(0.12, 0.6, 6, 12)
    const leftArm = new THREE.Mesh(armGeometry)
    leftArm.position.set(-0.5, 0.6, 0)
    leftArm.rotation.z = 0.3
    group.add(leftArm)

    // Arms (right)
    const rightArm = new THREE.Mesh(armGeometry)
    rightArm.position.set(0.5, 0.6, 0)
    rightArm.rotation.z = -0.3
    group.add(rightArm)

    // Legs (left)
    const legGeometry = new THREE.CapsuleGeometry(0.15, 0.7, 6, 12)
    const leftLeg = new THREE.Mesh(legGeometry)
    leftLeg.position.set(-0.2, -0.3, 0)
    group.add(leftLeg)

    // Legs (right)
    const rightLeg = new THREE.Mesh(legGeometry)
    rightLeg.position.set(0.2, -0.3, 0)
    group.add(rightLeg)

    return group
  }

  return (
    <group ref={meshRef}>
      {/* Main silhouette - Faded cyan hologram (atmospheric) */}
      <primitive object={createHumanoidGeometry()}>
        <meshStandardMaterial
          color="#00e5ff"
          metalness={0.7}
          roughness={0.3}
          emissive="#00e5ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.25}
        />
      </primitive>

      {/* Cyan-Violet Gradient Rim Light - Atmospheric glow */}
      <group ref={outlineRef}>
        <primitive object={createHumanoidGeometry()}>
          <meshBasicMaterial
            color="#8855f7"
            transparent
            opacity={0.5}
            side={THREE.BackSide}
          />
        </primitive>
      </group>
    </group>
  )
}

/**
 * DigitalDebris - Floating 3D particles (tiny cubes/pixels) orbiting hero
 */
function DigitalDebris() {
  const debrisRef = useRef()
  const particleCount = 50

  // Create particles
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = 1.5 + Math.random() * 0.5
    const height = (Math.random() - 0.5) * 2.5

    return {
      position: [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      ],
      scale: 0.02 + Math.random() * 0.03,
      speed: 0.2 + Math.random() * 0.3
    }
  })

  useFrame((state) => {
    if (debrisRef.current) {
      debrisRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={debrisRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <boxGeometry args={[particle.scale, particle.scale, particle.scale]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * HolographicPlatform - Glowing ring under hero
 */
function HolographicPlatform({ color }) {
  const ringRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3
    }
  })

  return (
    <group position={[0, -0.7, 0]}>
      {/* Outer ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Holographic grid disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>
    </group>
  )
}

/**
 * Scene - 3D environment setup
 */
function Scene({ hero }) {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1, 4]} fov={50} />

      {/* Lights */}
      <ambientLight intensity={0.4} />

      {/* Key light (front) */}
      <spotLight
        position={[2, 3, 3]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />

      {/* Rim light (back-left) - Creates the blue rim glow */}
      <spotLight
        position={[-3, 2, -2]}
        angle={0.4}
        penumbra={0.8}
        intensity={2.0}
        color={hero.appearance.rimLightColor}
      />

      {/* Rim light (back-right) */}
      <spotLight
        position={[3, 2, -2]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color={hero.appearance.rimLightColor}
      />

      {/* Fill light (bottom) */}
      <pointLight
        position={[0, -1, 2]}
        intensity={0.8}
        color={hero.appearance.primaryColor}
      />

      {/* Holographic platform under hero */}
      <HolographicPlatform color={hero.appearance.glowColor} />

      {/* Digital Debris - Floating voxel particles */}
      <DigitalDebris />

      {/* Hero character */}
      <HeroSilhouette
        color={hero.appearance.primaryColor}
        rimColor={hero.appearance.rimLightColor}
        glowColor={hero.appearance.glowColor}
      />

      {/* Orbit controls (touch-friendly) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Atmospheric fog effect - Holographic depth */}
      <fog attach="fog" args={['#050505', 5, 15]} />
    </>
  )
}

/**
 * MovingScanlines - Internal scanlines that move UP the hero body
 */
function MovingScanlines() {
  const scanlineRef = useRef()

  useFrame((state) => {
    if (scanlineRef.current) {
      // Move scanlines upward continuously
      const time = state.clock.getElapsedTime()
      scanlineRef.current.style.transform = `translateY(${-(time * 20) % 100}%)`
    }
  })

  return null // CSS-based, so no JSX return needed for Three.js
}

/**
 * HeroModel3D Component
 * Renders the 3D hero in a volumetric chamber
 */
const HeroModel3D = ({ hero }) => {
  const scanlineRef = useRef()

  useEffect(() => {
    // Animate scanlines moving upward
    let animationId
    let position = 0

    const animate = () => {
      position = (position + 0.5) % 100
      if (scanlineRef.current) {
        scanlineRef.current.style.transform = `translateY(-${position}%)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 z-10">
      {/* SVG Filter - Digital Grain Noise */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="digitalGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.08 0"
            />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* Canvas with transparent background */}
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Scene hero={hero} />
      </Canvas>

      {/* Digital Grain Filter Overlay - Over character only */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          filter: 'url(#digitalGrain)',
          mixBlendMode: 'overlay',
          opacity: 0.6
        }}
      >
        <div className="w-full max-w-2xl h-[70vh]" />
      </div>

      {/* Internal moving scanlines - Travels UP the hero body */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          ref={scanlineRef}
          className="w-full max-w-2xl"
          style={{
            height: '200vh',
            background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0, 229, 255, 0.15) 1px, transparent 2px, transparent 6px)',
            mixBlendMode: 'screen',
            willChange: 'transform',
            opacity: 0.6
          }}
        />
      </div>
    </div>
  )
}

export default HeroModel3D
