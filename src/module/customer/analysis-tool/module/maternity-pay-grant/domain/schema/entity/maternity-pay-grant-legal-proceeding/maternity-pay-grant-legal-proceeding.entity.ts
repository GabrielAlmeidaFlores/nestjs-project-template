import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/value-object/maternity-pay-grant-legal-proceeding-id.value-object';

import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity.props.interface';

export class MaternityPayGrantLegalProceedingEntity extends BaseEntity<MaternityPayGrantLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly maternityPayGrantId: MaternityPayGrantId;

  protected readonly _type = MaternityPayGrantLegalProceedingEntity.name;

  public constructor(
    props: MaternityPayGrantLegalProceedingEntityPropsInterface,
  ) {
    super(MaternityPayGrantLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.maternityPayGrantId = props.maternityPayGrantId;
  }
}
