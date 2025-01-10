export interface IFormData {
  id: string
  question: string
  answer: string
  query?: {
    id: string
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
    status: 'OPEN' | 'RESOLVED'
    formDataId: string
  } | null
}

export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
