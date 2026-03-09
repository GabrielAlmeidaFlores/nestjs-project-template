import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';

export interface RetirementPlanningRgpsTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsTimeAcceleratorId> {
  timeType: string;
  name?: string | null;
  institution?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  affectsQualifyingPeriod?: boolean | null;
  viability?: string | null;
  technicalNote?: string | null;
  recognitionInss: string;
  recognitionJudicial: string;
  retirementPlanningRgps?: RetirementPlanningRgpsEntity | null;
}
