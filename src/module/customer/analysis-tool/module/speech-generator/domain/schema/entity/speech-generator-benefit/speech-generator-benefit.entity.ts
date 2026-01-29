import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/speech-generator-benefit.entity.props.interface';
import { SpeechGeneratorBenefitId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/value-object/speech-generator-benefit-id/speech-generator-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpeechGeneratorBenefitEntity extends BaseEntity<SpeechGeneratorBenefitId> {
  @Description('Número do benefício INSS associado ao gerador de discurso.')
  public readonly inssBenefitNumber: string;

  @Description('Gerador de discurso associado ao benefício INSS.')
  public readonly speechGenerator: SpeechGeneratorEntity;

  protected readonly _type = SpeechGeneratorBenefitEntity.name;

  public constructor(props: SpeechGeneratorBenefitEntityPropsInterface) {
    super(SpeechGeneratorBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.speechGenerator = props.speechGenerator;
  }
}
