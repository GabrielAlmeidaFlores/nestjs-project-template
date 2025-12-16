import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { GetOrganizationCreditUsageQueryResult } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/result/get-organization-credit-usage.query.result';
import type { OrganizationCreditUsageId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/value-object/organization-credit-usage-id/organization-credit-usage-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class OrganizationCreditUsageQueryRepositoryGateway {
  public abstract listOrganizationCreditUsage(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationCreditUsageQueryResult>>;

  public abstract findOneOrganizationCreditUsageByIdOrFail(
    id: OrganizationCreditUsageId,
    err: Constructor<NotFoundError>,
  ): Promise<GetOrganizationCreditUsageQueryResult>;

  public abstract findManyOrganizationCreditUsageByPaymentPlanPaidResourceId(
    paymentPlanPaidResourceId: PaymentPlanPaidResourceId,
  ): Promise<GetOrganizationCreditUsageQueryResult[]>;

  public abstract findManyOrganizationCreditUsageByCreatedBy(
    createdBy: OrganizationMemberId,
  ): Promise<GetOrganizationCreditUsageQueryResult[]>;
}
