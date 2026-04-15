import type { GeneralUrbanRetirementDenialDocumentTypeEnum } from './enum/general-urban-retirement-denial-document-type.enum';
import type { GeneralUrbanRetirementDenialDocumentId } from './value-object/general-urban-retirement-denial-document-id/general-urban-retirement-denial-document-id.value-object';
import type { GeneralUrbanRetirementDenialId } from '../general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface GeneralUrbanRetirementDenialDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialDocumentId> {
  document: string;
  type: GeneralUrbanRetirementDenialDocumentTypeEnum;
  generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;
}
