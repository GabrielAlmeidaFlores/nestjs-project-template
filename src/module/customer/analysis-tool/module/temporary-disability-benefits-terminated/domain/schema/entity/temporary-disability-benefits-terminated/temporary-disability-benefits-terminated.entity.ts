import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import type { TemporaryDisabilityBenefitsTerminatedEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

export class TemporaryDisabilityBenefitsTerminatedEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedId> {
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly benefitCessationDate: Date | null;
  public readonly category: TemporaryDisabilityBenefitsTerminatedCategoryEnum | null;
  public readonly myInssPassword: string | null;
  public readonly benefitCessationReason: string | null;
  public readonly temporaryDisabilityBenefitsTerminatedResultId: TemporaryDisabilityBenefitsTerminatedResultId | null;

  protected readonly _type = TemporaryDisabilityBenefitsTerminatedEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedId, props);
    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.benefitCessationDate = props.benefitCessationDate ?? null;
    this.category = props.category ?? null;
    this.myInssPassword = props.myInssPassword ?? null;
    this.benefitCessationReason = props.benefitCessationReason ?? null;
    this.temporaryDisabilityBenefitsTerminatedResultId =
      props.temporaryDisabilityBenefitsTerminatedResultId ?? null;
  }
}
