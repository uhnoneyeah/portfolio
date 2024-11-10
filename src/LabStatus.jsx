import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Container = styled.div`
  background: #1e1e1e;
  height: 100vh;
  padding: 2rem;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const TerminalWindow = styled.div`
  background: #0f0f0f;
  border-radius: 10px;
  width: 800px;
  height: 70vh;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

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

const CommandLine = styled.div`
  color: #00ff00;
  margin: 0.5rem 0;
  display: flex;
  align-items: flex-start;
`

const Output = styled.div`
  color: #00ff00;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  border-bottom: 1px solid rgba(0, 255, 0, 0.1);
`

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 1rem;
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
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
`

const Score = styled.span`
  color: #cd5c5c;
  font-weight: bold;
`

const experiments = [
  { title: "Lab 1: Implementation of Structures", score: 18 },
  { title: "Lab 2: Implementation of Structures using Pointers", score: 18 },
  { title: "Lab 3: Implementation of Matrix Multiplication – Dynamic Memory allocation", score: 20 },
  { title: "Lab 4: Array Implementation of List", score: 20 },
  { title: "Lab 5: Implementation of Linked List", score: 20 },
  { title: "Lab 6: Implementation of Doubly linked List", score: 20 },
  { title: "Lab 7: Implementation of Stack using array and Linked List", score: 20 },
  { title: "Lab 8: Implementation of Queue using array and Linked list", score: 20 },
  { title: "Lab 9: Applications of Stack, Queue", score: 20 },
  { title: "Lab 10: Implementation of Tree using array", score: 20 },
  { title: "Lab 11: Implementation of BST using linked list", score: 20 },
  { title: "Lab 12: Implementation of B-Trees", score: 20 }
];

function LabStatus() {
  const navigate = useNavigate();
  const [currentLine, setCurrentLine] = useState(0);
  const [showAverage, setShowAverage] = useState(false);
  
  const average = experiments.reduce((acc, exp) => acc + exp.score, 0) / experiments.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < experiments.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowAverage(true), 500);
          return prev;
        }
      });
    }, 200);

    return () => clearInterval(interval);
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

      <TerminalWindow>
        <TerminalHeader>
          <TerminalButton color="#ff5f56" />
          <TerminalButton color="#ffbd2e" />
          <TerminalButton color="#27c93f" />
        </TerminalHeader>
        <Terminal>
          <CommandLine>
            <Prompt>visitor@portfolio:~$</Prompt>
            ls lab_experiments/
          </CommandLine>
          
          {experiments.slice(0, currentLine).map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Output>
                <span>{exp.title}</span>
                <Score>{exp.score}/20</Score>
              </Output>
            </motion.div>
          ))}

          {currentLine >= experiments.length && (
            <>
              <CommandLine>
                <Prompt>visitor@portfolio:~$</Prompt>
                calculate_average
              </CommandLine>
              {showAverage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Output style={{ color: '#cd5c5c', justifyContent: 'center', fontSize: '1.1em' }}>
                    Average Score: {average.toFixed(2)}/20
                  </Output>
                  <CommandLine>
                    <Prompt>visitor@portfolio:~$</Prompt>
                  </CommandLine>
                </motion.div>
              )}
            </>
          )}
        </Terminal>
      </TerminalWindow>
    </Container>
  )
}

export default LabStatus