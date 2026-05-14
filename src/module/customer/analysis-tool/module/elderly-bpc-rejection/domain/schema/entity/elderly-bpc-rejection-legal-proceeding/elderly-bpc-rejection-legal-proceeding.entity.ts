import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ElderlyBpcRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/value-object/elderly-bpc-rejection-legal-proceeding-id/elderly-bpc-rejection-legal-proceeding-id.value-object';

import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/elderly-bpc-rejection-legal-proceeding.entity.props.interface';

export class ElderlyBpcRejectionLegalProceedingEntity extends BaseEntity<ElderlyBpcRejectionLegalProceedingId> {
  public readonly legalProceedingNumber: string | null;
  public readonly elderlyBpcRejectionId: ElderlyBpcRejectionId;

  protected readonly _type = ElderlyBpcRejectionLegalProceedingEntity.name;

  public constructor(
    props: ElderlyBpcRejectionLegalProceedingEntityPropsInterface,
  ) {
    super(ElderlyBpcRejectionLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber ?? null;
    this.elderlyBpcRejectionId = props.elderlyBpcRejectionId;
  }
}
