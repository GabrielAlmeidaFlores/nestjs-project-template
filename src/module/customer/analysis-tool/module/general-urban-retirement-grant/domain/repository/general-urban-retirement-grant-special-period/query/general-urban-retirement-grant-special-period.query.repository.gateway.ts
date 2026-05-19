import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/query/result/get-general-urban-retirement-grant-special-period.query.result';
import type { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementGrantSpecialPeriodIdOrFail(
    id: GeneralUrbanRetirementGrantSpecialPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult>;
}
