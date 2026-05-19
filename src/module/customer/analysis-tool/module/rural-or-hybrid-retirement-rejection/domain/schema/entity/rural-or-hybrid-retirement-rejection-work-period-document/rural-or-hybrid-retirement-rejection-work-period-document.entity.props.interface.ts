import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/enum/rural-or-hybrid-retirement-rejection-work-period-document-type.enum';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/value-object/rural-or-hybrid-retirement-rejection-work-period-document-id.value-object';

export interface RuralOrHybridRetirementRejectionWorkPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionWorkPeriodDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum | null;
  ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId;
}
