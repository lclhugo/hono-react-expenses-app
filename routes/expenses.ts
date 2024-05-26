import { Hono } from 'hono'

export const expensesRoute = new Hono()
  .get('/', async c => {
    return c.json({ expenses: [] })
  })
  .post('/', async c => {
    return c.json({ expenses: [] })
  })
// .delete
// .put
