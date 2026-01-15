import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import type { SpecialActivityLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/value-object/special-activity-legal-proceeding-id.value-object';

export interface SpecialActivityLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<SpecialActivityLegalProceedingId> {
  legalProceedingNumber: string;
  specialActivity: SpecialActivityEntity;
}
