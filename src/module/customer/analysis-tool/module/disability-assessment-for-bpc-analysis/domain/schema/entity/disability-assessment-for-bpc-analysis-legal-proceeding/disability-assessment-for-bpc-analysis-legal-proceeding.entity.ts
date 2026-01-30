import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity.props.interface';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/value-object/disability-assessment-for-bpc-analysis-legal-proceeding-id/disability-assessment-for-bpc-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class DisabilityAssessmentForBpcAnalysisLegalProceedingEntity extends BaseEntity<DisabilityAssessmentForBpcAnalysisLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado à avaliação de deficiência para BPC.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Avaliação de deficiência para BPC associada ao processo judicial.',
  )
  public readonly disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity;

  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisLegalProceedingEntity.name;

  public constructor(
    props: DisabilityAssessmentForBpcAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(DisabilityAssessmentForBpcAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.disabilityAssessmentForBpcAnalysis =
      props.disabilityAssessmentForBpcAnalysis;
  }
}
