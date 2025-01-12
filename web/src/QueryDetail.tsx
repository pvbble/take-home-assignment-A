import { useState, useEffect, useRef } from 'react'
import { Trash2Icon, X } from 'lucide-react'
import { FormData, QueryStatus } from './types'

import './QueryDetail.css'

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
      className='container'
    >
      <div onClick={e => e.stopPropagation()}>
        <div className='header'>
          <h3>
            {formData.query ? `Query | ${formData.question}` : `Create a Query | ${formData.question}`}
          </h3>
          <X className="x" onClick={onClose} />
        </div>

        {formData.query && (
          <div className={`row-container ${formData.query?.status === 'OPEN' ? 'open-status' : 'resolved-status'}`}>
            <div className='info-container'>
              <div className='info'>
                <h3>Query Status:</h3>
                <p>{formData.query.status == 'RESOLVED' ? 'Resolved' : 'Open'}</p>
              </div>
              <div className='info'>
                <h3>Created On:</h3>
                <p>{new Date(formData.query.createdAt).toLocaleString('en-US', {
                  year: '2-digit',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}</p>
              </div>
              <div className='info'>
                <h3>Last Updated:</h3>
                <p>{new Date(formData.query.updatedAt).toLocaleString('en-US', {
                  year: '2-digit',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}</p>
              </div>
            </div>
            <div className='buttons'>
              <button className={formData.query.status}
                onClick={() => formData.query && onUpdateQuery(
                  formData.query.id,
                  formData.query.status === 'OPEN' ? 'RESOLVED' : 'OPEN'
                )}
              >
                {formData.query.status === 'OPEN' ? 'Resolve' : 'Reopen'}
              </button>
              <button className='delete'
                onClick={() => formData.query && onDeleteQuery(formData.query.id)}
              >
                <Trash2Icon/>
              </button>
            </div>
          </div>
        )}


        {formData.query ?
          <div className='description-container'>
            <p>Description: {formData.query.description == '' ? 'N/A' : formData.query.description}</p>
          </div>
          : (
            <div className='textarea-container'>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Add a new remark"
              />
              <button className='create' onClick={() => onCreateQuery(formData.id, formData.question, description)}>
                Create Query
              </button>
            </div>
          )}
      </div>
    </dialog>
  )
}

export default QueryDetail