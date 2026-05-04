import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/value-object/temporary-disability-benefits-terminated-insured-status-document-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/enum/temporary-disability-benefits-terminated-insured-status-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/temporary-disability-benefits-terminated-insured-status-document.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsTerminatedInsuredStatusId: TemporaryDisabilityBenefitsTerminatedInsuredStatusId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsTerminatedInsuredStatusId =
      props.temporaryDisabilityBenefitsTerminatedInsuredStatusId;
  }
}
