import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity.props.interface';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/enum/disability-assessment-for-bpc-analysis-document-type.enum';
import { DisabilityAssessmentForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/value-object/disability-assessment-for-bpc-analysis-document-id/disability-assessment-for-bpc-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class DisabilityAssessmentForBpcAnalysisDocumentEntity extends BaseEntity<DisabilityAssessmentForBpcAnalysisDocumentId> {
  @Description(
    'Documento médico ou social da avaliação de deficiência para BPC.',
  )
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: DisabilityAssessmentForBpcAnalysisDocumentTypeEnum;

  @Description('Avaliação de deficiência para BPC associada ao documento.')
  public readonly disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity;

  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisDocumentEntity.name;

  public constructor(
    props: DisabilityAssessmentForBpcAnalysisDocumentEntityPropsInterface,
  ) {
    super(DisabilityAssessmentForBpcAnalysisDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.disabilityAssessmentForBpcAnalysis =
      props.disabilityAssessmentForBpcAnalysis;
  }
}
