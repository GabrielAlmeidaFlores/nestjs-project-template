import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity.props.interface';
import { DisabilityAssessmentForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/value-object/disability-assessment-for-bpc-analysis-benefit-id/disability-assessment-for-bpc-analysis-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class DisabilityAssessmentForBpcAnalysisBenefitEntity extends BaseEntity<DisabilityAssessmentForBpcAnalysisBenefitId> {
  @Description(
    'Número do benefício INSS associado à avaliação de deficiência para BPC.',
  )
  public readonly inssBenefitNumber: string;

  @Description('Avaliação de deficiência para BPC associada ao benefício INSS.')
  public readonly disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity;

  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisBenefitEntity.name;

  public constructor(
    props: DisabilityAssessmentForBpcAnalysisBenefitEntityPropsInterface,
  ) {
    super(DisabilityAssessmentForBpcAnalysisBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.disabilityAssessmentForBpcAnalysis =
      props.disabilityAssessmentForBpcAnalysis;
  }
}
