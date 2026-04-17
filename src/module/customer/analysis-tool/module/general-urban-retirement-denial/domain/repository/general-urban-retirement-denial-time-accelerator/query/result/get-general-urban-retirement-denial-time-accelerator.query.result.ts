import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

export class GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementDenialTimeAcceleratorId;
  public readonly type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum;
  public readonly recognitionInss: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum;
  public readonly recognitionJudicial: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum;
  public readonly viability: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institution: string | null;
  public readonly affectsQualifyingPeriod: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult.name;
}
