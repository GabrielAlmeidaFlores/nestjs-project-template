import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/value-object/maternity-pay-grant-period-document-id.value-object';

import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import type { MaternityPayGrantPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/maternity-pay-grant-period-document.entity.props.interface';

export class MaternityPayGrantPeriodDocumentEntity extends BaseEntity<MaternityPayGrantPeriodDocumentId> {
  public readonly document: string;
  public readonly maternityPayGrantPeriodId: MaternityPayGrantPeriodId;

  protected readonly _type = MaternityPayGrantPeriodDocumentEntity.name;

  public constructor(
    props: MaternityPayGrantPeriodDocumentEntityPropsInterface,
  ) {
    super(MaternityPayGrantPeriodDocumentId, props);
    this.document = props.document;
    this.maternityPayGrantPeriodId = props.maternityPayGrantPeriodId;
  }
}
