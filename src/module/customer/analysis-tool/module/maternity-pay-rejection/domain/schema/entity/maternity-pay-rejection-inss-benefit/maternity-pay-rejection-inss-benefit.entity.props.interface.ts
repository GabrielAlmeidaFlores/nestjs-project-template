import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/value-object/maternity-pay-rejection-inss-benefit-id.value-object';

export interface MaternityPayRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionInssBenefitId> {
  inssBenefit?: string | null;
  maternityPayRejectionId?: MaternityPayRejectionId | null;
}
