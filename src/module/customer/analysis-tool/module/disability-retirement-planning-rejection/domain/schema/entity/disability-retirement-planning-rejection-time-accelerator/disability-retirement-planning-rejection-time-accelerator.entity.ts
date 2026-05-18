import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-judicial.enum';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-type.enum';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-viability.enum';

export class DisabilityRetirementPlanningRejectionTimeAcceleratorEntity extends BaseEntity<DisabilityRetirementPlanningRejectionTimeAcceleratorId> {
  public readonly type: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum;
  public readonly recognitionInss: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum;
  public readonly recognitionJudicial: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum;
  public readonly viability: DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institution: string | null;
  public readonly affectsQualifyingPeriod: boolean;
  public readonly disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;

  protected readonly _type =
    DisabilityRetirementPlanningRejectionTimeAcceleratorEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionTimeAcceleratorEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionTimeAcceleratorId, props);
    this.type = props.type;
    this.recognitionInss = props.recognitionInss;
    this.recognitionJudicial = props.recognitionJudicial;
    this.viability = props.viability;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.institution = props.institution ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod;
    this.disabilityRetirementPlanningRejectionId =
      props.disabilityRetirementPlanningRejectionId;
  }
}
