import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementDenialDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/value-object/general-urban-retirement-denial-document-id/general-urban-retirement-denial-document-id.value-object';

import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import type { GeneralUrbanRetirementDenialDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity.props.interface';

export class GeneralUrbanRetirementDenialDocumentEntity extends BaseEntity<GeneralUrbanRetirementDenialDocumentId> {
  public readonly document: string;
  public readonly type: GeneralUrbanRetirementDenialDocumentTypeEnum;
  public readonly generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;

  protected readonly _type = GeneralUrbanRetirementDenialDocumentEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialDocumentEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.generalUrbanRetirementDenialId = props.generalUrbanRetirementDenialId;
  }
}
