import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/value-object/temporary-disability-benefits-grant-period-document-id.value-object';

import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/enum/temporary-disability-benefits-grant-period-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantPeriodDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantPeriodDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsGrantPeriodId: TemporaryDisabilityBenefitsGrantPeriodId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantPeriodDocumentEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantPeriodDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsGrantPeriodId =
      props.temporaryDisabilityBenefitsGrantPeriodId;
  }
}
