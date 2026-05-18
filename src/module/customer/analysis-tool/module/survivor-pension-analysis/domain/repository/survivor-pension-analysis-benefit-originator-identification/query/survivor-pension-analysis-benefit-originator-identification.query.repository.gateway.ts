import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/result/get-survivor-pension-analysis-benefit-originator-identification.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway {
  public abstract findOneBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult | null>;

  public abstract findOneById(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult | null>;

  public abstract findOneByIdOrFail(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult>;
}
