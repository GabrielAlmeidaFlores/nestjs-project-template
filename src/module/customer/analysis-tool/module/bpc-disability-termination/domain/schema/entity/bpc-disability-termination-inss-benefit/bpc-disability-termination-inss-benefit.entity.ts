import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity.props.interface';
import { BpcDisabilityTerminationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/value-object/bpc-disability-termination-inss-benefit-id/bpc-disability-termination-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';

export class BpcDisabilityTerminationInssBenefitEntity extends BaseEntity<BpcDisabilityTerminationInssBenefitId> {
  @Description(
    'Número do benefício INSS associado à análise de BPC PcD cessado.',
  )
  public readonly inssBenefitNumber: string;

  @Description('ID da análise de BPC PcD cessado associada ao benefício INSS.')
  public readonly bpcDisabilityTerminationId: BpcDisabilityTerminationId;

  protected readonly _type = BpcDisabilityTerminationInssBenefitEntity.name;

  public constructor(
    props: BpcDisabilityTerminationInssBenefitEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.bpcDisabilityTerminationId = props.bpcDisabilityTerminationId;
  }
}
