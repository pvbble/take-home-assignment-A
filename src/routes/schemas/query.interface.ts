export interface IQuery {
    id: string
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
    status: 'OPEN' | 'RESOLVED'
    formData: string
    formDataId: string
  }
  
  export interface ICountedQuery {
    total: number
    formData: IQuery[]
  }
  