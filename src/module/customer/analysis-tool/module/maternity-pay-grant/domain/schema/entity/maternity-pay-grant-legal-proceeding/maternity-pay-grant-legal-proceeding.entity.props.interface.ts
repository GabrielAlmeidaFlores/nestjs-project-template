import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/value-object/maternity-pay-grant-legal-proceeding-id.value-object';

export interface MaternityPayGrantLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantLegalProceedingId> {
  legalProceedingNumber: string;
  maternityPayGrantId: MaternityPayGrantId;
}
