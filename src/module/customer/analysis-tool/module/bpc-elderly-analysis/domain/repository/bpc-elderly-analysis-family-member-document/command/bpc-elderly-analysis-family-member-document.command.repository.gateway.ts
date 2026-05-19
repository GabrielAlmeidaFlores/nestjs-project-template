import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';

export abstract class BpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway {
  public abstract createBpcElderlyAnalysisFamilyMemberDocument(
    props: BpcElderlyAnalysisFamilyMemberDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcElderlyAnalysisFamilyMemberDocument(
    props: BpcElderlyAnalysisFamilyMemberDocumentEntity[],
  ): TransactionType[];
}
