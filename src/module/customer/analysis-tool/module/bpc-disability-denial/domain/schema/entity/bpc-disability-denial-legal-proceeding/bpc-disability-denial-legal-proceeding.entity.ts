import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityDenialLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity.props.interface';
import { BpcDisabilityDenialLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/value-object/bpc-disability-denial-legal-proceeding-id/bpc-disability-denial-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';

export class BpcDisabilityDenialLegalProceedingEntity extends BaseEntity<BpcDisabilityDenialLegalProceedingId> {
  @Description(
    'Número do processo judicial associado à análise de BPC ao Idoso.',
  )
  public readonly legalProceedingNumber: string;

  @Description('ID da análise de BPC ao Idoso associada ao processo judicial.')
  public readonly bpcDisabilityDenialId: BpcDisabilityDenialId;

  protected readonly _type = BpcDisabilityDenialLegalProceedingEntity.name;

  public constructor(
    props: BpcDisabilityDenialLegalProceedingEntityPropsInterface,
  ) {
    super(BpcDisabilityDenialLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.bpcDisabilityDenialId = props.bpcDisabilityDenialId;
  }
}
