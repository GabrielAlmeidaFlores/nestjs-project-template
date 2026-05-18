import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/enum/retirement-permanent-disability-rejection-incapacity-cid-type.enum';
import type { RetirementPermanentDisabilityRejectionIncapacityCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/value-object/retirement-permanent-disability-rejection-incapacity-cid-id/retirement-permanent-disability-rejection-incapacity-cid-id.value-object';

export interface RetirementPermanentDisabilityRejectionIncapacityCidEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionIncapacityCidId> {
  cid: string;
  type: RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum;
  retirementPermanentDisabilityRejectionIncapacityId: RetirementPermanentDisabilityRejectionIncapacityId;
}
