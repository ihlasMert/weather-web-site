import React from 'react'
import Search from './components/search/Search'
import "./App.css"

const App = () => {
  const handleOnSearchChange =(searchData)=>{
    console.log(searchData);
  }
  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>
    </div>
  )
}

export default App