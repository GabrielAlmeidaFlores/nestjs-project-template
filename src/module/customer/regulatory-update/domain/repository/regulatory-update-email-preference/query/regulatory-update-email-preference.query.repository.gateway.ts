import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { GetRegulatoryUpdateEmailPreferenceQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/result/get-regulatory-update-email-preference.query.result';

export abstract class RegulatoryUpdateEmailPreferenceQueryRepositoryGateway {
  public abstract findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetRegulatoryUpdateEmailPreferenceQueryResult | null>;

  public abstract findAllWithEmailEnabled(): Promise<
    GetRegulatoryUpdateEmailPreferenceQueryResult[]
  >;
}
