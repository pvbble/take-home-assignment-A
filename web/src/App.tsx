import { useState, useEffect, useRef } from 'react'
import { getFormData, createQuery, updateQuery, deleteQuery } from './functions'
import { FormData, QueryStatus } from './types'
import QueryDetail from './QueryDetail'

function App() {
  const [formData, setFormData] = useState<FormData[]>([])
  const [currFd, setCurrFd] = useState<FormData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Load form data
  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getFormData()
      setFormData(response.data || [])
    } catch (err) {
      setError('Failed to fetch data')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data load
  useEffect(() => {
    fetchData()
  }, [])

  // Display modal when a row is selected, hide otherwise
  useEffect(() => {
    if (currFd) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [currFd])

  const handleCreateQuery = async (formDataId: string, title: string, description: string) => {
    try {
      await createQuery(title, description, formDataId)
      await fetchData()
      setCurrFd(null)
    } catch (err) {
      setError('Failed to create query')
      console.error('Error creating query:', err)
    }
  }

  const handleUpdateQuery = async (queryId: string, newStatus: QueryStatus) => {
    try {
      await updateQuery(queryId, newStatus)
      await fetchData()
      setCurrFd(null)
    } catch (err) {
      setError('Failed to update query')
      console.error('Error updating query:', err)
    }
  }

  const handleDeleteQuery = async (queryId: string) => {
    try {
      await deleteQuery(queryId)
      await fetchData()
      setCurrFd(null)
    } catch (err) {
      setError('Failed to delete query')
      console.error('Error deleting query:', err)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={fetchData}>Retry</button>
      </div>
    )
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((fd: FormData) => (
            <tr key={fd.id}>
              <td>{fd.question}</td>
              <td>{fd.answer}</td>
              <td>
                <button onClick={() => setCurrFd(fd)}>
                  {fd.query ? fd.query.status : 'Create'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currFd && (
        <QueryDetail
          formData={currFd}
          onClose={() => setCurrFd(null)}
          onCreateQuery={handleCreateQuery}
          onUpdateQuery={handleUpdateQuery}
          onDeleteQuery={handleDeleteQuery}
        />
      )}
    </div>
  )
}

export default App