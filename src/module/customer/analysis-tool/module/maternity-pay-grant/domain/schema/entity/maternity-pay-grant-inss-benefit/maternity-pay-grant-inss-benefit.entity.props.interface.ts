import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/value-object/maternity-pay-grant-inss-benefit-id.value-object';

export interface MaternityPayGrantInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantInssBenefitId> {
  inssBenefitNumber: string;
  maternityPayGrantId: MaternityPayGrantId;
}
