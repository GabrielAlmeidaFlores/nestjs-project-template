import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/elderly-bpc-rejection-inss-benefit.entity';

export abstract class ElderlyBpcRejectionInssBenefitCommandRepositoryGateway {
  public abstract createElderlyBpcRejectionInssBenefit(
    props: ElderlyBpcRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteElderlyBpcRejectionInssBenefitsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType;
}
