import { useState, useLayoutEffect, useEffect, useRef } from 'react'; 
 
export default function Tooltip() { 
  const [position, setPosition] = useState({ top: 0, left: 0 }); 
  const [useLayout, setUseLayout] = useState(false); 
  const buttonRef = useRef<HTMLButtonElement>(null); 
 
  // Version useEffect — flash visible 
  useEffect(() => { 
    if (useLayout) return; 
    if (buttonRef.current) { 
      const rect = buttonRef.current.getBoundingClientRect(); 
      setPosition({ top: rect.bottom + 8, left: rect.left }); 
    } 
  }, [useLayout]); 
 
  // Version useLayoutEffect — pas de flash 
  useLayoutEffect(() => { 
    if (!useLayout) return; 
    if (buttonRef.current) { 
      const rect = buttonRef.current.getBoundingClientRect(); 
      setPosition({ top: rect.bottom + 8, left: rect.left }); 
    } 
  }, [useLayout]); 
 
  return ( 
    <div> 
      <button 
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: '1px solid #ddd',
          backgroundColor: 'white',
          cursor: 'pointer',
          fontSize: '0.9rem',
          marginRight: '12px'
        }}
        onClick={() => { 
          setPosition({ top: 0, left: 0 }); 
          setUseLayout(prev => !prev); 
        }}
      > 
        Mode : {useLayout ? 'useLayoutEffect' : 'useEffect'} 
      </button> 
 
      <button 
        ref={buttonRef}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#1b8c3e',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        Survolez-moi
      </button> 
 
      <div style={{ 
        position: 'fixed', 
        top: position.top, 
        left: position.left, 
        background: position.top === 0 ? 'red' : '#333', 
        color: 'white', 
        padding: '0.5rem 1rem', 
        borderRadius: '6px', 
        transition: 'none', 
      }}> 
        {position.top === 0 ? '⚡FLASH (0,0)' : 'Info-bulle positionnée !'} 
      </div> 
    </div> 
  ); 
} 