import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/value-object/maternity-pay-rejection-legal-proceeding-id.value-object';

import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.entity.props.interface';

export class MaternityPayRejectionLegalProceedingEntity extends BaseEntity<MaternityPayRejectionLegalProceedingId> {
  public readonly legalProceedingNumber: string | null;
  public readonly maternityPayRejectionId: MaternityPayRejectionId | null;

  protected readonly _type = MaternityPayRejectionLegalProceedingEntity.name;

  public constructor(
    props: MaternityPayRejectionLegalProceedingEntityPropsInterface,
  ) {
    super(MaternityPayRejectionLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber ?? null;
    this.maternityPayRejectionId = props.maternityPayRejectionId ?? null;
  }
}
