import { Inject, Injectable } from '@nestjs/common';

import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { CancelPaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/cancel-payment-plan.response.dto';
import { OrganizationPaymentPlanNotFoundError } from '@module/customer/payment-plan/error/organization-payment-plan-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CancelPaymentPlanUseCase {
  protected readonly _type = CancelPaymentPlanUseCase.name;

  public constructor(
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CancelPaymentPlanResponseDto> {
    const organizationId = organizationSessionData.organizationId.toString();

    const existingSubscriptions =
      await this.organizationPaymentPlanQueryRepository.findManyByOrganizationId(
        new OrganizationId(organizationId),
      );

    if (existingSubscriptions.length === 0) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    for (const subscription of existingSubscriptions) {
      await this.paymentGateway.cancelSubscription(subscription.bankExternalId);
    }

    return CancelPaymentPlanResponseDto.build({
      organizationPaymentPlanId: existingSubscriptions.map(
        (subscription) => subscription.id,
      ),
    });
  }
}
