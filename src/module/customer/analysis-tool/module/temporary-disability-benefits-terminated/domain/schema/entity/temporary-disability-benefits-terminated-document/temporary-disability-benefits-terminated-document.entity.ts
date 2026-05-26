import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/value-object/temporary-disability-benefits-terminated-document-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/enum/temporary-disability-benefits-terminated-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/temporary-disability-benefits-terminated-document.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedDocumentEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedDocumentId, props);

    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsTerminatedId =
      props.temporaryDisabilityBenefitsTerminatedId;
  }
}
