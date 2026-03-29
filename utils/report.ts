import { attachment, logStep, step } from 'allure-js-commons';
import playwrightConfig from '@playwrightConfig';
import { ContentType } from '@constants/common';

const SUBSTEP_PREFIX = '|- ';
const ATTACHEMENT_PREFIX = `${SUBSTEP_PREFIX}Attachment > `;

export class Report {
  private static stdout(message: string) {
    console.log(message);
  }
  
  private static stdoutAttachment(attachmentType: string, message: string) {
    this.stdout(`${ATTACHEMENT_PREFIX}${attachmentType} | ${message}`);
  }

  private static stdoutSubStep(message: string) {
    this.stdout(`${SUBSTEP_PREFIX}${message}`);
  }
  
  static async subStep<T>(name: string, body: () => Promise<T>): Promise<T> {
    this.stdoutSubStep(name);
    return step(name, body);
  }

  static async logStep(name: string, stdout = true) {
    if (stdout) this.stdoutSubStep(name);
    logStep(name);
  }

  static attachUri(uri: string) {
    this.attachUrl(playwrightConfig.use?.baseURL + uri);
  }

  static attachUrl(url: string) {
    this.stdoutAttachment('URL', url);
    attachment('Attachment | URL', url, {
      contentType: ContentType.TEXT_URI_LIST,
    });
  }

}
