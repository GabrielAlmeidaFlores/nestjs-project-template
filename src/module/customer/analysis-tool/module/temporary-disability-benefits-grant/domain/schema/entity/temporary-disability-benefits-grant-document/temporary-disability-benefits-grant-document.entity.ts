import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';

import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/enum/temporary-disability-benefits-grant-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsGrantDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantDocumentEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsGrantId =
      props.temporaryDisabilityBenefitsGrantId;
  }
}
