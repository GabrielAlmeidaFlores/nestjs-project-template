import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/value-object/maternity-pay-rejection-legal-proceeding-id.value-object';

export interface MaternityPayRejectionLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionLegalProceedingId> {
  legalProceedingNumber?: string | null;
  maternityPayRejectionId?: MaternityPayRejectionId | null;
}
