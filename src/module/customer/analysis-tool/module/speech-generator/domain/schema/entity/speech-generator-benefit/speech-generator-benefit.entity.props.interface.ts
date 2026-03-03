import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import type { SpeechGeneratorBenefitId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/value-object/speech-generator-benefit-id/speech-generator-benefit-id.value-object';

export interface SpeechGeneratorBenefitEntityPropsInterface extends BaseEntityPropsInterface<SpeechGeneratorBenefitId> {
  inssBenefitNumber: string;
  speechGenerator: SpeechGeneratorEntity;
}
