import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/value-object/special-retirement-grant-period-document-id/special-retirement-grant-period-document-id.value-object';

import type { SpecialRetirementGrantPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/enum/special-retirement-grant-period-document-type.enum';
import type { SpecialRetirementGrantPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/special-retirement-grant-period-document.entity.props.interface';

export class SpecialRetirementGrantPeriodDocumentEntity extends BaseEntity<SpecialRetirementGrantPeriodDocumentId> {
  public readonly type: SpecialRetirementGrantPeriodDocumentTypeEnum;
  public readonly document: string;
  public readonly specialRetirementGrantPeriodId: string;

  protected readonly _type = SpecialRetirementGrantPeriodDocumentEntity.name;

  public constructor(
    props: SpecialRetirementGrantPeriodDocumentEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantPeriodDocumentId, props);
    this.type = props.type;
    this.document = props.document;
    this.specialRetirementGrantPeriodId = props.specialRetirementGrantPeriodId;
  }
}
