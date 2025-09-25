import type { NotFoundError } from '@core/error/not-found.error';
import type { GetCustomerWithAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-address-relation.query.result';
import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetCustomerQueryResult | null>;

  public abstract findOneByAuthIdentityIdOrFail(
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCustomerWithAddressRelationQueryResult>;
}
