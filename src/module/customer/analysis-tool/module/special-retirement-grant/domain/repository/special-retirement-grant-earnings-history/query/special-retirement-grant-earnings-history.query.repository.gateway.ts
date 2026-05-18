import type { GetSpecialRetirementGrantEarningsHistoryQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/query/result/get-special-retirement-grant-earnings-history.query.result';
import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

export abstract class SpecialRetirementGrantEarningsHistoryQueryRepositoryGateway {
  public abstract listBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantEarningsHistoryQueryResult[]>;
}
