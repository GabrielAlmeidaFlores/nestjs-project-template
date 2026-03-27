import { Inject, Injectable, Logger } from '@nestjs/common';

import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { ListRegulatoryUpdatesQueryParam } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/param/list-regulatory-updates.query.param';
import { RegulatoryUpdateQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/regulatory-update.query.repository.gateway';
import { RegulatoryUpdateEmailPreferenceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/regulatory-update-email-preference.query.repository.gateway';

@Injectable()
export class SendRegulatoryUpdateEmailsUseCase {
  protected readonly _type = SendRegulatoryUpdateEmailsUseCase.name;
  private readonly logger: Logger;
  private readonly emailNotificationLookbackDays: number;
  private readonly recentUpdatesEmailQueryLimit: number;

  public constructor(
    @Inject(RegulatoryUpdateEmailPreferenceQueryRepositoryGateway)
    private readonly emailPreferenceQueryRepository: RegulatoryUpdateEmailPreferenceQueryRepositoryGateway,
    @Inject(RegulatoryUpdateQueryRepositoryGateway)
    private readonly regulatoryUpdateQueryRepository: RegulatoryUpdateQueryRepositoryGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
  ) {
    this.logger = new Logger(SendRegulatoryUpdateEmailsUseCase.name);
    this.emailNotificationLookbackDays = 7;
    this.recentUpdatesEmailQueryLimit = 10;
  }

  public async execute(): Promise<void> {
    const preferences =
      await this.emailPreferenceQueryRepository.findAllWithEmailEnabled();

    if (preferences.length === 0) {
      return;
    }

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - this.emailNotificationLookbackDays);

    const recentUpdates =
      await this.regulatoryUpdateQueryRepository.listRegulatoryUpdates(
        new ListRegulatoryUpdatesQueryParam({
          page: 1,
          limit: this.recentUpdatesEmailQueryLimit,
          sortField: '-publishedAt',
          dateFrom,
          dateTo: new Date(),
        }),
      );

    if (recentUpdates.resource.length === 0) {
      return;
    }

    const updatesSummary = recentUpdates.resource
      .map((u: { title: string }) => `• ${u.title}`)
      .join('\n');

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
