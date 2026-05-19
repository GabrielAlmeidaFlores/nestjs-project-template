import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/value-object/maternity-pay-rejection-document-id.value-object';

import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import type { MaternityPayRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity.props.interface';

export class MaternityPayRejectionDocumentEntity extends BaseEntity<MaternityPayRejectionDocumentId> {
  public readonly document: string | null;
  public readonly type: MaternityPayRejectionDocumentTypeEnum | null;
  public readonly maternityPayRejectionId: MaternityPayRejectionId | null;

  protected readonly _type = MaternityPayRejectionDocumentEntity.name;

  public constructor(props: MaternityPayRejectionDocumentEntityPropsInterface) {
    super(MaternityPayRejectionDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.maternityPayRejectionId = props.maternityPayRejectionId ?? null;
  }
}
