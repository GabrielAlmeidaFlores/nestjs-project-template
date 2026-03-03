import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/speech-generator-legal-proceeding.entity.props.interface';
import { SpeechGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/value-object/speech-generator-legal-proceeding-id/speech-generator-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpeechGeneratorLegalProceedingEntity extends BaseEntity<SpeechGeneratorLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado ao gerador de discurso.',
  )
  public readonly legalProceedingNumber: string;

  @Description('Gerador de discurso associado ao processo judicial.')
  public readonly speechGenerator: SpeechGeneratorEntity;

  protected readonly _type = SpeechGeneratorLegalProceedingEntity.name;

  public constructor(
    props: SpeechGeneratorLegalProceedingEntityPropsInterface,
  ) {
    super(SpeechGeneratorLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.speechGenerator = props.speechGenerator;
  }
}
