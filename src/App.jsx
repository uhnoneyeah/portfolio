import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Container = styled.div`
  background: #1e1e1e;
  color: #00ff00;
  height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  overflow: hidden;
`

const TerminalWindow = styled.div`
  background: #0f0f0f;
  border-radius: 10px;
  width: 800px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  overflow: hidden;
  margin-bottom: 1rem;
  height: fit-content;
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
  padding: 1rem;
`

const Line = styled(motion.div)`
  margin: 0.2rem 0;
  display: flex;
`

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 1rem;
`

const Command = styled.span`
  color: #ffffff;
`

const Output = styled(motion.div)`
  color: #00ff00;
  margin-left: 1.5rem;
  margin-bottom: 0.2rem;
`

const Link = styled(motion.a)`
  color: #00ff00;
  text-decoration: none;
  font-size: 2.5rem;
  
  &:hover {
    color: #ffffff;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
  }
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

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 100%;
  padding: 2rem;
  overflow: hidden;
`

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`

const WorkButton = styled(motion.a)`
  display: inline-block;
  background: transparent;
  color: #00ff00;
  border: 2px solid #00ff00;
  padding: 0.8rem 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  text-decoration: none;
  margin-top: 1rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: '> ./view-my-work.sh';
    display: block;
  }

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
  }
`

function App() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const lines = [
    { type: 'command', text: 'whoami' },
    { type: 'output', text: 'Ananya Pariyani\nDepartment of Computing Technologies\nB2/Sem III' },
    { type: 'command', text: 'cat about.txt' },
    { type: 'output', text: 'Research Fellow @ IEEE SB SRMIST\nPassionate about ML, backend dev, & math' },
    { type: 'command', text: 'ls skills/' },
    { type: 'output', text: '• Python • Java & Spring Boot • C/C++ • HTML, CSS, & JS' },
  ];

  useEffect(() => {
    const timeouts = [];
    
    lines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        if (index === lines.length - 1) {
          setIsTypingComplete(true);
        }
      }, index * 1000);
      
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <Container>
      <PageWrapper>
        <TerminalWindow>
          <TerminalHeader>
            <TerminalButton color="#ff5f56" />
            <TerminalButton color="#ffbd2e" />
            <TerminalButton color="#27c93f" />
          </TerminalHeader>
          <Terminal>
            {displayedLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 1 }}
              >
                {line.type === 'command' ? (
                  <Line>
                    <Prompt>visitor@portfolio:~$</Prompt>
                    <Command>{line.text}</Command>
                  </Line>
                ) : (
                  <Output>
                    {line.text.split('\n').map((text, i) => (
                      <div key={i}>{text}</div>
                    ))}
                  </Output>
                )}
              </motion.div>
            ))}
            {isTypingComplete && (
              <Line>
                <Prompt>visitor@portfolio:~$</Prompt>
                <Cursor />
              </Line>
            )}
          </Terminal>
        </TerminalWindow>

        <SocialContainer>
          <WorkButton
            as={motion.a}
            href="/work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          />
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link 
              href="https://github.com/uhnoneyeah" 
              target="_blank"
              whileHover={{ scale: 1.1 }}
              aria-label="GitHub"
            >
              <FaGithub />
            </Link>
            <Link 
              href="https://in.linkedin.com/in/ananya-pariyani-295a6728a" 
              target="_blank"
              whileHover={{ scale: 1.1 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </Link>
          </div>
        </SocialContainer>
      </PageWrapper>
    </Container>
  )
}

export default App