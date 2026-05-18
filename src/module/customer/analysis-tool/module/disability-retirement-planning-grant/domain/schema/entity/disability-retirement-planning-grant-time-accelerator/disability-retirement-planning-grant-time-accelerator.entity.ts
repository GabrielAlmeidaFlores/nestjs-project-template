import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity.props.interface';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import type { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';

export class DisabilityRetirementPlanningGrantTimeAcceleratorEntity extends BaseEntity<DisabilityRetirementPlanningGrantTimeAcceleratorId> {
  public readonly type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum;
  public readonly recognitionInss: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum;
  public readonly recognitionJudicial: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum;
  public readonly viability: DisabilityRetirementPlanningGrantViabilityEnum;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institution: string | null;
  public readonly affectsQualifyingPeriod: boolean;
  public readonly disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantTimeAcceleratorEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantTimeAcceleratorEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantTimeAcceleratorId, props);
    this.type = props.type;
    this.recognitionInss = props.recognitionInss;
    this.recognitionJudicial = props.recognitionJudicial;
    this.viability = props.viability;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.institution = props.institution ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod;
    this.disabilityRetirementPlanningGrantId =
      props.disabilityRetirementPlanningGrantId;
  }
}
