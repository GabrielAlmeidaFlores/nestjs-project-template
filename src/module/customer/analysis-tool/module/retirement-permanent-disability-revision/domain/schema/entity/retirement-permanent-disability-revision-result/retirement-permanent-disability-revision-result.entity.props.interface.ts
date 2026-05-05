import type { RetirementPermanentDisabilityRevisionResultId } from './value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface RetirementPermanentDisabilityRevisionResultEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionResultId> {
  retirementPermanentDisabilityRevisionCompleteAnalysis: string | null;
  retirementPermanentDisabilityRevisionSimplifiedAnalysis: string | null;
}
