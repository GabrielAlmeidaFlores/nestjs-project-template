import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/value-object/general-urban-retirement-denial-period-document-id/general-urban-retirement-denial-period-document-id.value-object';

export interface GeneralUrbanRetirementDenialPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialPeriodDocumentId> {
  document: string;
  generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId;
}
