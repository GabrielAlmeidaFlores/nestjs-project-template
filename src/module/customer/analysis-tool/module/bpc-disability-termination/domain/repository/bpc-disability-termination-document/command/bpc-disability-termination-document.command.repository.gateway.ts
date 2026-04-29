import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcDisabilityTerminationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity';

export abstract class BpcDisabilityTerminationDocumentCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationDocument(
    props: BpcDisabilityTerminationDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcDisabilityTerminationDocument(
    props: BpcDisabilityTerminationDocumentEntity[],
  ): TransactionType[];

  public abstract deleteAllBpcDisabilityTerminationDocumentByBpcDisabilityTerminationId(
    id: BpcDisabilityTerminationId,
  ): TransactionType;
}
