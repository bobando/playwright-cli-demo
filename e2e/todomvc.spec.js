// @ts-check
import { test, expect } from '@playwright/test';
import { TodoMVCPage } from './pages/TodoMVCPage.js';

test('add and remove a todo item', async ({ page }) => {
  const todoText = 'Buy groceries';
  const todoMVC = new TodoMVCPage(page);

  await todoMVC.goto();
  await todoMVC.addTodo(todoText);

  const todoItem = todoMVC.todoItem(todoText);
  await expect(todoItem).toBeVisible();
  await expect(todoMVC.todoItems).toHaveCount(1);

  await todoMVC.removeTodo(todoText);

  await expect(todoItem).toBeHidden();
  await expect(todoMVC.todoItems).toHaveCount(0);
});
