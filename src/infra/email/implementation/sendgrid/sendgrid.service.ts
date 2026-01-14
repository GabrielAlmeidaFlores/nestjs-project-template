import { readFileSync } from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.iput.model';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

@Injectable()
export class SendGridService implements EmailGateway {
  protected readonly _type = SendGridService.name;

  public constructor() {
    sgMail.setApiKey(EmailApplicationVariable.EMAIL_SEND_GRID_KEY);
  }

  public async sendHTMLEmail(props: SendHTMLEmailInputModel): Promise<void> {
    let emailTemplate = this.getEmailTemplate(props.emailTemplateName);

    const emailTemplateParametersCopy: Record<string, string> = {
      ...props.emailTemplateParameters,
      currentYear: new Date().getFullYear().toString(),
    };

    Object.keys(emailTemplateParametersCopy).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      const value = emailTemplateParametersCopy[key];

      if (value !== undefined) {
        emailTemplate = emailTemplate.replace(regex, value);
      }
    });

    await sgMail.send({
      to: props.to,
      from: EmailApplicationVariable.EMAIL_SENDER,
      subject: props.subject,
      html: emailTemplate,
    });
  }

  private getEmailTemplate(emailTemplateName: string): string {
    const currentWorkingDir = process.cwd();

    const emailTemplateAbsolutePath = join(
      currentWorkingDir,
      EmailApplicationVariable.EMAIL_TEMPLATE_DIR_RELATIVE_PATH,
      emailTemplateName,
    );

    const emailTemplate = readFileSync(emailTemplateAbsolutePath, 'utf-8');

    return emailTemplate;
  }
}
