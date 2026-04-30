import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/value-object/temporary-disability-benefits-terminated-previous-benefit-document-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/enum/temporary-disability-benefits-terminated-previous-benefit-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/temporary-disability-benefits-terminated-previous-benefit-document.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsTerminatedPreviousBenefitId: TemporaryDisabilityBenefitsTerminatedPreviousBenefitId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntityPropsInterface,
  ) {
    super(
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId,
      props,
    );
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsTerminatedPreviousBenefitId =
      props.temporaryDisabilityBenefitsTerminatedPreviousBenefitId;
  }
}
