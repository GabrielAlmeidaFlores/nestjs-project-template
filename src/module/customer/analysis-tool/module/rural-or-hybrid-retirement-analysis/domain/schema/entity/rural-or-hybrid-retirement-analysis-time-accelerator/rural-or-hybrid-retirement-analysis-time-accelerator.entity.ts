import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';

import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-analysis-type.enum';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-recognition-inss.enum';
import type { RuralOrHybridRetirementAnalysisViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-viability.enum';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/rural-or-hybrid-retirement-analysis-time-accelerator.entity.props.interface';

export class RuralOrHybridRetirementAnalysisTimeAcceleratorEntity extends BaseEntity<RuralOrHybridRetirementAnalysisTimeAcceleratorId> {
  public readonly timeType: RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum | null;
  public readonly institution: string | null;
  public readonly recognitionInss: RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum | null;
  public readonly affectsQualifyingPeriod: boolean | null;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly gracePeriod: string | null;
  public readonly viability: RuralOrHybridRetirementAnalysisViabilityEnum | null;
  public readonly ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisTimeAcceleratorEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisTimeAcceleratorEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisTimeAcceleratorId, props);
    this.timeType = props.timeType ?? null;
    this.institution = props.institution ?? null;
    this.recognitionInss = props.recognitionInss ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod ?? null;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.viability = props.viability ?? null;
    this.ruralOrHybridRetirementAnalysisId =
      props.ruralOrHybridRetirementAnalysisId;
  }
}
