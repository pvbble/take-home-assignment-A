import { useState } from 'react'
import './App.css'
import { getFormData, getQuery, postQuery, updateQuery, deleteQuery } from './functions'
import { Query, FormData } from './types';

function App() {
  const [formData, setFormData] = useState<FormData[]>([]);

  return (
    <>
      <button onClick={async () => setFormData(await getFormData())}>
        Refresh
      </button>
      <table>
        <thead>
          <tr>
            <th>
              Question
            </th>
            <th>
              Answer
            </th>
            <th>
              Query
            </th>
          </tr>
        </thead>
        <tbody>
          {formData.map((formData: FormData) => (
            <tr>
              <th>
                {formData.question}
              </th>
              <th>
                {formData.answer}
              </th>
              <th>
                {formData.query == null ? 'Create' : formData.query.status}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
