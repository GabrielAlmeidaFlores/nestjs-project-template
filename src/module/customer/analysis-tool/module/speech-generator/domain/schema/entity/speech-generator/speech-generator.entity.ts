import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { SpeechGeneratorEntityPropsInterface } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity.props.interface';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { SpeechGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/speech-generator-benefit.entity';
import { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import { SpeechGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/speech-generator-legal-proceeding.entity';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpeechGeneratorEntity extends BaseEntity<SpeechGeneratorId> {
  @Description('Documentos previdenciários utilizados na geração do discurso.')
  public readonly speechGeneratorDocument: SpeechGeneratorDocumentEntity[];

  @Description('Benefícios INSS associados ao gerador de discurso.')
  public readonly speechGeneratorBenefit: SpeechGeneratorBenefitEntity[];

  @Description('Processos judiciais relacionados ao gerador de discurso.')
  public readonly speechGeneratorLegalProceeding: SpeechGeneratorLegalProceedingEntity[];

  @Description('Resultado da geração do discurso (markup/hypertext).')
  public readonly speechGeneratorResult: SpeechGeneratorResultEntity | null;

  @Description('Membro da organização que criou o registro.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou o registro.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = SpeechGeneratorEntity.name;

  public constructor(props: SpeechGeneratorEntityPropsInterface) {
    super(SpeechGeneratorId, props);

    this.speechGeneratorDocument = props.speechGeneratorDocument ?? [];
    this.speechGeneratorBenefit = props.speechGeneratorBenefit ?? [];
    this.speechGeneratorLegalProceeding = props.speechGeneratorLegalProceeding ?? [];
    this.speechGeneratorResult = props.speechGeneratorResult ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
