import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { MedicalQuestionGeneratorResultEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity.props.interface';

export class MedicalQuestionGeneratorResultEntity extends BaseEntity<MedicalQuestionGeneratorResultId> {
  @Description('Nome do cliente extraído do CNIS.')
  public readonly clientName: string | null;

  @Description('Documento federal do cliente extraído do CNIS.')
  public readonly clientFederalDocument: FederalDocument | null;

  @Description('Data de nascimento do cliente extraída do CNIS.')
  public readonly clientBirthDate: Date | null;

  @Description('Data da última filiação do cliente extraída do CNIS.')
  public readonly clientLastAffiliationDate: Date | null;

  @Description('Análise completa do gerador de quesitos médicos.')
  public readonly medicalQuestionGeneratorCompleteAnalysis: string | null;

  @Description('Análise simplificada do gerador de quesitos médicos.')
  public readonly medicalQuestionGeneratorSimplifiedAnalysis: string | null;

  protected readonly _type = MedicalQuestionGeneratorResultEntity.name;

  public constructor(
    props: MedicalQuestionGeneratorResultEntityPropsInterface,
  ) {
    super(MedicalQuestionGeneratorResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.medicalQuestionGeneratorCompleteAnalysis =
      props.medicalQuestionGeneratorCompleteAnalysis ?? null;
    this.medicalQuestionGeneratorSimplifiedAnalysis =
      props.medicalQuestionGeneratorSimplifiedAnalysis ?? null;
  }
}
