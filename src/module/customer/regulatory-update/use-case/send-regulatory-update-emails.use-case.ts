import { Inject, Injectable, Logger } from '@nestjs/common';

import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
import { RegulatoryUpdateEmailPreferenceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/regulatory-update-email-preference.query.repository.gateway';
import { RegulatoryUpdateEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity';

@Injectable()
export class SendRegulatoryUpdateEmailsUseCase {
  protected readonly _type = SendRegulatoryUpdateEmailsUseCase.name;
  private readonly logger: Logger;

  public constructor(
    @Inject(RegulatoryUpdateEmailPreferenceQueryRepositoryGateway)
    private readonly emailPreferenceQueryRepository: RegulatoryUpdateEmailPreferenceQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepository: OrganizationQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
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
      const hasAccess = await this.customerHasRegulatoryUpdatesAccess(
        preference.customerId,
      );

      if (!hasAccess) {
        continue;
      }

      await this.sendEmailToCustomer(preference.customerEmail, updatesSummary);
    }

    this.logger.log(
      `Regulatory update emails sent to ${preferences.length} eligible customer(s).`,
    );
  }

  private async customerHasRegulatoryUpdatesAccess(
    customerId: CustomerId,
  ): Promise<boolean> {
    try {
      const organizations =
        await this.organizationQueryRepository.listAllOrganizationsByCustomerId(
          customerId,
        );

      for (const organization of organizations) {
        const planStatus =
          await this.validateOrganizationPaymentPlanStatusUseCase.execute(
            organization.id,
          );

        const isActive = planStatus.isActive;
        const hasFeature = planStatus.enabledPaidResources.some(
          (resource) =>
            resource.resource ===
            PaymentPlanPaidResourceTypeEnum.REGULATORY_UPDATES,
        );

        if (isActive && hasFeature) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
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
        `Failed to send regulatory update email to ${email}`,
        error,
      );
    }
  }
}
