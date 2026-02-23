import { Inject, Injectable } from '@nestjs/common';

import { CustomerTypeEnum } from '@module/admin/customer-management/dto/enum/customer-type.enum';
import { ListCustomersRequestDto } from '@module/admin/customer-management/dto/request/list-customers.request.dto';
import { CustomerItemResponseDto } from '@module/admin/customer-management/dto/response/customer-item.response.dto';
import { ListCustomersResponseDto } from '@module/admin/customer-management/dto/response/list-customers.response.dto';
import { DashboardSubscriptionStatusEnum } from '@module/admin/dashboard-metrics/dto/response/enum/dashboard-subscription-status.enum';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { ListCustomersWithFiltersInputModel } from '@module/customer/account/domain/repository/customer/query/model/input/list-customers-with-filters.input.model';
import { OrganizationPaymentPlanNotFoundError } from '@module/customer/payment-plan/error/organization-payment-plan-not-found.error';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import type { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';

interface CachedOrganizationDataInterface {
  paymentPlanName: string | null;
  paymentPlanPrice:
    | ValidateOrganizationPaymentPlanStatusResponseDto['planPrice']
    | null;
  paymentPlanCycle: PaymentPlanCycleEnum | null;
  subscriptionStatus: DashboardSubscriptionStatusEnum;
  maxMemberCount: number | null;
}

@Injectable()
export class ListCustomersUseCase {
  protected readonly _type = ListCustomersUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCaseGateway: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
  ) {}

  public async execute(
    dto: ListCustomersRequestDto,
  ): Promise<ListCustomersResponseDto> {
    const input = new ListCustomersWithFiltersInputModel({
      page: dto.page,
      limit: dto.limit,
      searchBy: dto.searchBy,
      type: dto.type,
      sortField: dto.sortField,
    });

    const paginatedResult =
      await this.customerQueryRepository.listCustomersWithFilters(input);

    const organizationDataCache = new Map<
      string,
      CachedOrganizationDataInterface
    >();

    const customers: CustomerItemResponseDto[] = [];

    for (const item of paginatedResult.resource) {
      const organizationData = await this.resolveOrganizationData(
        item.organizationId,
        organizationDataCache,
      );

      const customerType = this.determineCustomerType(
        item.isOrganizationOwner,
        item.organizationId,
        organizationData.maxMemberCount,
      );

      const registeredTimeInDays = this.calculateDaysSinceDate(
        item.customerCreatedAt,
      );

      customers.push(
        CustomerItemResponseDto.build({
          customerId: item.customerId,
          customerName: item.customerName,
          customerPhoneNumber: item.customerPhoneNumber,
          customerEmail: item.customerEmail,
          customerDocument: item.customerDocument,
          customerCreatedAt: item.customerCreatedAt,
          ...(item.customerDeletedAt !== null && {
            customerDeletedAt: item.customerDeletedAt,
          }),
          customerIsActive: item.customerIsActive,
          customerRegisteredTimeInDays: registeredTimeInDays,
          customerType,
          ...(item.organizationName !== null && {
            organizationName: item.organizationName,
          }),
          ...(organizationData.paymentPlanName !== null && {
            currentPaymentPlanName: organizationData.paymentPlanName,
          }),
          ...(organizationData.paymentPlanPrice !== null && {
            currentPaymentPlanValue: organizationData.paymentPlanPrice,
          }),
          ...(organizationData.paymentPlanCycle !== null && {
            currentPaymentPlanCycle: organizationData.paymentPlanCycle,
          }),
          hasActiveSubscription:
            organizationData.subscriptionStatus ===
            DashboardSubscriptionStatusEnum.ACTIVE,
        }),
      );
    }

    return ListCustomersResponseDto.build({
      page: paginatedResult.page,
      limit: paginatedResult.limit,
      totalItems: paginatedResult.totalItems,
      totalPages: paginatedResult.totalPages,
      amountItemsCurrentPage: paginatedResult.amountItemsCurrentPage,
      resource: customers,
    });
  }

  private determineCustomerType(
    isOrganizationOwner: boolean,
    organizationId: OrganizationId | null,
    maxMemberCount: number | null,
  ): CustomerTypeEnum {
    if (organizationId === null) {
      return CustomerTypeEnum.INDIVIDUAL;
    }

    if (!isOrganizationOwner) {
      return CustomerTypeEnum.COLLABORATOR;
    }

    if (maxMemberCount === null || maxMemberCount === 1) {
      return CustomerTypeEnum.INDIVIDUAL;
    }

    return CustomerTypeEnum.ORGANIZATION;
  }

  private async resolveOrganizationData(
    organizationId: OrganizationId | null,
    cache: Map<string, CachedOrganizationDataInterface>,
  ): Promise<CachedOrganizationDataInterface> {
    if (!organizationId) {
      return {
        paymentPlanName: null,
        paymentPlanPrice: null,
        paymentPlanCycle: null,
        subscriptionStatus: DashboardSubscriptionStatusEnum.INACTIVE,
        maxMemberCount: null,
      };
    }

    const organizationIdValue = organizationId.toString();
    const cached = cache.get(organizationIdValue);

    if (cached) {
      return cached;
    }

    let statusData: ValidateOrganizationPaymentPlanStatusResponseDto | null =
      null;

    try {
      statusData =
        await this.validateOrganizationPaymentPlanStatusUseCaseGateway.execute(
          organizationId,
        );
    } catch (error) {
      if (!(error instanceof OrganizationPaymentPlanNotFoundError)) {
        throw error;
      }
    }

    const organizationData: CachedOrganizationDataInterface = {
      paymentPlanName: statusData?.planName ?? null,
      paymentPlanPrice: statusData?.planPrice ?? null,
      paymentPlanCycle: statusData?.paymentPlanCycle ?? null,
      subscriptionStatus:
        statusData?.isActive === true
          ? DashboardSubscriptionStatusEnum.ACTIVE
          : DashboardSubscriptionStatusEnum.INACTIVE,
      maxMemberCount: statusData?.maxMemberCount ?? null,
    };

    cache.set(organizationIdValue, organizationData);

    return organizationData;
  }

  private calculateDaysSinceDate(date: Date): number {
    const millisecondsPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const millisecondsPerDay =
      millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay;

    return Math.floor((Date.now() - date.getTime()) / millisecondsPerDay);
  }
}
