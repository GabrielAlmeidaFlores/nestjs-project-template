import type { NotFoundError } from '@core/error/not-found.error';
import type { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway {
  public abstract findOneByRetirementPermanentDisabilityRevisionWorkPeriodsIdOrFail(
    id: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult>;
}
