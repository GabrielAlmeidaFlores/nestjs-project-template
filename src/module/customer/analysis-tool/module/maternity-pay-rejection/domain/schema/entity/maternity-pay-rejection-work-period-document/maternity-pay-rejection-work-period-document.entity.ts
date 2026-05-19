import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/value-object/maternity-pay-rejection-work-period-document-id.value-object';

import type { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import type { MaternityPayRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/enum/maternity-pay-rejection-work-period-document-type.enum';
import type { MaternityPayRejectionWorkPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity.props.interface';

export class MaternityPayRejectionWorkPeriodDocumentEntity extends BaseEntity<MaternityPayRejectionWorkPeriodDocumentId> {
  public readonly document: string | null;
  public readonly type: MaternityPayRejectionWorkPeriodDocumentTypeEnum | null;
  public readonly maternityPayRejectionWorkPeriodId: MaternityPayRejectionWorkPeriodId | null;

  protected readonly _type = MaternityPayRejectionWorkPeriodDocumentEntity.name;

  public constructor(
    props: MaternityPayRejectionWorkPeriodDocumentEntityPropsInterface,
  ) {
    super(MaternityPayRejectionWorkPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.maternityPayRejectionWorkPeriodId =
      props.maternityPayRejectionWorkPeriodId ?? null;
  }
}
