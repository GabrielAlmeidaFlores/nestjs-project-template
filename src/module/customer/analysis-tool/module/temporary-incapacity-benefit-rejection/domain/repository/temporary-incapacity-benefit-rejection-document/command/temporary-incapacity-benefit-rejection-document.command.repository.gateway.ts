import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/temporary-incapacity-benefit-rejection-document.entity';

export abstract class TemporaryIncapacityBenefitRejectionDocumentCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejectionDocument(
    props: TemporaryIncapacityBenefitRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitRejectionId(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): TransactionType;
}
