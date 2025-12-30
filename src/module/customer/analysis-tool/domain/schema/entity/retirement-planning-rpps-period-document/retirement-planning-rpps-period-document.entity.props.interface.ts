import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import type { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import type { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';
import type { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';

export interface RetirementPlanningRppsPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRppsPeriodDocumentId> {
  document: string;
  documentType: RetirementPlanningDocumentTypeEnum;
  retirementPlanningRppsPeriodSpecialTime?: RetirementPlanningRppsPeriodSpecialTimeEntity | null;
  retirementPlanningRppsPeriodDisability?: RetirementPlanningRppsPeriodDisabilityEntity | null;
  retirementPlanningRpps?: RetirementPlanningRppsEntity | null;
}
