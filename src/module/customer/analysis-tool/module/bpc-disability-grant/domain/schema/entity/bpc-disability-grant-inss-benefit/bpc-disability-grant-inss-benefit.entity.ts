import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity.props.interface';
import { BpcDisabilityGrantInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/value-object/bpc-disability-grant-inss-benefit-id/bpc-disability-grant-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';

export class BpcDisabilityGrantInssBenefitEntity extends BaseEntity<BpcDisabilityGrantInssBenefitId> {
  @Description(
    'NÃºmero do benefÃ­cio INSS associado Ã  anÃ¡lise de BPC ao Idoso.',
  )
  public readonly inssBenefitNumber: string;

  @Description('ID da anÃ¡lise de BPC ao Idoso associada ao benefÃ­cio INSS.')
  public readonly BpcDisabilityGrantId: BpcDisabilityGrantId;

  protected readonly _type = BpcDisabilityGrantInssBenefitEntity.name;

  public constructor(props: BpcDisabilityGrantInssBenefitEntityPropsInterface) {
    super(BpcDisabilityGrantInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.BpcDisabilityGrantId = props.BpcDisabilityGrantId;
  }
}
