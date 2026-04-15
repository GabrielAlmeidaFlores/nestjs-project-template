import type { GeneralUrbanRetirementDenialPeriodDocumentId } from './value-object/general-urban-retirement-denial-period-document-id/general-urban-retirement-denial-period-document-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodId } from '../general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface GeneralUrbanRetirementDenialPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialPeriodDocumentId> {
  document: string;
  generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId;
}
