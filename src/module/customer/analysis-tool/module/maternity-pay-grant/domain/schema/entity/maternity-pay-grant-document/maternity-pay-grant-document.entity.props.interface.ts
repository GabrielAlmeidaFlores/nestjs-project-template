import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/value-object/maternity-pay-grant-document-id.value-object';
import type { MaternityPayGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-document-type.enum';

export interface MaternityPayGrantDocumentEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantDocumentId> {
  document: string;
  type: MaternityPayGrantDocumentTypeEnum;
  maternityPayGrantId: MaternityPayGrantId;
}
