import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/enum/temporary-disability-benefits-grant-period-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/value-object/temporary-disability-benefits-grant-period-document-id.value-object';

export interface TemporaryDisabilityBenefitsGrantPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantPeriodDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum;
  temporaryDisabilityBenefitsGrantPeriodId: TemporaryDisabilityBenefitsGrantPeriodId;
}
