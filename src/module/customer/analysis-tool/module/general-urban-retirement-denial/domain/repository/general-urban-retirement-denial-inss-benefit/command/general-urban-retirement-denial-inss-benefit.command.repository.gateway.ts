import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-inss-benefit/general-urban-retirement-denial-inss-benefit.entity';

export abstract class GeneralUrbanRetirementDenialInssBenefitCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenialInssBenefit(
    props: GeneralUrbanRetirementDenialInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByGeneralUrbanRetirementDenialId(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): TransactionType;
}
