import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';

export interface SpeechGeneratorResultEntityPropsInterface extends BaseEntityPropsInterface<SpeechGeneratorResultId> {
  speechGeneratorCompleteContent?: string | null;
  speechGeneratorSimplifiedContent?: string | null;
}
