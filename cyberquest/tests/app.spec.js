const { test, expect } = require('@playwright/test');

test.describe('CyberQuest - Pick Screen', () => {
  test('shows pick screen with 4 agents on load', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('pick-screen')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Planeta X: CyberQuest');
    await expect(page.getByTestId('agent-ania')).toBeVisible();
    await expect(page.getByTestId('agent-kuba')).toBeVisible();
    await expect(page.getByTestId('agent-ola')).toBeVisible();
    await expect(page.getByTestId('agent-max')).toBeVisible();
  });

  test('selecting an agent shows briefing then main app', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-ania').click();
    // Should show briefing/theory intro first
    await expect(page.locator('text=Tajny Agent Planety X')).toBeVisible();
    // Click start mission button
    await page.locator('button:has-text("Rozpocznij misję")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
    await expect(page.getByTestId('terminal')).toBeVisible();
  });
});

test.describe('CyberQuest - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-ania').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
  });

  test('shows lesson header and instruction', async ({ page }) => {
    await expect(page.getByTestId('instruction')).toBeVisible();
    await expect(page.getByTestId('instruction')).toContainText('whoami');
  });

  test('can change agent via nav button', async ({ page }) => {
    await page.getByTestId('change-agent').click();
    await expect(page.getByTestId('pick-screen')).toBeVisible();
  });

  test('progress bar starts at 0', async ({ page }) => {
    await expect(page.locator('.progress-text')).toContainText('0/');
  });

  test('step dots are visible in nav bar', async ({ page }) => {
    await expect(page.locator('.app-nav .step-dots')).toBeVisible();
    await expect(page.getByTestId('step-0')).toBeVisible();
    await expect(page.getByTestId('step-1')).toBeVisible();
  });
});

test.describe('CyberQuest - Terminal Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-ania').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
  });

  test('terminal shows short prompt ~$', async ({ page }) => {
    await expect(page.locator('.terminal .prompt').first()).toContainText('~$');
  });

  test('typing correct command shows output', async ({ page }) => {
    const input = page.getByTestId('terminal-input');
    await input.fill('whoami');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.ok')).toBeVisible();
    await expect(page.locator('.terminal .output.ok')).toContainText('ania');
  });

  test('typing wrong command shows error hint', async ({ page }) => {
    const input = page.getByTestId('terminal-input');
    await input.fill('wrong-command');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.err')).toBeVisible();
    await expect(page.locator('.terminal .output.err')).toContainText('Wpisz: whoami');
  });

  test('hint button auto-executes command', async ({ page }) => {
    await expect(page.getByTestId('hint-btn')).toBeVisible();
    await page.getByTestId('hint-btn').click();
    await expect(page.locator('.terminal .output.ok')).toBeVisible();
    await expect(page.locator('.terminal .output.ok')).toContainText('ania');
  });
});

test.describe('CyberQuest - Different Agent', () => {
  test('selecting Kuba agent shows correct prompt', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-kuba').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
    await expect(page.locator('.terminal .prompt').first()).toContainText('~$');
  });

  test('whoami output matches selected agent', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-kuba').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
    const input = page.getByTestId('terminal-input');
    await input.fill('whoami');
    await input.press('Enter');
    await expect(page.locator('.terminal .output.ok')).toContainText('kuba');
  });
});

test.describe('CyberQuest - Side Panels', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-ania').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
  });

  test('threat map is visible', async ({ page }) => {
    await expect(page.getByTestId('threat-map')).toBeVisible();
    await expect(page.getByTestId('threat-map')).toContainText('Trojan');
    await expect(page.getByTestId('threat-map')).toContainText('Phishing');
  });

  test('glossary is visible', async ({ page }) => {
    await expect(page.getByTestId('glossary')).toBeVisible();
    await expect(page.getByTestId('glossary')).toContainText('Słowniczek agenta');
    await expect(page.getByTestId('glossary')).toContainText('Firewall');
  });
});

test.describe('CyberQuest - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('pick screen works on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('pick-screen')).toBeVisible();
    await page.getByTestId('agent-ania').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
    await expect(page.getByTestId('app-main')).toBeVisible();
  });

  test('hamburger menu is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-ania').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
    await expect(page.getByTestId('menu-toggle')).toBeVisible();
  });

  test('sidebar opens on menu click', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('agent-ania').click();
    await page.locator('button:has-text("Rozpocznij misję")').click();
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).not.toBeVisible();
    await page.getByTestId('menu-toggle').click();
    await expect(sidebar).toBeVisible();
  });
});
