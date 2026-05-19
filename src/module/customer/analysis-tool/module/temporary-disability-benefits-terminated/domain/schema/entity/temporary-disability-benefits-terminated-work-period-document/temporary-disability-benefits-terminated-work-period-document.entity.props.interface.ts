import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/enum/temporary-disability-benefits-terminated-work-period-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/value-object/temporary-disability-benefits-terminated-work-period-document-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId> {
  document?: string | null;
  type?: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum | null;
  temporaryDisabilityBenefitsTerminatedWorkPeriodsId?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId | null;
}
