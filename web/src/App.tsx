import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getFormData, createQuery, updateQuery, deleteQuery } from './functions'
import { FormData } from './types';

function App() {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [currFd, setCurrFd] = useState<FormData | null>();

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (currFd) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [currFd]);

  return (
    <>
      <button onClick={async () => {
        const temp = await getFormData();
        console.log(temp);
        setFormData(temp.data || [])
      }}>
        Refresh
      </button>
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
            <tr>
              <th>
                {fd.question}
              </th>
              <th>
                {fd.answer}
              </th>
              <th>
                {fd.query == null ? (
                  <button onClick={() => {
                    console.log(`We want to create a query for ${fd.id}`)
                    setCurrFd(fd);
                  }}>
                    Create
                  </button>
                ) : (
                  <button onClick={() => {
                    setCurrFd(fd);
                  }}>
                    {fd.query.status}
                  </button>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {currFd && (
        <dialog 
          ref={dialogRef}
          className="p-0 bg-white rounded-lg shadow-xl backdrop:bg-black backdrop:bg-opacity-50"
          onClose={() => setCurrFd(null)}
        >
          <div 
            onClick={e => e.stopPropagation()} 
            className="min-w-[32rem] max-w-2xl"
          >
            {currFd.query ? 
              <>
                <button onClick={() => currFd.query && updateQuery(currFd.query.id, currFd.query.status == 'OPEN' ? "RESOLVED" : "OPEN")}>
                  {currFd.query.status == 'OPEN' ? 'Resolve' : 'Unresolve'}
                </button>
                <button onClick={() => currFd.query && deleteQuery(currFd.query.id)}>
                  Delete
                </button>
              </> 
            : (
              <button onClick={() => createQuery('whatever', 'w', currFd.id)}>
                Create
              </button>
            )}
          </div>
        </dialog>
      )}
    </>
  )
}

export default App
