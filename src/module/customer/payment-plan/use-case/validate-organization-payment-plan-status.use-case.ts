import { Injectable } from '@nestjs/common';
import moment from 'moment';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/query/organization-payment-plan-enabled-paid-resource.query.repository.gateway';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import {
  EnabledPaidResourceItemDto,
  ValidateOrganizationPaymentPlanStatusResponseDto,
} from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';
import { OrganizationPaymentPlanNotFoundError } from '@module/customer/payment-plan/error/organization-payment-plan-not-found.error';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';

import type { GetOrganizationPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan.query.result';
import type { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';

@Injectable()
export class ValidateOrganizationPaymentPlanStatusUseCase implements ValidateOrganizationPaymentPlanStatusUseCaseGateway {
  protected readonly _type = ValidateOrganizationPaymentPlanStatusUseCase.name;

  public constructor(
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
    private readonly organizationPaymentPlanBankPaymentQueryRepository: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
    private readonly organizationPaymentPlanEnabledPaidResourceQueryRepository: OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway,
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

    const organizationPaymentPlanWithRelations =
      await this.organizationPaymentPlanQueryRepository.findOneByIdWithRelations(
        organizationPaymentPlan.id,
      );

    if (!organizationPaymentPlanWithRelations) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    const enabledPaidResources =
      await this.organizationPaymentPlanEnabledPaidResourceQueryRepository.findManyByOrganizationPaymentPlanId(
        organizationPaymentPlan.id,
      );

    const paymentRelations =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findManyOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
        organizationPaymentPlan.id,
      );

    const bankPaymentIds = paymentRelations.map((pr) => pr.bankPayment);
    const bankPayments =
      await this.bankPaymentQueryRepository.findManyBankPaymentByIds(
        bankPaymentIds,
      );

    const response = this.validateByCycle(
      organizationPaymentPlan,
      bankPayments,
      enabledPaidResources.map((resource) => {
        return EnabledPaidResourceItemDto.build({
          id: resource.paymentPlanPaidResource.id,
          resource: resource.paymentPlanPaidResource.resource,
          creditCost: resource.paymentPlanPaidResource.creditCost,
          description: resource.paymentPlanPaidResource.description,
        });
      }),
    );

    return response;
  }

  private validateByCycle(
    organizationPaymentPlan: GetOrganizationPaymentPlanQueryResult,
    bankPayments: GetBankPaymentQueryResult[],
    enabledPaidResources: EnabledPaidResourceItemDto[],
  ): ValidateOrganizationPaymentPlanStatusResponseDto {
    const cycleValue = organizationPaymentPlan.cycle as string;

    if (cycleValue === (PaymentPlanCycleEnum.MONTHLY_RECURRING as string)) {
      return this.validateMonthlyRecurring(
        organizationPaymentPlan,
        bankPayments,
        enabledPaidResources,
      );
    }

    if (cycleValue === (PaymentPlanCycleEnum.MONTHLY as string)) {
      return this.validateMonthly(
        organizationPaymentPlan,
        bankPayments,
        enabledPaidResources,
      );
    }

    if (cycleValue === (PaymentPlanCycleEnum.YEARLY as string)) {
      return this.validateYearly(
        organizationPaymentPlan,
        bankPayments,
        enabledPaidResources,
      );
    }

    throw new OrganizationPaymentPlanNotFoundError();
  }

  private validateMonthlyRecurring(
    organizationPaymentPlan: GetOrganizationPaymentPlanQueryResult,
    bankPayments: GetBankPaymentQueryResult[],
    enabledPaidResources: EnabledPaidResourceItemDto[],
  ): ValidateOrganizationPaymentPlanStatusResponseDto {
    const response = new ValidateOrganizationPaymentPlanStatusResponseDto();

    response.planName = organizationPaymentPlan.name;
    response.planDescription = organizationPaymentPlan.description;
    response.planPrice = organizationPaymentPlan.price;
    response.maxMemberCount = organizationPaymentPlan.maxMemberCount;
    response.monthlyCreditAmount = organizationPaymentPlan.monthlyCreditAmount;
    response.enabledPaidResources = enabledPaidResources;
    response.canceled = organizationPaymentPlan.canceled;
    response.paymentMethod = PaymentMethodEnum.CREDIT_CARD;

    const firstBankPayment = bankPayments.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    )[0];

    if (firstBankPayment?.paymentMethod !== undefined) {
      response.paymentMethod = firstBankPayment.paymentMethod;
    }

    if (firstBankPayment?.paymentDate) {
      response.accessionDate = firstBankPayment.paymentDate;
    }

    if (bankPayments.length === 0) {
      response.isActive = false;
      response.hasOverduePayments = false;
      response.overduePaymentsCount = 0;

      return response;
    }

    const now = moment().startOf('day').toDate();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const confirmedPayments = bankPayments.filter(
      (p) => p.status === PaymentStatusEnum.CONFIRMED,
    );

    const allPendingPayments = bankPayments.filter(
      (p) => p.status === PaymentStatusEnum.PENDING,
    );

    const pendingNonOverduePayments = allPendingPayments.filter(
      (p) => p.dueDate >= now,
    );

    const pendingOverduePayments = allPendingPayments.filter(
      (p) => p.dueDate < now,
    );

    const overduePayments = bankPayments.filter((p) => {
      if (p.status === PaymentStatusEnum.OVERDUE) {
        return true;
      }
      if (p.status === PaymentStatusEnum.PENDING && p.dueDate < now) {
        return true;
      }
      return false;
    });

    const sortedConfirmedPayments = confirmedPayments
      .filter((p) => p.paymentDate !== null)
      .sort((a, b) => {
        if (!a.paymentDate || !b.paymentDate) {
          return 0;
        }
        return b.paymentDate.getTime() - a.paymentDate.getTime();
      });

    const lastConfirmedPayment = sortedConfirmedPayments[0];

    if (lastConfirmedPayment?.paymentMethod !== undefined) {
      response.paymentMethod = lastConfirmedPayment.paymentMethod;
    }

    let isActive = false;

    if (bankPayments.length === 1 && allPendingPayments.length === 1) {
      isActive = true;
      response.accessionDate = bankPayments[0]?.createdAt ?? new Date();
    } else if (
      pendingNonOverduePayments.length === 1 &&
      pendingOverduePayments.length === 0 &&
      confirmedPayments.length === bankPayments.length - 1
    ) {
      isActive = true;
    } else if (
      pendingNonOverduePayments.length === 0 &&
      pendingOverduePayments.length === 0 &&
      lastConfirmedPayment?.paymentDate
    ) {
      isActive = lastConfirmedPayment.paymentDate >= oneMonthAgo;
    }

    response.isActive = isActive;
    response.hasOverduePayments = overduePayments.length > 0;
    response.overduePaymentsCount = overduePayments.length;

    if (lastConfirmedPayment) {
      response.lastPaymentStatus = lastConfirmedPayment.status;
      if (lastConfirmedPayment.paymentDate) {
        response.lastPaymentDate = lastConfirmedPayment.paymentDate;
      }
    }

    if (pendingNonOverduePayments.length > 0) {
      const nextPending = pendingNonOverduePayments.sort(
        (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
      )[0];
      if (nextPending) {
        response.nextDueDate = nextPending.dueDate;
      }
    } else if (lastConfirmedPayment?.dueDate) {
      response.nextDueDate = moment(lastConfirmedPayment.dueDate)
        .add(1, 'month')
        .toDate();
    }

    if (response.nextDueDate) {
      const nextDueDateNormalized = moment(response.nextDueDate).startOf('day');
      const todayNormalized = moment().startOf('day');

      if (nextDueDateNormalized.isSame(todayNormalized)) {
        response.nextDueDate = moment(response.nextDueDate)
          .add(1, 'month')
          .toDate();
      }
    }

    return response;
  }

  private validateMonthly(
    organizationPaymentPlan: GetOrganizationPaymentPlanQueryResult,
    bankPayments: GetBankPaymentQueryResult[],
    enabledPaidResources: EnabledPaidResourceItemDto[],
  ): ValidateOrganizationPaymentPlanStatusResponseDto {
    const response = new ValidateOrganizationPaymentPlanStatusResponseDto();

    response.planName = organizationPaymentPlan.name;
    response.planDescription = organizationPaymentPlan.description;
    response.planPrice = organizationPaymentPlan.price;
    response.maxMemberCount = organizationPaymentPlan.maxMemberCount;
    response.monthlyCreditAmount = organizationPaymentPlan.monthlyCreditAmount;
    response.enabledPaidResources = enabledPaidResources;
    response.canceled = organizationPaymentPlan.canceled;

    const firstBankPayment = bankPayments.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    )[0];

    if (firstBankPayment?.paymentDate) {
      response.accessionDate = firstBankPayment.paymentDate;
    }

    const confirmedPayments = bankPayments.filter(
      (p) => p.status === PaymentStatusEnum.CONFIRMED,
    );

    if (confirmedPayments.length === 0) {
      response.isActive = false;
      response.hasOverduePayments = false;
      response.overduePaymentsCount = 0;
      return response;
    }

    const firstPayment = confirmedPayments.sort((a, b) => {
      if (!a.paymentDate || !b.paymentDate) {
        return 0;
      }
      return a.paymentDate.getTime() - b.paymentDate.getTime();
    })[0];

    const lastValidPayment = confirmedPayments.sort((a, b) => {
      if (!a.paymentDate || !b.paymentDate) {
        return 0;
      }
      return b.paymentDate.getTime() - a.paymentDate.getTime();
    })[0];

    if (lastValidPayment?.paymentMethod !== undefined) {
      response.paymentMethod = lastValidPayment.paymentMethod;
    }

    const oneMonthAfterFirstPayment = new Date(
      firstPayment?.paymentDate ?? new Date(),
    );
    oneMonthAfterFirstPayment.setMonth(
      oneMonthAfterFirstPayment.getMonth() + 1,
    );

    const now = new Date();
    const isActive = now < oneMonthAfterFirstPayment;

    response.isActive = isActive;
    response.hasOverduePayments = false;
    response.overduePaymentsCount = 0;

    if (firstPayment) {
      response.lastPaymentStatus = firstPayment.status;
      if (firstPayment.paymentDate) {
        response.lastPaymentDate = firstPayment.paymentDate;
      }
    }

    return response;
  }

  private validateYearly(
    organizationPaymentPlan: GetOrganizationPaymentPlanQueryResult,
    bankPayments: GetBankPaymentQueryResult[],
    enabledPaidResources: EnabledPaidResourceItemDto[],
  ): ValidateOrganizationPaymentPlanStatusResponseDto {
    const response = new ValidateOrganizationPaymentPlanStatusResponseDto();

    response.planName = organizationPaymentPlan.name;
    response.planDescription = organizationPaymentPlan.description;
    response.planPrice = organizationPaymentPlan.price;
    response.maxMemberCount = organizationPaymentPlan.maxMemberCount;
    response.monthlyCreditAmount = organizationPaymentPlan.monthlyCreditAmount;
    response.enabledPaidResources = enabledPaidResources;
    response.canceled = organizationPaymentPlan.canceled;

    const firstBankPayment = bankPayments.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    )[0];

    if (firstBankPayment?.paymentDate) {
      response.accessionDate = firstBankPayment.paymentDate;
    }

    if (bankPayments.length === 0) {
      response.isActive = false;
      response.hasOverduePayments = false;
      response.overduePaymentsCount = 0;
      return response;
    }

    const now = new Date();

    const sortedPayments = [...bankPayments].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    const allPaymentsValid = sortedPayments.every((payment) => {
      if (payment.dueDate < now) {
        return payment.status === PaymentStatusEnum.CONFIRMED;
      }

      return true;
    });

    const confirmedPayments = bankPayments
      .filter((p) => p.status === PaymentStatusEnum.CONFIRMED)
      .sort((a, b) => {
        if (!a.paymentDate || !b.paymentDate) {
          return 0;
        }
        return a.paymentDate.getTime() - b.paymentDate.getTime();
      });

    const firstPayment = confirmedPayments[0];

    if (firstPayment?.paymentMethod !== undefined) {
      response.paymentMethod = firstPayment.paymentMethod;
    }

    let withinOneYear = false;
    if (firstPayment?.paymentDate) {
      const oneYearAfterFirstPayment = new Date(firstPayment.paymentDate);
      oneYearAfterFirstPayment.setFullYear(
        oneYearAfterFirstPayment.getFullYear() + 1,
      );
      withinOneYear = now < oneYearAfterFirstPayment;
    }

    response.isActive = allPaymentsValid && withinOneYear;
    response.hasOverduePayments = false;
    response.overduePaymentsCount = 0;

    if (confirmedPayments.length > 0) {
      const lastConfirmedPayment =
        confirmedPayments[confirmedPayments.length - 1];
      if (lastConfirmedPayment) {
        response.lastPaymentStatus = lastConfirmedPayment.status;
        if (lastConfirmedPayment.paymentDate) {
          response.lastPaymentDate = lastConfirmedPayment.paymentDate;
        }
      }
    }

    const pendingPayments = bankPayments.filter(
      (p) => p.status === PaymentStatusEnum.PENDING,
    );
    if (pendingPayments.length > 0) {
      const nextPending = pendingPayments.sort(
        (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
      )[0];
      if (nextPending) {
        response.nextDueDate = nextPending.dueDate;
      } else if (
        confirmedPayments[0]?.paymentDate &&
        organizationPaymentPlan.totalInstallments !== null &&
        bankPayments.length > organizationPaymentPlan.totalInstallments
      ) {
        response.nextDueDate = moment(confirmedPayments[0].paymentDate)
          .add(1, 'month')
          .toDate();
      }
    }

    return response;
  }
}
