import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  font-family: monospace;
  font-size: 16px;
  color: rgba(0, 255, 0, 0.2);
  overflow: hidden;
  line-height: 1;
  white-space: pre;
  user-select: none;
  z-index: 0;
`

const Container = styled.div`
  background: transparent;
  height: 100vh;
  padding: 2rem;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const BackButton = styled(motion.button)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: transparent;
  color: #00ff00;
  border: 2px solid #00ff00;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  z-index: 100;
  
  &:hover {
    background: rgba(0, 255, 0, 0.1);
  }
`

const ContentWindow = styled(motion.div)`
  background: #0f0f0f;
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #00ff00;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.2);
  width: 90%;
  max-width: 800px;
  height: 80vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1e1e1e;
  }

  &::-webkit-scrollbar-thumb {
    background: #2d2d2d;
    border-radius: 4px;
  }
`

const TerminalSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #0f0f0f;
  border: 1px solid #00ff00;
  border-radius: 8px;
`

const CommandLine = styled.div`
  color: #00ff00;
  margin: 0.5rem 0;
`

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 1rem;
`

const Output = styled.div`
  color: #00ff00;
  margin-left: 2rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const ImageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  border: 2px solid #00ff00;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`

function RealWorldSolutions() {
  const navigate = useNavigate();
  const [background, setBackground] = useState('');

  useEffect(() => {
    const chars = '|/\\-_+=';
    const columns = Math.floor(window.innerWidth / 4);
    const rows = Math.floor(window.innerHeight / 4);
    const drops = Array(columns).fill(0);
    const speeds = Array(columns).fill(0).map(() => Math.random() * 0.05 + 0.02);
    
    const generateRain = () => {
      let display = Array(rows).fill().map(() => Array(columns).fill(' '));
      
      drops.forEach((drop, i) => {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.95) {
            display[j][i] = chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        drops[i] += speeds[i];
        
        if (drops[i] > rows) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.05 + 0.02;
        }
      });
      
      return display.map(row => row.join('')).join('\n');
    };

    const interval = setInterval(() => {
      setBackground(generateRain());
    }, 200);

    const resizeHandler = () => {
      const newColumns = Math.floor(window.innerWidth / 4);
      drops.length = newColumns;
      speeds.length = newColumns;
      drops.fill(0);
      speeds.fill(0).map(() => Math.random() * 0.05 + 0.02);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <>
      <Background>
        {background}
      </Background>
      <Container>
        <BackButton
          onClick={() => navigate('/work')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          cd ..
        </BackButton>

        <ContentWindow
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalSection>
            <CommandLine>
              <Prompt>visitor@portfolio:~$</Prompt>
              cat project_description.txt
            </CommandLine>
            <Output>
              Project: Anonymous Professor Rating System
              
              • A secure platform where students can provide honest feedback
              • Students can only rate professors they're currently mapped to
              • Complete anonymity guaranteed through encrypted submissions
              • Ratings are collected at the end of each semester
              • Professors receive aggregated feedback without student identifiers
              
              Key Features:
              • Student-Professor Mapping Verification
              • End-to-end encryption for anonymous submissions
              • Automated feedback aggregation
              • Secure database with no student identifiers stored
              • Real-time analytics for department heads
              
              Security Measures:
              • Zero-knowledge proof for student verification
              • Temporary session tokens
              • No IP logging or tracking
              • Multi-layer encryption
            </Output>
            <CommandLine>
              <Prompt>visitor@portfolio:~$</Prompt>
              ls screenshots/
            </CommandLine>
          </TerminalSection>

          <ImageGrid>
            <Image src="/image-1.png" alt="Solution 1" />
            <Image src="/image-2.png" alt="Solution 2" />
            <Image src="/image-3.png" alt="Solution 3" />
          </ImageGrid>
        </ContentWindow>
      </Container>
    </>
  )
}

export default RealWorldSolutions