import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyCessationLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity.props.interface';
import { BpcElderlyCessationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/value-object/bpc-elderly-cessation-legal-proceeding-id/bpc-elderly-cessation-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';

export class BpcElderlyCessationLegalProceedingEntity extends BaseEntity<BpcElderlyCessationLegalProceedingId> {
  @Description(
    'Número do processo judicial associado à análise de BPC ao Idoso.',
  )
  public readonly legalProceedingNumber: string;

  @Description('ID da análise de BPC ao Idoso associada ao processo judicial.')
  public readonly bpcElderlyCessationId: BpcElderlyCessationId;

  protected readonly _type = BpcElderlyCessationLegalProceedingEntity.name;

  public constructor(
    props: BpcElderlyCessationLegalProceedingEntityPropsInterface,
  ) {
    super(BpcElderlyCessationLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.bpcElderlyCessationId = props.bpcElderlyCessationId;
  }
}
