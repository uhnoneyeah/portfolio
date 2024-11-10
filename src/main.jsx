import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import WorkPage from './WorkPage.jsx'
import ElabStatus from './ElabStatus.jsx'
import LabStatus from './LabStatus.jsx'
import RealWorldSolutions from './RealWorldSolutions.jsx'
import CodingContests from './CodingContests.jsx'
import HotsQuestions from './HotsQuestions.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/elab-status" element={<ElabStatus />} />
        <Route path="/lab-status" element={<LabStatus />} />
        <Route path="/real-world" element={<RealWorldSolutions />} />
        <Route path="/coding-contests" element={<CodingContests />} />
        <Route path="/hots" element={<HotsQuestions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 