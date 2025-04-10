import { test, expect } from '@playwright/test'

test('should navigate between pages', async ({ page }) => {
  // Start from the home page
  await page.goto('/')
  
  // Verify home page is loaded
  await expect(page.locator('h1')).toContainText('Serhii Bilous')
  
  // Navigate to Experience page
  await page.click('text=Experience')
  
  // Verify Experience page is loaded
  await expect(page).toHaveURL('/experience')
  await expect(page.locator('h1')).toContainText('Professional Experience')
  
  // Test dark mode toggle
  await page.click('button[aria-label="Toggle dark mode"]')
  
  // Verify dark mode is enabled
  await expect(page.locator('body')).toHaveClass(/dark/)
})