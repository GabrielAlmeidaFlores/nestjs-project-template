import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/value-object/maternity-pay-grant-document-id.value-object';

import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/maternity-pay-grant-document.entity.props.interface';
import type { MaternityPayGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-document-type.enum';

export class MaternityPayGrantDocumentEntity extends BaseEntity<MaternityPayGrantDocumentId> {
  public readonly document: string;
  public readonly type: MaternityPayGrantDocumentTypeEnum;
  public readonly maternityPayGrantId: MaternityPayGrantId;

  protected readonly _type = MaternityPayGrantDocumentEntity.name;

  public constructor(props: MaternityPayGrantDocumentEntityPropsInterface) {
    super(MaternityPayGrantDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.maternityPayGrantId = props.maternityPayGrantId;
  }
}
