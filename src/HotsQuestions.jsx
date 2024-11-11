import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaFolder, FaTimes } from 'react-icons/fa'

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
  position: relative;
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

const FolderIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 150px;
  padding: 1rem;
  position: absolute;
  top: ${props => props.top || '100px'};
  left: ${props => props.left || '50px'};
  
  &:hover {
    background: rgba(0, 255, 0, 0.1);
    border-radius: 8px;
  }
`

const FolderName = styled.div`
  color: #00ff00;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  width: 100%;
  word-break: break-word;
  overflow: visible;
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #0f0f0f;
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #00ff00;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.2);
  width: 90%;
  max-width: 800px;
  height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  padding-top: 4rem;

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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`

const CloseButton = styled(motion.button)`
  position: sticky;
  top: 1rem;
  right: 1rem;
  float: right;
  background: transparent;
  border: none;
  color: #00ff00;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1001;
  
  &:hover {
    color: #ff5f56;
  }
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

function HotsQuestions() {
  const navigate = useNavigate();
  const [selectedFolder, setSelectedFolder] = useState(null);
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

        <FolderIcon
          onClick={() => setSelectedFolder('hackerrank')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          top="100px"
          left="50px"
        >
          <FaFolder size={50} />
          <FolderName>hackerrank</FolderName>
        </FolderIcon>

        <FolderIcon
          onClick={() => setSelectedFolder('hots')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          top="100px"
          left="250px"
        >
          <FaFolder size={50} />
          <FolderName>hots-questions</FolderName>
        </FolderIcon>

        {selectedFolder && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFolder(null)}
            />
            <Modal
              initial={{ opacity: 0, x: '100%', y: '100%' }}
              animate={{ opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, x: '100%', y: '100%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <CloseButton
                onClick={() => setSelectedFolder(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes />
              </CloseButton>
              {selectedFolder === 'hackerrank' ? (
                <ImageGrid>
                  <Image src="/hack-1.png" alt="Hackerrank Solution 1" />
                  <Image src="/hack-2.png" alt="Hackerrank Solution 2" />
                  <Image src="/hack-3.png" alt="Hackerrank Solution 3" />
                </ImageGrid>
              ) : (
                <ImageGrid>
                  <Image src="/hots.png" alt="HOTS Questions" />
                  <Image src="/hots-2.jpeg" alt="HOTS Questions 2" />
                  <Image src="/hots-3.jpeg" alt="HOTS Questions 3" />
                  <Image src="/hots-4.jpeg" alt="HOTS Questions 4" />
                  <Image src="/hots-5.jpeg" alt="HOTS Questions 5" />
                  <Image src="/hots-6.jpeg" alt="HOTS Questions 6" />
                  <Image src="/hots-7.jpeg" alt="HOTS Questions 7" />
                </ImageGrid>
              )}
            </Modal>
          </>
        )}
      </Container>
    </>
  )
}

export default HotsQuestions 