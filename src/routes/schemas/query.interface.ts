export interface IQuery { // TODO: fix this
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    status: string
    formData: string
    formDataId: string
  }
  
  export interface ICountedQuery {
    total: number
    formData: IQuery[]
  }
  