import { useState, useEffect } from 'react'
import { HelpCircle, CheckCircle, Plus } from 'lucide-react'

import { getFormData, createQuery, updateQuery, deleteQuery } from './functions'
import { FormData, QueryStatus } from './types'
import QueryDetail from './QueryDetail'

import './App.css'

function App() {
  const [formData, setFormData] = useState<FormData[]>([])
  const [currFd, setCurrFd] = useState<FormData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Load form data
  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getFormData()
      setFormData(response.data || [])
    } catch (err) {
      setError('Failed to fetch data. Please try again.')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data load
  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateQuery = async (formDataId: string, title: string, description: string) => {
    try {
      setError(null)
      await createQuery(title, description, formDataId)
      await fetchData()
      setCurrFd(null)
    } catch (err) {
      setError('Failed to create query. Please try again.')
      console.error('Error creating query:', err)
    }
  }

  const handleUpdateQuery = async (queryId: string, newStatus: QueryStatus) => {
    try {
      setError(null)
      await updateQuery(queryId, newStatus)
      await fetchData()
      setCurrFd(null)
    } catch (err) {
      setError('Failed to update query. Please try again.')
      console.error('Error updating query:', err)
    }
  }

  const handleDeleteQuery = async (queryId: string) => {
    try {
      setError(null)
      await deleteQuery(queryId)
      await fetchData()
      setCurrFd(null)
    } catch (err) {
      setError('Failed to delete query. Please try again.')
      console.error('Error deleting query:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">
          Loading...
        </div>
      </div>
    )
  }

  const getQueryStatusIcon = (status: QueryStatus | undefined) => {
    if (!status) return <Plus className="h-4 w-4" />
    return status === 'OPEN' 
      ? <HelpCircle className="h-4 w-4" />
      : <CheckCircle className="h-4 w-4" />
  }

  const getQueryStatusClass = (status: QueryStatus | undefined) => {
    if (!status) return 'plus'
    return status === 'OPEN' ? 'question' : 'check';
  }

  return (
    <div className="app-container">
      {error && (
        <div>
          {error}
        </div>
      )}

      <div>
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th className='button-cell'>Query</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((fd: FormData) => (
              <tr key={fd.id}>
                <td>{fd.question}</td>
                <td>{fd.answer}</td>
                <td className='button-cell'>
                  <button onClick={() => setCurrFd(fd)} className={getQueryStatusClass(fd.query?.status)}>
                    {getQueryStatusIcon(fd.query?.status)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QueryDetail
        formData={currFd}
        onClose={() => setCurrFd(null)}
        onCreateQuery={handleCreateQuery}
        onUpdateQuery={handleUpdateQuery}
        onDeleteQuery={handleDeleteQuery}
      />
    </div>
  )
}

export default App