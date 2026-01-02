import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';

export interface RetirementPlanningRgpsResultEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsResultId> {
  clientName?: string | null;
  clientFederalDocument?: FederalDocument | null;
  clientBirthDate?: Date | null;
  clientLastAffiliationDate?: Date | null;
  compareCnisCtps?: string | null;
  compareCnisCtpsRaw?: string | null;
  result?: string | null;
}
