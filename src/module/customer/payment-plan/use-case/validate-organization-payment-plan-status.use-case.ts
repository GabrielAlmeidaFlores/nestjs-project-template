import { Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';
import { OrganizationPaymentPlanNotFoundError } from '@module/customer/payment-plan/error/organization-payment-plan-not-found.error';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';

import type { GetOrganizationPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan.query.result';
import type { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';

@Injectable()
export class ValidateOrganizationPaymentPlanStatusUseCase {
  protected readonly _type = ValidateOrganizationPaymentPlanStatusUseCase.name;

  public constructor(
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
    private readonly organizationPaymentPlanBankPaymentQueryRepository: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
  ) {}

  public async execute(
    organization: OrganizationId,
  ): Promise<ValidateOrganizationPaymentPlanStatusResponseDto> {
    const organizationPaymentPlans =
      await this.organizationPaymentPlanQueryRepository.findManyByOrganizationId(
        organization,
      );

    if (organizationPaymentPlans.length === 0) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    const organizationPaymentPlan = organizationPaymentPlans[0];

    if (!organizationPaymentPlan) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    const paymentRelations =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findManyOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
        organizationPaymentPlan.id,
      );

    const bankPaymentIds = paymentRelations.map((pr) => pr.bankPayment);
    const bankPayments =
      await this.bankPaymentQueryRepository.findManyBankPaymentByIds(
        bankPaymentIds,
      );

    return this.validateByCycle(organizationPaymentPlan, bankPayments);
  }

  private validateByCycle(
    organizationPaymentPlan: GetOrganizationPaymentPlanQueryResult,
    bankPayments: GetBankPaymentQueryResult[],
  ): ValidateOrganizationPaymentPlanStatusResponseDto {
    const cycleValue = organizationPaymentPlan.cycle as string;

    if (cycleValue === (PaymentPlanCycleEnum.MONTHLY_RECURRING as string)) {
      return this.validateMonthlyRecurring(
        organizationPaymentPlan,
        bankPayments,
      );
    }

    throw new OrganizationPaymentPlanNotFoundError();
  }

  private validateMonthlyRecurring(
    organizationPaymentPlan: GetOrganizationPaymentPlanQueryResult,
    bankPayments: GetBankPaymentQueryResult[],
  ): ValidateOrganizationPaymentPlanStatusResponseDto {
    const response = new ValidateOrganizationPaymentPlanStatusResponseDto();

    response.planName = organizationPaymentPlan.name;
    response.planDescription = organizationPaymentPlan.description;
    response.planPrice = organizationPaymentPlan.price;
    response.maxMemberCount = organizationPaymentPlan.maxMemberCount;
    response.monthlyCreditAmount = organizationPaymentPlan.monthlyCreditAmount;

    if (bankPayments.length === 0) {
      response.isActive = false;
      response.hasOverduePayments = false;
      response.overduePaymentsCount = 0;

      return response;
    }

    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const validStatuses = [
      PaymentStatusEnum.RECEIVED,
      PaymentStatusEnum.COMPLETED,
    ];
    const validPayments = bankPayments.filter((p) =>
      validStatuses.includes(p.status),
    );

    const sortedValidPayments = validPayments
      .filter((p) => p.paymentDate !== null)
      .sort((a, b) => {
        if (!a.paymentDate || !b.paymentDate) {
          return 0;
        }
        return b.paymentDate.getTime() - a.paymentDate.getTime();
      });

    const lastValidPayment = sortedValidPayments[0];

    let isActive = false;
    if (lastValidPayment?.paymentDate) {
      isActive = lastValidPayment.paymentDate >= oneMonthAgo;
    }

    const overduePayments = bankPayments.filter((p) => {
      if (p.status === PaymentStatusEnum.OVERDUE) {
        return true;
      }

      if (p.status === PaymentStatusEnum.PENDING && p.dueDate < now) {
        return true;
      }
      return false;
    });

    const pendingPayments = bankPayments
      .filter((p) => p.status === PaymentStatusEnum.PENDING && p.dueDate >= now)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    const nextPendingPayment = pendingPayments[0];

    response.isActive = isActive;
    response.hasOverduePayments = overduePayments.length > 0;
    response.overduePaymentsCount = overduePayments.length;

    if (lastValidPayment) {
      response.lastPaymentStatus = lastValidPayment.status;
      if (lastValidPayment.paymentDate) {
        response.lastPaymentDate = lastValidPayment.paymentDate;
      }
    }

    if (nextPendingPayment) {
      response.nextDueDate = nextPendingPayment.dueDate;
    }

    return response;
  }
}
