import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AudienceQuestionGeneratorEntityPropsInterface } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity.props.interface';
import type { AudienceQuestionGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity';
import type { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import type { AudienceQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity';
import type { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';

export class AudienceQuestionGeneratorEntity extends BaseEntity<AudienceQuestionGeneratorId> {
  @Description('Resultado do gerador de perguntas de audiência.')
  public readonly audienceQuestionGeneratorResult: AudienceQuestionGeneratorResultEntity | null;

  @Description(
    'Benefícios INSS relacionados ao gerador de perguntas de audiência.',
  )
  public readonly audienceQuestionGeneratorBenefit:
    | AudienceQuestionGeneratorBenefitEntity[]
    | null;

  @Description(
    'Processos judiciais relacionados ao gerador de perguntas de audiência.',
  )
  public readonly audienceQuestionGeneratorLegalProceeding:
    | AudienceQuestionGeneratorLegalProceedingEntity[]
    | null;

  @Description('Documentos do gerador de perguntas de audiência.')
  public readonly audienceQuestionGeneratorDocument:
    | AudienceQuestionGeneratorDocumentEntity[]
    | null;

  @Description(
    'Membro da organização que criou o gerador de perguntas de audiência.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou o gerador de perguntas de audiência.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AudienceQuestionGeneratorEntity.name;

  public constructor(props: AudienceQuestionGeneratorEntityPropsInterface) {
    super(AudienceQuestionGeneratorId, props);

    this.audienceQuestionGeneratorResult =
      props.audienceQuestionGeneratorResult ?? null;
    this.audienceQuestionGeneratorBenefit =
      props.audienceQuestionGeneratorBenefit ?? [];
    this.audienceQuestionGeneratorLegalProceeding =
      props.audienceQuestionGeneratorLegalProceeding ?? [];
    this.audienceQuestionGeneratorDocument =
      props.audienceQuestionGeneratorDocument ?? [];
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
