import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(1000),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchene = z.object({
  title: z.string().min(3).max(1000),
  amount: z.number().positive(),
});

const fakeExpenses: Expense[] = [
  { id: 1, title: "rent", amount: 1000 },
  { id: 2, title: "groceries", amount: 500 },
  { id: 3, title: "groceries", amount: 500 },
  { id: 4, title: "groceries", amount: 500 },
  { id: 5, title: "groceries", amount: 500 },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchene), async (c) => {
    const data = await c.req.valid("json");
    const expense = createPostSchene.parse(data);
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    console.log({ expense });
    c.status(201);
    return c.json(expense);
  })
  .get("/total-spent", async (c) => {
    const totalSpent = fakeExpenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);
    return c.json({ totalSpent });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.status(404);
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ deletedExpense });
  });
// .put
