import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import type { MaternityPayRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/enum/maternity-pay-rejection-work-period-document-type.enum';
import type { MaternityPayRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/value-object/maternity-pay-rejection-work-period-document-id.value-object';

export interface MaternityPayRejectionWorkPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionWorkPeriodDocumentId> {
  document?: string | null;
  type?: MaternityPayRejectionWorkPeriodDocumentTypeEnum | null;
  maternityPayRejectionWorkPeriodId?: MaternityPayRejectionWorkPeriodId | null;
}
