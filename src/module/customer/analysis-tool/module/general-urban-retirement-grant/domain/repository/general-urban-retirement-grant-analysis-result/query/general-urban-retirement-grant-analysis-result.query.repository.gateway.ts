import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementGrantAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/query/result/get-general-urban-retirement-grant-analysis-result.query.result';
import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import type { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway {
  public abstract findManyByGeneralUrbanRetirementGrantId(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
  ): Promise<GetGeneralUrbanRetirementGrantAnalysisResultQueryResult[]>;

  public abstract findOneByGeneralUrbanRetirementGrantAnalysisResultIdOrFail(
    id: GeneralUrbanRetirementGrantAnalysisResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantAnalysisResultQueryResult>;
}
