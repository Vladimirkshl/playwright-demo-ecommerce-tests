export enum Environment {
  DEV = 'dev',
  E2E = 'e2e',
  QA = 'qa',
}

export enum Portal {
  SOLOMONO = 'solomono',
  DEMO = 'demo',
}

export interface IPortalConfig {
  name: Portal;
  baseUrl: string;
  signinUrl: string;
  expectedLandingElement: string;
  testDir: string;
}

export function getPortalConfig(portal: Portal | null): IPortalConfig {
  const portalKey = portal || (process.env.PORTAL as Portal);
  return PORTAL_CONFIGS[portalKey];
}

// TODO: Enable after add new env 
/* const SOLOMONO_BASE_URL = `https://demo.solomono.net/${process.env.ENV || Environment.E2E}`; */

const SOLOMONO_BASE_URL = 'https://demo.solomono.net/';

const DEMO_BASE_URL = `https://demo.${process.env.ENV || Environment.E2E}.example.com`;

const PORTAL_CONFIGS: Record<Portal, IPortalConfig> = {
  [Portal.SOLOMONO]: {
    name: Portal.SOLOMONO,
    baseUrl: SOLOMONO_BASE_URL,
    signinUrl: `${SOLOMONO_BASE_URL}`,
    expectedLandingElement: '//h1[.="The fastest ecommerce platform"]',
    testDir: `./tests/${Portal.SOLOMONO}`,
  },
  [Portal.DEMO]: {
    name: Portal.DEMO,
    baseUrl: DEMO_BASE_URL,
    signinUrl: `${DEMO_BASE_URL}/sign-in`,
    expectedLandingElement: '//h1[.,="Demo title"]',
    testDir: `./tests/${Portal.DEMO}`,
  },
};
