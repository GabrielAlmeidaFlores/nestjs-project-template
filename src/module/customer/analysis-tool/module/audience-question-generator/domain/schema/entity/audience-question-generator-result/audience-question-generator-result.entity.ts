import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AudienceQuestionGeneratorResultEntityPropsInterface } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity.props.interface';

export class AudienceQuestionGeneratorResultEntity extends BaseEntity<AudienceQuestionGeneratorResultId> {
  @Description('Análise completa do gerador de perguntas de audiência.')
  public readonly audienceQuestionGeneratorCompleteAnalysis: string | null;

  @Description('Análise simplificada do gerador de perguntas de audiência.')
  public readonly audienceQuestionGeneratorSimplifiedAnalysis: string | null;

  protected readonly _type = AudienceQuestionGeneratorResultEntity.name;

  public constructor(
    props: AudienceQuestionGeneratorResultEntityPropsInterface,
  ) {
    super(AudienceQuestionGeneratorResultId, props);

    this.audienceQuestionGeneratorCompleteAnalysis =
      props.audienceQuestionGeneratorCompleteAnalysis ?? null;
    this.audienceQuestionGeneratorSimplifiedAnalysis =
      props.audienceQuestionGeneratorSimplifiedAnalysis ?? null;
  }
}
