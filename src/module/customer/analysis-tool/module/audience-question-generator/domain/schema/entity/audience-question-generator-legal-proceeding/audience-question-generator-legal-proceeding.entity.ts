import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity.props.interface';
import { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AudienceQuestionGeneratorLegalProceedingEntity extends BaseEntity<AudienceQuestionGeneratorLegalProceedingId> {
  @Description('Número do processo judicial relacionado ao gerador de perguntas de audiência.')
  public readonly legalProceedingNumber: string;

  @Description('Gerador de perguntas de audiência associado ao processo judicial.')
  public readonly audienceQuestionGenerator: AudienceQuestionGeneratorEntity;

  protected readonly _type = AudienceQuestionGeneratorLegalProceedingEntity.name;

  public constructor(
    props: AudienceQuestionGeneratorLegalProceedingEntityPropsInterface,
  ) {
    super(AudienceQuestionGeneratorLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.audienceQuestionGenerator = props.audienceQuestionGenerator;
  }
}
