import { test, expect, type Page } from '@playwright/test'

// Define page objects that will be reused across tests
const getPageElements = (page: Page) => ({
  nameInputField: page.locator('#name'),
  emailInputField: page.locator('#email'),
  textInputField: page.locator('#message'),
  submitButton: page.locator('form button[type="submit"]')
})

test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
})

// Test empty form submission
test('shows errors for empty form submission', async ({ page }) => {
  const { submitButton } = getPageElements(page)

  await submitButton.click()

  // All three fields should show errors
  await expect(page.locator('text=Name is required')).toBeVisible()
  await expect(page.locator('text=Email is required')).toBeVisible()
  await expect(page.locator('text=Message is required')).toBeVisible()
})

test('validates form fields correctly', async ({ page }) => {
  const { nameInputField, emailInputField, textInputField, submitButton } = getPageElements(page)
  
  // Filling the fields
  await nameInputField.fill('John Doe')
  await emailInputField.fill('john@doe')
  await textInputField.pressSequentially('Hi!')

  // Submit the form
  await submitButton.click()

  // Checking the errors
  await expect(emailInputField).toHaveClass(/border-red-500/)
  await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  await expect(textInputField).toHaveClass(/border-red-500/)
  await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible();

  // Filling the correct inputs
  await emailInputField.fill('john@doe.com')
  await textInputField.fill('Hi! I am John Doe. Checking your contact form')

  // Verifying no validation errors appear
  expect(await page.locator('.text-red-500').count()).toBe(0);

//   await submitButton.click()
//   await expect(page.locator('text=Message sent successfully!')).toBeVisible();


})