import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityDenialFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity';

export abstract class BpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway {
  public abstract createBpcDisabilityDenialFamilyMemberDocument(
    props: BpcDisabilityDenialFamilyMemberDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcDisabilityDenialFamilyMemberDocument(
    props: BpcDisabilityDenialFamilyMemberDocumentEntity[],
  ): TransactionType[];
}
