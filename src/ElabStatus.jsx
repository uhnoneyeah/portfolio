import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Container = styled.div`
  background: #1e1e1e;
  height: 100vh;
  padding: 1rem;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const TerminalWindow = styled.div`
  background: #0f0f0f;
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  overflow: hidden;
`

const TerminalHeader = styled.div`
  background: #2d2d2d;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TerminalButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`

const Terminal = styled.div`
  padding: 0.8rem;
`

const ProgressContainer = styled.div`
  margin: 0.5rem 0;
  font-family: monospace;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 25px;
  background: #2d2d2d;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin: 0.5rem 0;
  border: 1px solid #00ff00;
`

const Progress = styled(motion.div)`
  height: 100%;
  background: #cd5c5c;
  width: ${props => props.progress}%;
`

const ProgressText = styled.div`
  color: #00ff00;
  margin-top: 0.5rem;
  text-align: center;
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
  
  &:hover {
    background: rgba(0, 255, 0, 0.1);
  }
`

const Title = styled(motion.h1)`
  color: #00ff00;
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
`

const CommandLine = styled.div`
  color: #00ff00;
  margin-bottom: 0.5rem;
`

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 1rem;
`

const ImageContainer = styled(motion.div)`
  width: 300px;
  border: 2px solid #00ff00;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.2);
`

const StatusImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1rem;
  background: #00ff00;
  margin-left: 4px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }
`

function ElabStatus() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const totalPrograms = 30;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setShowCompletion(true);
      }, 3000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <BackButton
        onClick={() => navigate('/work')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        cd ..
      </BackButton>
      
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        eLab Completion Status
      </Title>

      <ImageContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <StatusImage 
          src="/elab-status.png"
          alt="eLab Completion Status"
        />
      </ImageContainer>

      <TerminalWindow>
        <TerminalHeader>
          <TerminalButton color="#ff5f56" />
          <TerminalButton color="#ffbd2e" />
          <TerminalButton color="#27c93f" />
        </TerminalHeader>
        <Terminal>
          <CommandLine>
            <Prompt>visitor@portfolio:~$</Prompt>
            checking elab status...
          </CommandLine>
          <ProgressContainer>
            <ProgressBar>
              <Progress 
                progress={progress}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
            </ProgressBar>
            {showCompletion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ProgressText>
                  Programs Completed: 30/30 (100%)
                </ProgressText>
              </motion.div>
            )}
          </ProgressContainer>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CommandLine>
                status: all programs completed successfully
              </CommandLine>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <CommandLine>
                  <Prompt>visitor@portfolio:~$</Prompt>
                  <Cursor />
                </CommandLine>
              </motion.div>
            </motion.div>
          )}
        </Terminal>
      </TerminalWindow>
    </Container>
  )
}

export default ElabStatus