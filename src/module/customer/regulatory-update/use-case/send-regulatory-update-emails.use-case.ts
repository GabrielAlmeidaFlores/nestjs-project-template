import { Inject, Injectable, Logger } from '@nestjs/common';

import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { RegulatoryUpdateEmailPreferenceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/regulatory-update-email-preference.query.repository.gateway';
import { RegulatoryUpdateEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity';

@Injectable()
export class SendRegulatoryUpdateEmailsUseCase {
  protected readonly _type = SendRegulatoryUpdateEmailsUseCase.name;
  private readonly logger: Logger;

  public constructor(
    @Inject(RegulatoryUpdateEmailPreferenceQueryRepositoryGateway)
    private readonly emailPreferenceQueryRepository: RegulatoryUpdateEmailPreferenceQueryRepositoryGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
  ) {
    this.logger = new Logger(SendRegulatoryUpdateEmailsUseCase.name);
  }

  public async execute(newUpdates: RegulatoryUpdateEntity[]): Promise<void> {
    if (newUpdates.length === 0) {
      return;
    }

    const preferences =
      await this.emailPreferenceQueryRepository.findAllWithEmailEnabled();

    if (preferences.length === 0) {
      return;
    }

    const updatesSummary = newUpdates.map((u) => `<li>${u.title}</li>`).join('');

    for (const preference of preferences) {
      await this.sendEmailToCustomer(preference.customerEmail, updatesSummary);
    }

    this.logger.log(
      `E-mails de atualizações normativas enviados para ${preferences.length} cliente(s).`,
    );
  }

  private async sendEmailToCustomer(
    email: string,
    updatesSummary: string,
  ): Promise<void> {
    try {
      await this.emailGateway.sendHTMLEmail(
        SendHTMLEmailInputModel.build({
          to: email,
          subject: 'Novas Atualizações Normativas Previdenciárias',
          emailTemplateName: 'regulatory-update-notification.html',
          emailTemplateParameters: {
            updatesSummary,
          },
        }),
      );
    } catch (error) {
      this.logger.error(
        `Falha ao enviar e-mail de atualização normativa para ${email}`,
        error,
      );
    }
  }
}
