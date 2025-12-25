import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useFBX } from '@react-three/drei'
import * as THREE from 'three'

/**
 * HeroModel - FBX 3D character with holographic shader
 */
function HeroModel({ color, rimColor, glowColor }) {
  const meshRef = useRef()
  const outlineRef = useRef()
  const fbx = useFBX('/model.fbx')
  const [clonedModel, setClonedModel] = useState(null)
  const [clonedOutline, setClonedOutline] = useState(null)

  useEffect(() => {
    if (fbx) {
      // Calculate proper scale based on model's actual size
      const boundingBox = new THREE.Box3().setFromObject(fbx)
      const size = new THREE.Vector3()
      boundingBox.getSize(size)

      // Target height: 2 units (comfortable size for camera at distance 4)
      const targetHeight = 2
      const scaleFactor = targetHeight / size.y

      // Clone for main model
      const mainClone = fbx.clone()
      mainClone.scale.setScalar(scaleFactor)

      // Center the model - calculate bounding box AFTER scaling
      const scaledBox = new THREE.Box3().setFromObject(mainClone)
      const center = new THREE.Vector3()
      scaledBox.getCenter(center)

      // Position model so it's centered horizontally and bottom is at y = 0
      const yOffset = -scaledBox.min.y
      mainClone.position.set(-center.x, yOffset, -center.z)

      // Apply holographic material to all meshes
      mainClone.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.7,
            roughness: 0.3,
            emissive: glowColor,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.6
          })
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      // Store base values for animation
      mainClone.userData.baseY = yOffset
      mainClone.userData.baseScale = scaleFactor

      setClonedModel(mainClone)

      // Clone for rim light outline
      const outlineClone = fbx.clone()
      const outlineScale = scaleFactor * 1.02

      outlineClone.scale.setScalar(outlineScale)
      outlineClone.position.set(-center.x, yOffset, -center.z)

      outlineClone.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({
            color: rimColor,
            transparent: true,
            opacity: 0.5,
            side: THREE.BackSide
          })
        }
      })

      outlineClone.userData.baseScale = outlineScale
      setClonedOutline(outlineClone)
    }
  }, [fbx, color, rimColor, glowColor])

  // Idle breathing animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Gentle breathing motion
    if (meshRef.current) {
      const baseY = meshRef.current.userData.baseY || 0
      meshRef.current.position.y = baseY + Math.sin(time * 0.5) * 0.02
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.05
    }

    // Pulsing outline
    if (outlineRef.current && meshRef.current) {
      const baseScale = outlineRef.current.userData.baseScale || 1
      const pulseScale = 1 + Math.sin(time * 2) * 0.01
      const finalScale = baseScale * pulseScale

      outlineRef.current.scale.setScalar(finalScale)
      outlineRef.current.position.copy(meshRef.current.position)
      outlineRef.current.rotation.copy(meshRef.current.rotation)
    }
  })

  if (!clonedModel || !clonedOutline) return null

  return (
    <>
      {/* Main holographic model */}
      <primitive ref={meshRef} object={clonedModel} />

      {/* Rim light outline */}
      <primitive ref={outlineRef} object={clonedOutline} />
    </>
  )
}

/**
 * DigitalDebris - Floating 3D particles (tiny cubes/pixels) orbiting hero
 */
function DigitalDebris() {
  const debrisRef = useRef()
  const particleRefs = useRef([])
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
      speed: 0.2 + Math.random() * 0.3,
      flickerOffset: Math.random() * 10 // Random phase offset for flicker
    }
  })

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (debrisRef.current) {
      debrisRef.current.rotation.y = time * 0.1
    }

    // Flickering effect - digital sparks
    particleRefs.current.forEach((ref, i) => {
      if (ref && particles[i]) {
        const flicker = Math.sin((time + particles[i].flickerOffset) * 8) * 0.5 + 0.5
        ref.material.opacity = 0.3 + flicker * 0.5 // Flicker between 0.3 and 0.8
      }
    })
  })

  return (
    <group ref={debrisRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position}
          ref={(el) => (particleRefs.current[i] = el)}
        >
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
 * HolographicPlatform - Glowing ring under hero with digital ripple
 */
function HolographicPlatform({ color }) {
  const ringRef = useRef()
  const rippleRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3
    }

    // Digital ripple animation - expanding and fading
    if (rippleRef.current) {
      const ripplePhase = (time * 0.5) % 1
      rippleRef.current.scale.setScalar(0.5 + ripplePhase * 1.5)
      rippleRef.current.material.opacity = (1 - ripplePhase) * 0.5
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

      {/* Digital Ripple Effect */}
      <mesh ref={rippleRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.15, 1.2, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
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
        intensity={3.0}
        color={hero.appearance.rimLightColor}
      />

      {/* Rim light (back-right) */}
      <spotLight
        position={[3, 2, -2]}
        angle={0.4}
        penumbra={0.8}
        intensity={2.5}
        color={hero.appearance.rimLightColor}
      />

      {/* Fill light (bottom) */}
      <pointLight
        position={[0, -1, 2]}
        intensity={0.8}
        color={hero.appearance.primaryColor}
      />

      {/* Atmospheric Point Lights - Violet (left) and Blue (right) */}
      <pointLight
        position={[-4, 2, 2]}
        intensity={0.3}
        color="#8b5cf6"
      />
      <pointLight
        position={[4, 2, 2]}
        intensity={0.3}
        color="#3b82f6"
      />

      {/* Holographic platform under hero */}
      <HolographicPlatform color={hero.appearance.glowColor} />

      {/* Digital Debris - Floating voxel particles */}
      <DigitalDebris />

      {/* Hero character - FBX Model */}
      <HeroModel
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

      {/* Atmospheric Fog Effect - Deep Hangar Depth */}
      <fog attach="fog" args={['#050505', 5, 15]} />
    </>
  )
}

/**
 * HeroModel3D Component
 * Renders the 3D hero in a volumetric chamber
 */
const HeroModel3D = ({ hero }) => {
  return (
    <div className="absolute inset-0 z-10">
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

    </div>
  )
}

export default HeroModel3D
