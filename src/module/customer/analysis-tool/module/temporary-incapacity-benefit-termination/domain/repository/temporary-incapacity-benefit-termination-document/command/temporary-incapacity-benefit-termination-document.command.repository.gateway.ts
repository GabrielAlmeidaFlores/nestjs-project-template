import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/temporary-incapacity-benefit-termination-document.entity';

export abstract class TemporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationDocument(
    props: TemporaryIncapacityBenefitTerminationDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitTerminationId(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): TransactionType;
}
