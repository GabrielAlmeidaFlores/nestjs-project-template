import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import type { GeneralUrbanRetirementDenialDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/value-object/general-urban-retirement-denial-document-id/general-urban-retirement-denial-document-id.value-object';

export interface GeneralUrbanRetirementDenialDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialDocumentId> {
  document: string;
  type: GeneralUrbanRetirementDenialDocumentTypeEnum;
  generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;
}
