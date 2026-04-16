import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/value-object/general-urban-retirement-denial-period-document-id/general-urban-retirement-denial-period-document-id.value-object';

import type { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity.props.interface';

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
