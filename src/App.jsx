import React, { useState } from 'react'
import LabEnvironment from './components/LabEnvironment'
import TerminalIntro from './components/TerminalIntro'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import './index.css'

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {/* Cinematic Intro Sequence Overlay */}
      {!introFinished && <TerminalIntro onComplete={() => setIntroFinished(true)} />}

      {/* SVG Filters for Hyper-Realism */}
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <defs>
          <filter id="glass-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
          </filter>

          <filter id="liquid-turbulence">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      
      {/* Render Lab in background. Start assembly sequence when intro finishes. */}
      <LabEnvironment startAssembly={introFinished} />

      {/* Render the premium website structure after intro */}
      {introFinished && (
        <>
          <Navbar />
          <LandingPage />
        </>
      )}
    </>
  )
}

export default App
