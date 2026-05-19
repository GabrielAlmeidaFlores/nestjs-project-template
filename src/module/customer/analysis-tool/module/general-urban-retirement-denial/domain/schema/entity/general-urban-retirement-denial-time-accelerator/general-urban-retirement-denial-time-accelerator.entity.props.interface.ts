import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

export interface GeneralUrbanRetirementDenialTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialTimeAcceleratorId> {
  type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum;
  recognitionInss: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum;
  viability: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  institution?: string | null;
  affectsQualifyingPeriod: boolean;
  generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;
}
