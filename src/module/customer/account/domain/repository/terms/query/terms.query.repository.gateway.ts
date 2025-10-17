import type { GetTermsQueryResult } from '@module/customer/account/domain/repository/terms/query/result/get-terms.query.result';

export abstract class TermsQueryRepositoryGateway {
  public abstract findOneByStatus(
    isActive: boolean,
  ): Promise<GetTermsQueryResult>;
}
