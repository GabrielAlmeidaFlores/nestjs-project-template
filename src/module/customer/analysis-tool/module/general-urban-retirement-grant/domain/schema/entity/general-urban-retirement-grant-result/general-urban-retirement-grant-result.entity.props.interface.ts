import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';

export interface GeneralUrbanRetirementGrantResultEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantResultId> {
  clientName?: string | null;
  clientFederalDocument?: FederalDocument | null;
  clientBirthDate?: Date | null;
  clientLastAffiliationDate?: Date | null;
  compareCnisCtps?: string | null;
  compareCnisCtpsRaw?: string | null;
  result?: string | null;
}
