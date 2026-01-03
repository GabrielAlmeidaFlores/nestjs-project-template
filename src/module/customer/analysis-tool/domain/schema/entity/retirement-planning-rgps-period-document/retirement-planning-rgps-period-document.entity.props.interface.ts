import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';
import type { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';

export interface RetirementPlanningRgpsPeriodDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPlanningRgpsPeriodDocumentId> {
  document: string;
  retirementPlanningRgpsPeriod?: RetirementPlanningRgpsPeriodEntity | null;
}
