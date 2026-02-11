import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import type { SpeechGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/value-object/speech-generator-legal-proceeding-id/speech-generator-legal-proceeding-id.value-object';

export interface SpeechGeneratorLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<SpeechGeneratorLegalProceedingId> {
  legalProceedingNumber: string;
  speechGenerator: SpeechGeneratorEntity;
}
