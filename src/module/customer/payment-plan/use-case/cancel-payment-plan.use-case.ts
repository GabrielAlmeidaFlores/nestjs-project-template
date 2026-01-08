import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
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
    @Inject(OrganizationPaymentPlanCommandRepositoryGateway)
    private readonly organizationPaymentPlanCommandRepository: OrganizationPaymentPlanCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CancelPaymentPlanResponseDto> {
    const organizationId = organizationSessionData.organizationId.toString();

    const existingOrganizationPaymentPlans =
      await this.organizationPaymentPlanQueryRepository.findManyByOrganizationIdWithRelations(
        new OrganizationId(organizationId),
      );

    if (existingOrganizationPaymentPlans.length === 0) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    const updateTransactions = [];

    for (const organizationPaymentPlan of existingOrganizationPaymentPlans) {
      if (
        organizationPaymentPlan.cycle === PaymentPlanCycleEnum.MONTHLY_RECURRING
      ) {
        await this.paymentGateway.cancelSubscription(
          organizationPaymentPlan.bankExternalId,
        );
      }

      const updatedPaymentPlan = new OrganizationPaymentPlanEntity({
        id: organizationPaymentPlan.id,
        name: organizationPaymentPlan.name,
        description: organizationPaymentPlan.description,
        price: organizationPaymentPlan.price,
        maxMemberCount: organizationPaymentPlan.maxMemberCount,
        monthlyCreditAmount: organizationPaymentPlan.monthlyCreditAmount,
        bankExternalId: organizationPaymentPlan.bankExternalId,
        cycle: organizationPaymentPlan.cycle,
        totalInstallments: organizationPaymentPlan.totalInstallments,
        organization: organizationPaymentPlan.organization.id,
        paymentPlan: organizationPaymentPlan.paymentPlan.id,
        createdAt: organizationPaymentPlan.createdAt,
        updatedAt: new Date(),
        canceled: true,
      });

      const updateTransaction =
        this.organizationPaymentPlanCommandRepository.updateOrganizationPaymentPlan(
          updatedPaymentPlan,
        );

      updateTransactions.push(updateTransaction);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(updateTransactions);
    await transaction.commit();

    return CancelPaymentPlanResponseDto.build({
      organizationPaymentPlanId: existingOrganizationPaymentPlans.map(
        (queryResult) => queryResult.id,
      ),
    });
  }
}
