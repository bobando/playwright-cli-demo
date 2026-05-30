// @ts-check
import { test, expect } from '@playwright/test';

const TODO_URL = 'https://demo.playwright.dev/todomvc/';

test('add and remove a todo item', async ({ page }) => {
  const todoText = 'Buy groceries';

  await page.goto(TODO_URL);

  const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
  await newTodo.fill(todoText);
  await newTodo.press('Enter');

  const todoItem = page.locator('.todo-list li', { hasText: todoText });
  await expect(todoItem).toBeVisible();
  await expect(page.locator('.todo-list li')).toHaveCount(1);

  await todoItem.hover();
  await todoItem.locator('.destroy').click();

  await expect(todoItem).toBeHidden();
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
