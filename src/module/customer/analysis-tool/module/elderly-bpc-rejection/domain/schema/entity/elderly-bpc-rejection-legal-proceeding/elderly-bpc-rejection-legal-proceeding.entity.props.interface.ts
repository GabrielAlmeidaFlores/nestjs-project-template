import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/value-object/elderly-bpc-rejection-legal-proceeding-id/elderly-bpc-rejection-legal-proceeding-id.value-object';

export interface ElderlyBpcRejectionLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<ElderlyBpcRejectionLegalProceedingId> {
  legalProceedingNumber?: string | null;
  elderlyBpcRejectionId: ElderlyBpcRejectionId;
}
