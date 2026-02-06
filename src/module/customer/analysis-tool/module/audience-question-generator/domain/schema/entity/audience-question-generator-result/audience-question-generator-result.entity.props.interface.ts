import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';

export interface AudienceQuestionGeneratorResultEntityPropsInterface
  extends BaseEntityPropsInterface<AudienceQuestionGeneratorResultId> {
  audienceQuestionGeneratorCompleteAnalysis?: string | null;
  audienceQuestionGeneratorSimplifiedAnalysis?: string | null;
}
