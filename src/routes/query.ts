import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'

async function queryRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)
  const log = app.log.child({ component: 'queryRoutes' })

  // GET to retrieve every row
  app.get('/', async (request, reply) => {
    try {
      const query = await prisma.query.findMany({})
      return {
        total: query.length,
        query,
      }
    } catch (err: any) {
      log.error({ err }, err.message)
      throw new Error('failed to fetch query')
    }
  })

  // POST to create a new query
  app.post('/', async (request, reply) => {
    const { title, description, formDataId } = request.body as any
    try {
      const query = await prisma.query.create({
        data: {
          title,
          description,
          status: 'OPEN',
          formDataId
        }
      })
      return query
    } catch (err: any) {
      log.error({ err }, err.message)
      throw new Error('failed to create query')
    }
  })

  // PUT to update a query
  app.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { status, description } = request.body as any
    try {
      const query = await prisma.query.update({
        where: { id },
        data: { 
          status,
          description,
          updatedAt: new Date()
        }
      })
      return query
    } catch (err: any) {
      log.error({ err }, err.message)
      throw new Error('failed to update query')
    }
  })

  // DELETE endpoint
  app.delete('/:id', async (request, reply) => {
    log.error({}, "delete");
    const { id } = request.params as { id: string }
    try {
      await prisma.query.delete({
        where: { id }
      })
      return { success: true }
    } catch (err: any) {
      log.error({ err }, err.message)
      throw new Error('failed to delete query')
    }
  })
}

export default queryRoutes