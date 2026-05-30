// @ts-check

export class TodoMVCPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.url = 'https://demo.playwright.dev/todomvc/';
    this.newTodoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
    this.todoItems = page.locator('.todo-list li');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * @param {string} text
   */
  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * @param {string} text
   */
  todoItem(text) {
    return this.page.locator('.todo-list li', { hasText: text });
  }

  /**
   * @param {string} text
   */
  async removeTodo(text) {
    const item = this.todoItem(text);
    await item.hover();
    await item.locator('.destroy').click();
  }
}
