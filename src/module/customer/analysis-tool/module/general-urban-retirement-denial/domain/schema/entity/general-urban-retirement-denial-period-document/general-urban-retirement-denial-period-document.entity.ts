import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { GeneralUrbanRetirementDenialPeriodDocumentId } from './value-object/general-urban-retirement-denial-period-document-id/general-urban-retirement-denial-period-document-id.value-object';

import type { GeneralUrbanRetirementDenialPeriodDocumentEntityPropsInterface } from './general-urban-retirement-denial-period-document.entity.props.interface';
import type { GeneralUrbanRetirementDenialPeriodId } from '../general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';

export class GeneralUrbanRetirementDenialPeriodDocumentEntity extends BaseEntity<GeneralUrbanRetirementDenialPeriodDocumentId> {
  public readonly document: string;
  public readonly generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId;

  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodDocumentEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialPeriodDocumentEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialPeriodDocumentId, props);
    this.document = props.document;
    this.generalUrbanRetirementDenialPeriodId =
      props.generalUrbanRetirementDenialPeriodId;
  }
}
