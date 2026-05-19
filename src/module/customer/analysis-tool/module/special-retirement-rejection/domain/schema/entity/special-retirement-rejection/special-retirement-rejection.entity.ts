import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';

import type { SpecialRetirementRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity.props.interface';
import type { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';

export class SpecialRetirementRejectionEntity extends BaseEntity<SpecialRetirementRejectionId> {
  public readonly analysisName: string | null;
  public readonly category: string | null;
  public readonly requirementStartDate: Date | null;
  public readonly rejectionDate: Date | null;
  public readonly harmfulAgents: string[] | null;
  public readonly otherAgents: string | null;
  public readonly rejectionReason: string | null;
  public readonly otherRejectionReason: string | null;
  public readonly specialRetirementRejectionResultId: SpecialRetirementRejectionResultId | null;

  protected readonly _type = SpecialRetirementRejectionEntity.name;

  public constructor(props: SpecialRetirementRejectionEntityPropsInterface) {
    super(SpecialRetirementRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.requirementStartDate = props.requirementStartDate ?? null;
    this.rejectionDate = props.rejectionDate ?? null;
    this.harmfulAgents = props.harmfulAgents ?? null;
    this.otherAgents = props.otherAgents ?? null;
    this.rejectionReason = props.rejectionReason ?? null;
    this.otherRejectionReason = props.otherRejectionReason ?? null;
    this.specialRetirementRejectionResultId =
      props.specialRetirementRejectionResultId ?? null;
  }
}
