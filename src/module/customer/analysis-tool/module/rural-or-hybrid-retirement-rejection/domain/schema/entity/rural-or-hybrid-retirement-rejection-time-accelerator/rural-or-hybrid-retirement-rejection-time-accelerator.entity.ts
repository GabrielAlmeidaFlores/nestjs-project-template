import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { RuralOrHybridRetirementRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/value-object/rural-or-hybrid-retirement-rejection-time-accelerator-id.value-object';

import type { RuralOrHybridRetirementRejectionTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/rural-or-hybrid-retirement-rejection-time-accelerator.entity.props.interface';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import type { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';
import type { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';

export class RuralOrHybridRetirementRejectionTimeAcceleratorEntity extends BaseEntity<RuralOrHybridRetirementRejectionTimeAcceleratorId> {
  public readonly timeType: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum | null;
  public readonly institution: string | null;
  public readonly recognitionInss: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum | null;
  public readonly affectsQualifyingPeriod: boolean | null;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly gracePeriod: string | null;
  public readonly viability: RuralOrHybridRetirementRejectionViabilityEnum | null;
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionTimeAcceleratorEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionTimeAcceleratorEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionTimeAcceleratorId, props);
    this.timeType = props.timeType ?? null;
    this.institution = props.institution ?? null;
    this.recognitionInss = props.recognitionInss ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod ?? null;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.viability = props.viability ?? null;
    this.ruralOrHybridRetirementRejectionId =
      props.ruralOrHybridRetirementRejectionId;
  }
}
