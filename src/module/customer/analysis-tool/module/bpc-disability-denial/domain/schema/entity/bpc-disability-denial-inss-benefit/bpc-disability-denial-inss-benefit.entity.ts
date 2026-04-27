import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityDenialInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity.props.interface';
import { BpcDisabilityDenialInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/value-object/bpc-disability-denial-inss-benefit-id/bpc-disability-denial-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';

export class BpcDisabilityDenialInssBenefitEntity extends BaseEntity<BpcDisabilityDenialInssBenefitId> {
  @Description('Número do benefício INSS associado à análise de BPC ao Idoso.')
  public readonly inssBenefitNumber: string;

  @Description('ID da análise de BPC ao Idoso associada ao benefício INSS.')
  public readonly bpcDisabilityDenialId: BpcDisabilityDenialId;

  protected readonly _type = BpcDisabilityDenialInssBenefitEntity.name;

  public constructor(
    props: BpcDisabilityDenialInssBenefitEntityPropsInterface,
  ) {
    super(BpcDisabilityDenialInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.bpcDisabilityDenialId = props.bpcDisabilityDenialId;
  }
}
