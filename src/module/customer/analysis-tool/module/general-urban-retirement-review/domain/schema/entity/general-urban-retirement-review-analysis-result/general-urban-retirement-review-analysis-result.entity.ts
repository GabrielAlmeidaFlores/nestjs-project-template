import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/enum/analysis-type.enum';
import { GeneralUrbanRetirementReviewAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/general-urban-retirement-review-analysis-result.entity.props.interface';
import { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';

export class GeneralUrbanRetirementReviewAnalysisResultEntity extends BaseEntity<GeneralUrbanRetirementReviewAnalysisResultId> {
  @Description(
    'Concessão de aposentadoria urbana associada ao resultado de análise.',
  )
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity;

  @Description('Tipo de análise realizada.')
  public readonly analysisType: AnalysisTypeEnum | null;

  @Description('Resposta da análise.')
  public readonly response: string;

  protected readonly _type =
    GeneralUrbanRetirementReviewAnalysisResultEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewAnalysisResultEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewAnalysisResultId, props);

    this.generalUrbanRetirementReview = props.generalUrbanRetirementReview;
    this.analysisType = props.analysisType ?? null;
    this.response = props.response;
  }
}
