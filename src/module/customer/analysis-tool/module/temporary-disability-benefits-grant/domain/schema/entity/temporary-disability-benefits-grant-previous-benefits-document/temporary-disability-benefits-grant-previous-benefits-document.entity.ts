import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/value-object/temporary-disability-benefits-grant-previous-benefits-document-id.value-object';

import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/enum/temporary-disability-benefits-grant-previous-benefits-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsGrantPreviousBenefitsId: TemporaryDisabilityBenefitsGrantPreviousBenefitsId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsGrantPreviousBenefitsId =
      props.temporaryDisabilityBenefitsGrantPreviousBenefitsId;
  }
}
