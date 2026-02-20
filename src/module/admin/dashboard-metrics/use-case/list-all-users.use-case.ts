import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { DashboardSubscriptionStatusEnum } from '@module/admin/dashboard-metrics/dto/response/enum/dashboard-subscription-status.enum';
import { DashboardUserTypeEnum } from '@module/admin/dashboard-metrics/dto/response/enum/dashboard-user-type.enum';
import { ListUsersResponseDto } from '@module/admin/dashboard-metrics/dto/response/list-users.response.dto';
import { UserItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/user-item.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { GetOrganizationMemberWithOrganizationRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-organization-relation.query.result';
import { OrganizationPaymentPlanNotFoundError } from '@module/customer/payment-plan/error/organization-payment-plan-not-found.error';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';

import type { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';

interface ExpandedUserInterface {
  customer: GetCustomerWithAuthIdentityRelationQueryResult;
  userType: DashboardUserTypeEnum;
  organizationId: OrganizationId | null;
}

interface CachedOrganizationDataInterface {
  organizationName: string | null;
  paymentPlanName: string | null;
  paymentPlanPrice:
    | ValidateOrganizationPaymentPlanStatusResponseDto['planPrice']
    | null;
  subscriptionStatus: DashboardSubscriptionStatusEnum;
}

@Injectable()
export class ListAllUsersUseCase {
  protected readonly _type = ListAllUsersUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepository: OrganizationQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCaseGateway: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListUsersResponseDto> {
    const allCustomers =
      await this.customerQueryRepository.listAllCustomersWithAuthIdentity();

    const expandedUsers = this.expandUsers(allCustomers);

    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    const paginatedExpandedUsers = expandedUsers.slice(start, end);

    const organizationDataCache = new Map<
      string,
      CachedOrganizationDataInterface
    >();

    const users: UserItemResponseDto[] = [];

    for (const item of paginatedExpandedUsers) {
      const organizationData = await this.resolveOrganizationData(
        item.organizationId,
        organizationDataCache,
      );

      users.push(
        UserItemResponseDto.build({
          customerId: item.customer.id,
          name: item.customer.name,
          email: item.customer.authIdentity.email,
          federalDocument: item.customer.authIdentity.federalDocument,
          phoneNumber: item.customer.phoneNumber,
          createdAt: item.customer.createdAt,
          registeredTimeInDays: this.calculateRegisteredTimeInDays(
            item.customer.createdAt,
          ),
          userType: item.userType,
          organizationName: organizationData.organizationName,
          paymentPlanName: organizationData.paymentPlanName,
          paymentPlanPrice: organizationData.paymentPlanPrice,
          subscriptionStatus: organizationData.subscriptionStatus,
        }),
      );
    }

    const listDataOutput = new ListDataOutputModel({
      page: pagination.page,
      limit: pagination.limit,
      totalItems: expandedUsers.length,
      resource: users,
    });

    return ListUsersResponseDto.build({
      page: listDataOutput.page,
      limit: listDataOutput.limit,
      totalItems: listDataOutput.totalItems,
      totalPages: listDataOutput.totalPages,
      amountItemsCurrentPage: listDataOutput.amountItemsCurrentPage,
      resource: listDataOutput.resource,
    });
  }

  private expandUsers(
    customers: GetCustomerWithAuthIdentityRelationQueryResult[],
  ): ExpandedUserInterface[] {
    const expandedUsers: ExpandedUserInterface[] = [];

    for (const customer of customers) {
      const organizationMember = customer.organizationMember ?? [];

      if (organizationMember.length === 0) {
        expandedUsers.push({
          customer,
          userType: DashboardUserTypeEnum.INDIVIDUAL,
          organizationId: null,
        });

        continue;
      }

      for (const member of organizationMember) {
        expandedUsers.push({
          customer,
          userType: this.resolveUserType(member),
          organizationId: member.organizationId,
        });
      }
    }

    return expandedUsers;
  }

  private resolveUserType(
    organizationMember: GetOrganizationMemberWithOrganizationRelationQueryResult,
  ): DashboardUserTypeEnum {
    if (organizationMember.owner) {
      return DashboardUserTypeEnum.ORGANIZATION;
    }

    return DashboardUserTypeEnum.COLLABORATOR;
  }

  private async resolveOrganizationData(
    organizationId: OrganizationId | null,
    cache: Map<string, CachedOrganizationDataInterface>,
  ): Promise<CachedOrganizationDataInterface> {
    if (!organizationId) {
      return {
        organizationName: null,
        paymentPlanName: null,
        paymentPlanPrice: null,
        subscriptionStatus: DashboardSubscriptionStatusEnum.INACTIVE,
      };
    }

    const organizationIdValue = organizationId.toString();
    const cached = cache.get(organizationIdValue);

    if (cached) {
      return cached;
    }

    const organization =
      await this.organizationQueryRepository.findOneByOrganizationId(
        organizationId,
      );

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
      organizationName: organization?.name ?? null,
      paymentPlanName: statusData?.planName ?? null,
      paymentPlanPrice: statusData?.planPrice ?? null,
      subscriptionStatus:
        statusData?.isActive === true
          ? DashboardSubscriptionStatusEnum.ACTIVE
          : DashboardSubscriptionStatusEnum.INACTIVE,
    };

    cache.set(organizationIdValue, organizationData);

    return organizationData;
  }

  private calculateRegisteredTimeInDays(createdAt: Date): number {
    const HOURS = 24;
    const SECONDS_MINUTES = 60;
    const MILLISECONDS = 1000;
    const MILLISECONDS_PER_DAY =
      HOURS * SECONDS_MINUTES * SECONDS_MINUTES * MILLISECONDS;

    const today = new Date();
    const normalizedToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const normalizedCreatedAt = new Date(
      createdAt.getFullYear(),
      createdAt.getMonth(),
      createdAt.getDate(),
    );

    const diffInMilliseconds =
      normalizedToday.getTime() - normalizedCreatedAt.getTime();

    if (diffInMilliseconds <= 0) {
      return 0;
    }

    return Math.floor(diffInMilliseconds / MILLISECONDS_PER_DAY);
  }
}
