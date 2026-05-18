import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';

export abstract class GeneralUrbanRetirementGrantCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrant(
    props: GeneralUrbanRetirementGrantEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementGrant(
    id: GeneralUrbanRetirementGrantId,
    props: GeneralUrbanRetirementGrantEntity,
  ): TransactionType;
}
