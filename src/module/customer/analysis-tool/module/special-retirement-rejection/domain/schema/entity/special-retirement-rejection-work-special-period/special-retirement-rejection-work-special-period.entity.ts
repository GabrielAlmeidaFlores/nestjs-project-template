import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';

import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.entity.props.interface';

export class SpecialRetirementRejectionWorkSpecialPeriodEntity extends BaseEntity<SpecialRetirementRejectionWorkSpecialPeriodId> {
  public readonly recognizedSpecialTime: boolean | null;
  public readonly companyName: string | null;
  public readonly cnpj: string | null;
  public readonly position: string | null;
  public readonly comprobatoryDocument: string | null;
  public readonly linkedToCnis: boolean | null;
  public readonly containsCnisRemunerationInPeriod: boolean | null;
  public readonly technicalJustification: string | null;
  public readonly additionalObservation: string | null;
  public readonly lawyerObservation: string | null;
  public readonly exposureFrequency: string | null;
  public readonly informationSource: string | null;
  public readonly identifiedAgents: string | null;
  public readonly efficientEpi: boolean | null;
  public readonly specialRetirementRejectionWorkPeriodId: SpecialRetirementRejectionWorkPeriodId | null;

  protected readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodEntity.name;

  public constructor(
    props: SpecialRetirementRejectionWorkSpecialPeriodEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionWorkSpecialPeriodId, props);
    this.recognizedSpecialTime = props.recognizedSpecialTime ?? null;
    this.companyName = props.companyName ?? null;
    this.cnpj = props.cnpj ?? null;
    this.position = props.position ?? null;
    this.comprobatoryDocument = props.comprobatoryDocument ?? null;
    this.linkedToCnis = props.linkedToCnis ?? null;
    this.containsCnisRemunerationInPeriod =
      props.containsCnisRemunerationInPeriod ?? null;
    this.technicalJustification = props.technicalJustification ?? null;
    this.additionalObservation = props.additionalObservation ?? null;
    this.lawyerObservation = props.lawyerObservation ?? null;
    this.exposureFrequency = props.exposureFrequency ?? null;
    this.informationSource = props.informationSource ?? null;
    this.identifiedAgents = props.identifiedAgents ?? null;
    this.efficientEpi = props.efficientEpi ?? null;
    this.specialRetirementRejectionWorkPeriodId =
      props.specialRetirementRejectionWorkPeriodId ?? null;
  }
}
