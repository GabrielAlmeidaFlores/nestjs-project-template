import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpeechGeneratorResultEntityPropsInterface } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity.props.interface';
import { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpeechGeneratorResultEntity extends BaseEntity<SpeechGeneratorResultId> {
  @Description(
    'Conteúdo completo do discurso em markup/hypertext para edição no frontend.',
  )
  public readonly speechGeneratorCompleteContent: string | null;

  @Description(
    'Conteúdo simplificado do discurso em markup/hypertext para edição no frontend.',
  )
  public readonly speechGeneratorSimplifiedContent: string | null;

  protected readonly _type = SpeechGeneratorResultEntity.name;

  public constructor(props: SpeechGeneratorResultEntityPropsInterface) {
    super(SpeechGeneratorResultId, props);

    this.speechGeneratorCompleteContent =
      props.speechGeneratorCompleteContent ?? null;
    this.speechGeneratorSimplifiedContent =
      props.speechGeneratorSimplifiedContent ?? null;
  }
}
