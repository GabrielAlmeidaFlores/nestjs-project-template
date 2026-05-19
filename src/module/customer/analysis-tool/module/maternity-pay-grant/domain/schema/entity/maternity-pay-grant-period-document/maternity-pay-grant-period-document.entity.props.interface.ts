import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import type { MaternityPayGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/value-object/maternity-pay-grant-period-document-id.value-object';

export interface MaternityPayGrantPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantPeriodDocumentId> {
  document: string;
  maternityPayGrantPeriodId: MaternityPayGrantPeriodId;
}
