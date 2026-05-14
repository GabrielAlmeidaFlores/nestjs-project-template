import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/value-object/retirement-permanent-disability-rejection-insured-quality-document-id/retirement-permanent-disability-rejection-insured-quality-document-id.value-object';

import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import type { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/enum/retirement-permanent-disability-rejection-insured-quality-document-type.enum';
import type { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity.props.interface';

export class RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity extends BaseEntity<RetirementPermanentDisabilityRejectionInsuredQualityDocumentId> {
  public readonly document: string;
  public readonly type: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum;
  public readonly retirementPermanentDisabilityRejectionInsuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentId,
      props,
    );
    this.document = props.document;
    this.type = props.type;
    this.retirementPermanentDisabilityRejectionInsuredQualityId =
      props.retirementPermanentDisabilityRejectionInsuredQualityId;
  }
}
