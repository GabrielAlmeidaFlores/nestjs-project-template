import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity.props.interface';
import { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AudienceQuestionGeneratorBenefitEntity extends BaseEntity<AudienceQuestionGeneratorBenefitId> {
  @Description(
    'Número do benefício INSS associado ao gerador de perguntas de audiência.',
  )
  public readonly inssBenefitNumber: string;

  @Description('Gerador de perguntas de audiência associado ao benefício INSS.')
  public readonly audienceQuestionGenerator: AudienceQuestionGeneratorEntity;

  protected readonly _type = AudienceQuestionGeneratorBenefitEntity.name;

  public constructor(
    props: AudienceQuestionGeneratorBenefitEntityPropsInterface,
  ) {
    super(AudienceQuestionGeneratorBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.audienceQuestionGenerator = props.audienceQuestionGenerator;
  }
}
