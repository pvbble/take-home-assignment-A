import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getFormData, getQuery, postQuery, updateQuery, deleteQuery } from './functions'

function App() {
  const [count, setCount] = useState(1)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={getQuery}>
          GET
        </button>
        <button onClick={() => postQuery("test title", "test description", "ea6fea18-2d8b-4910-a033-44ab19bcd7ca")}>
          POST
        </button>
        <button onClick={getFormData}>
          FORM DATA
        </button>
        <button onClick={() => updateQuery("ba333417-2858-4337-8146-0b78bc55c4ff")}>
          UPDATE QUERY
        </button>
        <button onClick = {() => deleteQuery("600c4907-4643-4237-ab19-52be36349d1e")}>
          DELETE QUERY
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
