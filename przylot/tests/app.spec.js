const { test, expect } = require('@playwright/test');

test.describe('Szkoła Terminala - Pick Screen', () => {
  test('shows pick screen with 4 cars on load', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('pick-screen')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Szkoła Terminala');
    await expect(page.getByTestId('car-ania')).toBeVisible();
    await expect(page.getByTestId('car-kuba')).toBeVisible();
    await expect(page.getByTestId('car-ola')).toBeVisible();
    await expect(page.getByTestId('car-max')).toBeVisible();
  });

  test('selecting a car shows theory intro then main app', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ania').click();
    // Theory intro appears first
    await page.locator('button:has-text("Ruszamy")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
    await expect(page.getByTestId('terminal')).toBeVisible();
  });
});

test.describe('Szkoła Terminala - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ania').click();
    await page.locator('button:has-text("Ruszamy")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
  });

  test('shows lesson header and instruction', async ({ page }) => {
    await expect(page.getByTestId('instruction')).toBeVisible();
    await expect(page.getByTestId('instruction')).toContainText('hostname');
  });

  test('can change car via nav button', async ({ page }) => {
    await page.getByTestId('change-car').click();
    await expect(page.getByTestId('pick-screen')).toBeVisible();
  });

  test('progress bar starts at 0', async ({ page }) => {
    await expect(page.locator('.progress-text')).toContainText('0/');
  });

  test('step dots are visible in nav bar', async ({ page }) => {
    await expect(page.locator('.app-nav .step-dots')).toBeVisible();
    await expect(page.getByTestId('step-0')).toBeVisible();
    await expect(page.getByTestId('step-1')).toBeVisible();
    await expect(page.getByTestId('step-2')).toBeVisible();
  });
});

test.describe('Szkoła Terminala - Terminal Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ania').click();
    await page.locator('button:has-text("Ruszamy")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
  });

  test('terminal shows short prompt ~$', async ({ page }) => {
    await expect(page.locator('.terminal .prompt').first()).toContainText('~$');
  });

  test('typing correct command shows output and advances step', async ({ page }) => {
    const input = page.getByTestId('terminal-input');
    await input.fill('hostname');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.ok')).toBeVisible();
    await expect(page.locator('.terminal .output.ok')).toContainText('auto-ani');
    // after success, the app auto-advances to step 2 (hostname -I)
    await expect(page.getByTestId('instruction')).toContainText('hostname -I', { timeout: 5000 });
  });

  test('typing wrong command shows error hint', async ({ page }) => {
    const input = page.getByTestId('terminal-input');
    await input.fill('wrong-command');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.err')).toBeVisible();
    await expect(page.locator('.terminal .output.err')).toContainText('Wpisz: hostname');
  });

  test('hint button auto-executes command', async ({ page }) => {
    await expect(page.getByTestId('hint-btn')).toBeVisible();
    await page.getByTestId('hint-btn').click();
    await expect(page.locator('.terminal .output.ok')).toBeVisible();
    await expect(page.locator('.terminal .output.ok')).toContainText('auto-ani');
  });

  test('completing all steps in a layer shows celebration', async ({ page }) => {
    const input = page.getByTestId('terminal-input');

    // Step 1: hostname
    await input.fill('hostname');
    await input.press('Enter');
    await page.waitForTimeout(600);

    // Step 2: hostname -I
    await input.fill('hostname -I');
    await input.press('Enter');
    await page.waitForTimeout(600);

    // Step 3: whoami
    await input.fill('whoami');
    await input.press('Enter');

    // Celebration should appear
    await expect(page.getByTestId('celebrate')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('celebrate')).toContainText('Brawo');
  });

  test('next layer button works after completing a layer', async ({ page }) => {
    const input = page.getByTestId('terminal-input');

    await input.fill('hostname');
    await input.press('Enter');
    await page.waitForTimeout(600);

    await input.fill('hostname -I');
    await input.press('Enter');
    await page.waitForTimeout(600);

    await input.fill('whoami');
    await input.press('Enter');

    await expect(page.getByTestId('next-layer')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('next-layer').click();

    // Should now be on the network lesson
    await expect(page.getByTestId('instruction')).toContainText('arp');
  });
});

test.describe('Szkoła Terminala - Different Car', () => {
  test('selecting Kuba car shows correct prompt', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-kuba').click();
    await page.locator('button:has-text("Ruszamy")').click();
    await expect(page.locator('.terminal .prompt').first()).toContainText('~$');
  });

  test('hostname output matches selected car', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-kuba').click();
    await page.locator('button:has-text("Ruszamy")').click();
    const input = page.getByTestId('terminal-input');
    await input.fill('hostname');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.ok')).toContainText('auto-kuby');
  });
});

test.describe('Szkoła Terminala - Side Panels', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ania').click();
    await page.locator('button:has-text("Ruszamy")').click();
  });

  test('city map is visible with all cars', async ({ page }) => {
    await expect(page.getByTestId('city-map')).toBeVisible();
    await expect(page.getByTestId('city-map')).toContainText('auto-ani');
    await expect(page.getByTestId('city-map')).toContainText('auto-kuby');
  });

  test('glossary is visible', async ({ page }) => {
    await expect(page.getByTestId('glossary')).toBeVisible();
    await expect(page.getByTestId('glossary')).toContainText('Słowniczek');
  });
});

test.describe('Szkoła Terminala - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('pick screen works on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('pick-screen')).toBeVisible();
    await page.getByTestId('car-ania').click();
    await page.locator('button:has-text("Ruszamy")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
  });

  test('hamburger menu is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ania').click();
    await page.locator('button:has-text("Ruszamy")').click();
    await expect(page.getByTestId('menu-toggle')).toBeVisible();
  });

  test('sidebar opens on menu click', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ania').click();
    await page.locator('button:has-text("Ruszamy")').click();
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).not.toBeVisible();
    await page.getByTestId('menu-toggle').click();
    await expect(sidebar).toBeVisible();
  });

  test('terminal input works on mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ania').click();
    await page.locator('button:has-text("Ruszamy")').click();
    const input = page.getByTestId('terminal-input');
    await input.fill('hostname');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.ok')).toContainText('auto-ani');
  });
});

test.describe('Szkoła Terminala - Lesson Content Accuracy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('car-ola').click();
    await page.locator('button:has-text("Ruszamy")').click();
  });

  test('whoami returns selected user', async ({ page }) => {
    // Navigate to step 3 (whoami)
    await page.getByTestId('step-2').click();
    const input = page.getByTestId('terminal-input');
    await input.fill('whoami');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.ok')).toContainText('ola');
  });

  test('hostname -I returns correct IP for selected car', async ({ page }) => {
    await page.getByTestId('step-1').click();
    const input = page.getByTestId('terminal-input');
    await input.fill('hostname -I');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.ok')).toContainText('192.168.1.12');
  });
});
