import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/enum/speech-generator-document-type.enum';
import { SpeechGeneratorDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity.props.interface';
import { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpeechGeneratorDocumentEntity extends BaseEntity<SpeechGeneratorDocumentId> {
  @Description('Documento previdenciário utilizado na geração do discurso.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: SpeechGeneratorDocumentTypeEnum;

  @Description('Gerador de discurso associado ao documento.')
  public readonly speechGenerator: SpeechGeneratorEntity | null;

  protected readonly _type = SpeechGeneratorDocumentEntity.name;

  public constructor(props: SpeechGeneratorDocumentEntityPropsInterface) {
    super(SpeechGeneratorDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.speechGenerator = props.speechGenerator;
  }
}
