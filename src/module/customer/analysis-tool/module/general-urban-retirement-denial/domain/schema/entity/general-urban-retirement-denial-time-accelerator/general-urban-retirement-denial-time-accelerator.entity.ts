import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.entity.props.interface';

export class GeneralUrbanRetirementDenialTimeAcceleratorEntity extends BaseEntity<GeneralUrbanRetirementDenialTimeAcceleratorId> {
  public readonly type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum;
  public readonly recognitionInss: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum;
  public readonly recognitionJudicial: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum;
  public readonly viability: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institution: string | null;
  public readonly affectsQualifyingPeriod: boolean;
  public readonly generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;

  protected readonly _type =
    GeneralUrbanRetirementDenialTimeAcceleratorEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialTimeAcceleratorEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialTimeAcceleratorId, props);
    this.type = props.type;
    this.recognitionInss = props.recognitionInss;
    this.recognitionJudicial = props.recognitionJudicial;
    this.viability = props.viability;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.institution = props.institution ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod;
    this.generalUrbanRetirementDenialId = props.generalUrbanRetirementDenialId;
  }
}
