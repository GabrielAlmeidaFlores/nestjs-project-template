import type { NotFoundError } from '@core/error/not-found.error';
import type { GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/result/get-retirement-permanent-disability-revision-concession-letter-breakdown.query.result';
import type { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryRepositoryGateway {
  public abstract findOneByRetirementPermanentDisabilityRevisionConcessionLetterBreakdownIdOrFail(
    id: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult>;
}
