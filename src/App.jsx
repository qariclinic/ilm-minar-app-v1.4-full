import React from 'react'
import Header from './components/Header'
import Attendance from './components/Attendance'
import Schedule from './components/Schedule'
import DailyLesson from './components/DailyLesson'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="container">
      <Header />
      <div className="grid">
        <Attendance />
        <Schedule />
      </div>
      <DailyLesson />
      <Footer />
    </div>
  )
}
