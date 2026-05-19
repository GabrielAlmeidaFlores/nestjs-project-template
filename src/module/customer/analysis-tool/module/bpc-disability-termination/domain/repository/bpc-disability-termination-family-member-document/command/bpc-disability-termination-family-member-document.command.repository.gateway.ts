import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity';

export abstract class BpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationFamilyMemberDocument(
    props: BpcDisabilityTerminationFamilyMemberDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcDisabilityTerminationFamilyMemberDocument(
    props: BpcDisabilityTerminationFamilyMemberDocumentEntity[],
  ): TransactionType[];
}
