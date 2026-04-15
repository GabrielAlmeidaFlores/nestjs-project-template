import type { GeneralUrbanRetirementDenialId } from './value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialResultId } from '../general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface GeneralUrbanRetirementDenialEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  generalUrbanRetirementDenialResultId?: GeneralUrbanRetirementDenialResultId | null;
}
