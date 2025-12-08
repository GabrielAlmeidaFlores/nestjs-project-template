import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-plannig-rpps-period.entity';
import type { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import type { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';

export interface RetirementPlanningRppsPeriodDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPlanningRppsPeriodDocumentId> {
  document: string;
  documentType: RetirementPlanningDocumentTypeEnum;
  retirementPlanningRppsPeriod: RetirementPlanningRppsPeriodEntity;
}
