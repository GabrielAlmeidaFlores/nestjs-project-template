import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyCessationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity';

export abstract class BpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway {
  public abstract createBpcElderlyCessationFamilyMemberDocument(
    props: BpcElderlyCessationFamilyMemberDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcElderlyCessationFamilyMemberDocument(
    props: BpcElderlyCessationFamilyMemberDocumentEntity[],
  ): TransactionType[];
}
