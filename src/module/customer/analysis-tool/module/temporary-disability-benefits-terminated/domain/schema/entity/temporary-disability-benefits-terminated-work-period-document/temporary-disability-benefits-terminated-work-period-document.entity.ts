import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/value-object/temporary-disability-benefits-terminated-work-period-document-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/enum/temporary-disability-benefits-terminated-work-period-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/temporary-disability-benefits-terminated-work-period-document.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

export class TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId> {
  public readonly document: string | null;
  public readonly type: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum | null;
  public readonly temporaryDisabilityBenefitsTerminatedWorkPeriodsId: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId | null;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.temporaryDisabilityBenefitsTerminatedWorkPeriodsId =
      props.temporaryDisabilityBenefitsTerminatedWorkPeriodsId ?? null;
  }
}
