import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { FaDesktop, FaCode, FaBrain, FaChartLine, FaTrophy } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  background: #1e1e1e;
  height: 100vh;
  padding: 2rem;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
`

const Card = styled(motion.div)`
  background: #0f0f0f;
  border-radius: 50%;
  aspect-ratio: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  cursor: pointer;
  border: 2px solid #00ff00;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
  }
`

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #00ff00;
`

const Title = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: #00ff00;
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

const items = [
  {
    icon: <FaChartLine />,
    title: 'eLab Completion Status',
    link: '/elab-status'
  },
  {
    icon: <FaDesktop />,
    title: 'Lab Experiment Status',
    link: '/lab-status'
  },
  {
    icon: <FaCode />,
    title: 'Real World Solutions',
    link: '/real-world'
  },
  {
    icon: <FaBrain />,
    title: 'HOTS Questions',
    link: '/hots'
  },
  {
    icon: <FaTrophy />,
    title: 'Coding Competitions',
    link: '/coding-contests'
  }
]

function WorkPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        cd ..
      </BackButton>
      <Grid>
        {items.map((item, index) => (
          <Card
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.2,
              ease: "easeOut"
            }}
            onClick={() => navigate(item.link)}
          >
            <Icon>{item.icon}</Icon>
            <Title>{item.title}</Title>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}

export default WorkPage 