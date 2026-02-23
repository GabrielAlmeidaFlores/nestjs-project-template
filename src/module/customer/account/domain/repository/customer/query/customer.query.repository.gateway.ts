import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { NotFoundError } from '@core/error/not-found.error';
import type { ListCustomersWithFiltersInputModel } from '@module/customer/account/domain/repository/customer/query/model/input/list-customers-with-filters.input.model';
import type { UsersStatisticsMonthlyQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-statistics.query.result';
import type { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import type { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import type { GetCustomerWithOrganizationForListQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-organization-for-list.query.result';
import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetCustomerQueryResult | null>;

  public abstract findOneByAuthIdentityIdOrFail(
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCustomerQueryResult>;

  public abstract findOneByEmail(
    email: Email,
  ): Promise<GetCustomerQueryResult | null>;

  public abstract findOneByFederalDocument(
    federalDocument: FederalDocument,
  ): Promise<GetCustomerQueryResult | null>;

  public abstract findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCustomerWithCustomerAddressRelationQueryResult>;

  public abstract findOneByOrganizationMemberIdWithAuthIdentityRelation(
    organizationMemberId: OrganizationMemberId,
  ): Promise<GetCustomerWithAuthIdentityRelationQueryResult | null>;

  public abstract listAll(): Promise<Array<GetCustomerQueryResult>>;

  public abstract listAllCustomersWithAuthIdentity(): Promise<
    Array<GetCustomerWithAuthIdentityRelationQueryResult>
  >;

  public abstract listCustomersWithFilters(
    input: ListCustomersWithFiltersInputModel,
  ): Promise<
    ListDataOutputModel<GetCustomerWithOrganizationForListQueryResult>
  >;

  public abstract countAllMonthlyUsersForYear(
    year: number,
  ): Promise<Array<UsersStatisticsMonthlyQueryResult>>;
}
