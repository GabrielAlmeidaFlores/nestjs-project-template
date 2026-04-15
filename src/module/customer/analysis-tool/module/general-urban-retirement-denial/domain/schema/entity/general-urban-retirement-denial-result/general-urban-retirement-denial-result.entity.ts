import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { GeneralUrbanRetirementDenialResultId } from './value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

import type { GeneralUrbanRetirementDenialResultEntityPropsInterface } from './general-urban-retirement-denial-result.entity.props.interface';

export class GeneralUrbanRetirementDenialResultEntity extends BaseEntity<GeneralUrbanRetirementDenialResultId> {
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;

  protected readonly _type = GeneralUrbanRetirementDenialResultEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialResultEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialResultId, props);
    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
  }
}
