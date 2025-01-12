import { useState, useEffect, useRef } from 'react'
import { FormData, QueryStatus } from './types'

interface QueryDetailProps {
  formData: FormData | null;
  onClose: () => void;
  onCreateQuery: (formDataId: string, title: string, description: string) => Promise<void>;
  onUpdateQuery: (queryId: string, newstatus: QueryStatus) => Promise<void>;
  onDeleteQuery: (queryId: string) => Promise<void>;
}

const QueryDetail: React.FC<QueryDetailProps> = ({ 
  formData,
  onClose,
  onCreateQuery,
  onUpdateQuery,
  onDeleteQuery
}) => {
  const [description, setDescription] = useState<string>('');
  const dialogRef = useRef<HTMLDialogElement>(null)


  useEffect(() => {
    if (formData) {
      dialogRef.current?.showModal();
      // Initialize description with existing query description if it exists
      setDescription(formData.query?.description || '');
    } else {
      dialogRef.current?.close();
    }
  }, [formData]);

  if (!formData) return null;


  return (
        <dialog 
          ref={dialogRef}
          onClose={onClose}
        >
          <div onClick={e => e.stopPropagation()}>
            <h3>
              {formData.query ? 'Manage Query' : 'Create New Query'}
            </h3>
            
            <div>
              <p><strong>Question:</strong> {formData.question}</p>
              <p><strong>Answer:</strong> {formData.answer}</p>
              {formData.query && (
                <p><strong>Status:</strong> {formData.query.status}</p>
              )}
            </div>

            <div>
              {formData.query ? (
                <>
                  <p>created at: {new Date(formData.query.createdAt).toLocaleString()}</p>
                  <p>last updated at: {new Date(formData.query.updatedAt).toLocaleString()}</p>
                  <p>description: {formData.query.description}</p>
                  <button 
                    onClick={() => formData.query && onUpdateQuery(
                      formData.query.id, 
                      formData.query.status === 'OPEN' ? 'RESOLVED' : 'OPEN'
                    )}
                  >
                    {formData.query.status === 'OPEN' ? 'Resolve' : 'Reopen'}
                  </button>
                  <button 
                    onClick={() => formData.query && onDeleteQuery(formData.query.id)}
                  >
                    Delete
                  </button>
                </>
              ) : (
              <>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="Enter query description..."
                />
                <button onClick={() => onCreateQuery(formData.id, formData.question, description)}>
                  Create Query
                </button>
              </>
              )}
              <button onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
  )
}

export default QueryDetail