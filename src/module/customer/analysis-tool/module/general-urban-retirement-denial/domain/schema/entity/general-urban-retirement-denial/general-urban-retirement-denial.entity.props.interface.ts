import type { GeneralUrbanRetirementDenialId } from './value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialResultId } from '../general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementDenialCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/enum/general-urban-retirement-denial-category.enum';

export interface GeneralUrbanRetirementDenialEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  generalUrbanRetirementDenialResultId?: GeneralUrbanRetirementDenialResultId | null;
  requestedBenefitType?: string | null;
  category?: GeneralUrbanRetirementDenialCategoryEnum | null;
}
