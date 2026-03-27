import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity';

export abstract class GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantInssBenefit(
    props: GeneralUrbanRetirementGrantInssBenefitEntity,
  ): TransactionType;
}
