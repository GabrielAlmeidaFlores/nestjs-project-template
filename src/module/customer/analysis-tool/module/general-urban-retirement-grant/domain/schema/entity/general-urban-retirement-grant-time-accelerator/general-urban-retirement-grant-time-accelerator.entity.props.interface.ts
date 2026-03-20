import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';

export interface GeneralUrbanRetirementGrantTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantTimeAcceleratorId> {
  timeType: string;
  name?: string | null;
  institution?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  affectsQualifyingPeriod?: boolean | null;
  timeGained?: string | null;
  viability?: string | null;
  technicalNote?: string | null;
  recognitionInss: string;
  recognitionJudicial: string;
  generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantEntity | null;
}
