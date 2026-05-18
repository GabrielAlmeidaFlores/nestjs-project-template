import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';

import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/retirement-permanent-disability-revision-disability-analysis.entity.props.interface';

export class RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity extends BaseEntity<RetirementPermanentDisabilityRevisionDisabilityAnalysisId> {
  public readonly retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;
  public readonly estimatedIncapacityStartDate: Date | null;
  public readonly medicalDescription: string | null;
  public readonly isAccidentRelated: boolean | null;
  public readonly accidentDescription: string | null;
  public readonly isSevereDisease: boolean | null;
  public readonly severeDiseaseType: string | null;
  public readonly severeDiseaseName: string | null;
  public readonly diseaseStartDate: Date | null;
  public readonly needsPermanentAssistance: boolean | null;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRevisionDisabilityAnalysisId, props);

    this.retirementPermanentDisabilityRevisionId =
      props.retirementPermanentDisabilityRevisionId;
    this.estimatedIncapacityStartDate =
      props.estimatedIncapacityStartDate ?? null;
    this.medicalDescription = props.medicalDescription ?? null;
    this.isAccidentRelated = props.isAccidentRelated ?? null;
    this.accidentDescription = props.accidentDescription ?? null;
    this.isSevereDisease = props.isSevereDisease ?? null;
    this.severeDiseaseType = props.severeDiseaseType ?? null;
    this.severeDiseaseName = props.severeDiseaseName ?? null;
    this.diseaseStartDate = props.diseaseStartDate ?? null;
    this.needsPermanentAssistance = props.needsPermanentAssistance ?? null;
  }
}
