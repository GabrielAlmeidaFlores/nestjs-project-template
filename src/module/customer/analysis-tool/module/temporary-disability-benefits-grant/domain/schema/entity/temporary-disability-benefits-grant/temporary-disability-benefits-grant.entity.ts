import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';

import type { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import type { TemporaryDisabilityBenefitsGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

export class TemporaryDisabilityBenefitsGrantEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantId> {
  public readonly category: TemporaryDisabilityBenefitsGrantCategoryEnum;
  public readonly analysisName: string | null;
  public readonly temporaryDisabilityBenefitsGrantResultId: TemporaryDisabilityBenefitsGrantResultId | null;

  protected readonly _type = TemporaryDisabilityBenefitsGrantEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantId, props);
    this.category = props.category;
    this.analysisName = props.analysisName ?? null;
    this.temporaryDisabilityBenefitsGrantResultId =
      props.temporaryDisabilityBenefitsGrantResultId ?? null;
  }
}
