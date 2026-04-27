import { getPortalConfig, IPortalConfig, Portal } from '@constants/env';
import { expect, Page } from '@playwright/test';

import path from 'path';

export class AuthUtils {
  private static portalConfig: IPortalConfig;
  private static readonly signInButton = '//div[contains(text(), "Log into your Account")]';
  private static readonly emailInput = '//input[@placeholder="Email"]';
  private static readonly passwordInput = '//input[@type="password"]';
  private static readonly logInButton = '//button[@type="submit"][@name="submit_enter"]';

  static async authenticate(page: Page, portal: Portal): Promise<void> {
    this.portalConfig = getPortalConfig(portal);
    switch (portal) {
      case Portal.SOLOMONO:
        await this.authenticateSolomono(page);
        break;
      case Portal.ADMIN: 
        await this.authenticateAdminPanel(page);
        break;
      default:
        throw new Error(`Unsupported portal: ${portal}`);
    }

    await page.context().storageState({ path: this.getAuthFilePath(portal) });
  }

  static getAuthFilePath(portal: Portal): string {
    return path.resolve(process.cwd(), '.auth', `${process.env.ENV}-${portal}.json`);
  }

  private static async authenticateSolomono(page: Page): Promise<void> {
    await page.goto(this.portalConfig.signinUrl);
    await page.locator(this.signInButton).click();
    await page.locator(this.emailInput).fill(process.env.SOLOMONO_AUTH_EMAIL);
    await page.locator(this.passwordInput).fill(process.env.SOLOMONO_AUTH_PASSWORD);
    await page.locator(this.logInButton).click();

    await page.waitForURL(this.portalConfig.baseUrl);
    await expect(page.locator(this.portalConfig.expectedLandingElement)).toBeVisible();
  }

  private static async authenticateAdminPanel(page: Page): Promise<void> {
    await page.goto(this.portalConfig.signinUrl);
    // Steps to pass the authentication for the admin panel
  }

}
