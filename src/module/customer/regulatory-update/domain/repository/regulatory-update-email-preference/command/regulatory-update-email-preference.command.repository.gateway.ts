import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { RegulatoryUpdateEmailPreferenceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/regulatory-update-email-preference.entity';

export abstract class RegulatoryUpdateEmailPreferenceCommandRepositoryGateway {
  public abstract upsertByCustomerId(
    customerId: CustomerId,
    props: RegulatoryUpdateEmailPreferenceEntity,
  ): TransactionType;
}
