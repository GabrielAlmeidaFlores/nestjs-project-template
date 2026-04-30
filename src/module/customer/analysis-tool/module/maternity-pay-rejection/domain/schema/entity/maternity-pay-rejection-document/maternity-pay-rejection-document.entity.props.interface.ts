import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import type { MaternityPayRejectionDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/value-object/maternity-pay-rejection-document-id.value-object';

export interface MaternityPayRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionDocumentId> {
  document?: string | null;
  type?: MaternityPayRejectionDocumentTypeEnum | null;
  maternityPayRejectionId?: MaternityPayRejectionId | null;
}
