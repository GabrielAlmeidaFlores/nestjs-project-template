import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionInssBenefitId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/value-object/elderly-bpc-rejection-inss-benefit-id/elderly-bpc-rejection-inss-benefit-id.value-object';

export interface ElderlyBpcRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<ElderlyBpcRejectionInssBenefitId> {
  inssBenefit?: string | null;
  elderlyBpcRejectionId: ElderlyBpcRejectionId;
}
