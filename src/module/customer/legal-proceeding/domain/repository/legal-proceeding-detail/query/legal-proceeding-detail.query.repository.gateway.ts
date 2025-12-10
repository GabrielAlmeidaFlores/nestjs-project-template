import type { GetLegalProceedingDetailQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail.query.result';

export abstract class LegalProceedingDetailQueryRepositoryGateway {
  public abstract findOneByLegalProceeding(
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailQueryResult>;
}
