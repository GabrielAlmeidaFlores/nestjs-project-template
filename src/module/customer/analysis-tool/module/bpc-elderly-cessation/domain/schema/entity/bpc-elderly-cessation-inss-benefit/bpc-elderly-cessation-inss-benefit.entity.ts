import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyCessationInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity.props.interface';
import { BpcElderlyCessationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/value-object/bpc-elderly-cessation-inss-benefit-id/bpc-elderly-cessation-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';

export class BpcElderlyCessationInssBenefitEntity extends BaseEntity<BpcElderlyCessationInssBenefitId> {
  @Description('Número do benefício INSS associado à análise de BPC ao Idoso.')
  public readonly inssBenefitNumber: string;

  @Description('ID da análise de BPC ao Idoso associada ao benefício INSS.')
  public readonly bpcElderlyCessationId: BpcElderlyCessationId;

  protected readonly _type = BpcElderlyCessationInssBenefitEntity.name;

  public constructor(
    props: BpcElderlyCessationInssBenefitEntityPropsInterface,
  ) {
    super(BpcElderlyCessationInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.bpcElderlyCessationId = props.bpcElderlyCessationId;
  }
}
