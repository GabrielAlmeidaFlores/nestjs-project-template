import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import type { GetTermsQueryResult } from '@module/customer/account/domain/repository/terms/query/result/get-terms.query.result';
import type { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';

export class GetCustomerTermsAcceptanceQueryResult extends BaseBuildableObject {
  public readonly id: CustomerTermsAcceptanceId;
  public readonly customer: GetCustomerQueryResult;
  public readonly terms: GetTermsQueryResult;

  protected override readonly _type =
    GetCustomerTermsAcceptanceQueryResult.name;
}
