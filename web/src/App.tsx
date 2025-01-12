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
      <button onClick={async () => setFormData(await getFormData())}>
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
              {
              currFd.query.status == 'OPEN' ? (
                <button onClick={() => updateQuery(currFd.query.id, true)}>
                  Resolve
                </button>
              ) : (
                <button onClick={() => updateQuery(currFd.query.id, false)}>
                  Unresolve
                </button>
              )
              }
            <button onClick={() => deleteQuery(currFd.query.id)}>
              Delete
            </button>
            </>: (
              <button onClick={
                () => createQuery('whatever', 'w', currFd.id)
              }>
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
