import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import type { SpeechGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/enum/speech-generator-document-type.enum';
import type { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';

export interface SpeechGeneratorDocumentEntityPropsInterface extends BaseEntityPropsInterface<SpeechGeneratorDocumentId> {
  document: string;
  type: SpeechGeneratorDocumentTypeEnum;
  speechGenerator?: SpeechGeneratorEntity | null;
}
