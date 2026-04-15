import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { GeneralUrbanRetirementDenialDocumentId } from './value-object/general-urban-retirement-denial-document-id/general-urban-retirement-denial-document-id.value-object';

import type { GeneralUrbanRetirementDenialDocumentTypeEnum } from './enum/general-urban-retirement-denial-document-type.enum';
import type { GeneralUrbanRetirementDenialDocumentEntityPropsInterface } from './general-urban-retirement-denial-document.entity.props.interface';
import type { GeneralUrbanRetirementDenialId } from '../general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';

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
