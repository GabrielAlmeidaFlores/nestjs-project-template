import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityGrantFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity';

export abstract class BpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway {
  public abstract createBpcDisabilityGrantFamilyMemberDocument(
    props: BpcDisabilityGrantFamilyMemberDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcDisabilityGrantFamilyMemberDocument(
    props: BpcDisabilityGrantFamilyMemberDocumentEntity[],
  ): TransactionType[];
}
