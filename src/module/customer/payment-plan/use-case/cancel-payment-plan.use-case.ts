import { Inject, Injectable } from '@nestjs/common';

import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
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

    const existingPaymentPlans =
      await this.organizationPaymentPlanQueryRepository.findManyByOrganizationId(
        new OrganizationId(organizationId),
      );

    if (existingPaymentPlans.length === 0) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    for (const subscription of existingPaymentPlans) {
      if (subscription.cycle === PaymentPlanCycleEnum.MONTHLY_RECURRING) {
        await this.paymentGateway.cancelSubscription(
          subscription.bankExternalId,
        );
      }
    }

    return CancelPaymentPlanResponseDto.build({
      organizationPaymentPlanId: existingPaymentPlans.map(
        (subscription) => subscription.id,
      ),
    });
  }
}
