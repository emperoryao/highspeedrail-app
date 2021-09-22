import React, { useEffect, useState, useContext } from 'react'
import ReactDom from 'react-dom'
import './App.css'
import Search from './search'
import Loading from './Loading'
import Results from './results';
import { useGlobalContext } from './context'

function App() {
  const { loading } = useGlobalContext()

  if (loading) {
    return <Loading />
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <p>高鐵票價查詢系統</p>
        <Search />
        <Results />
      </header>
    </div>
  )
}

export default App
