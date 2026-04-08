import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/value-object/temporary-disability-benefits-grant-insured-status-document-id.value-object';

import type { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/enum/temporary-disability-benefits-grant-insured-status-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsGrantInsuredStatusId: TemporaryDisabilityBenefitsGrantInsuredStatusId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsGrantInsuredStatusId =
      props.temporaryDisabilityBenefitsGrantInsuredStatusId;
  }
}
