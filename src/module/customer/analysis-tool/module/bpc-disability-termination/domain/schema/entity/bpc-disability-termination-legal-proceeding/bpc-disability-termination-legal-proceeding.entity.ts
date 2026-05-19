import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity.props.interface';
import { BpcDisabilityTerminationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/value-object/bpc-disability-termination-legal-proceeding-id/bpc-disability-termination-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';

export class BpcDisabilityTerminationLegalProceedingEntity extends BaseEntity<BpcDisabilityTerminationLegalProceedingId> {
  @Description(
    'Número do processo judicial associado à análise de BPC PcD cessado.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'ID da análise de BPC PcD cessado associada ao processo judicial.',
  )
  public readonly bpcDisabilityTerminationId: BpcDisabilityTerminationId;

  protected readonly _type = BpcDisabilityTerminationLegalProceedingEntity.name;

  public constructor(
    props: BpcDisabilityTerminationLegalProceedingEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.bpcDisabilityTerminationId = props.bpcDisabilityTerminationId;
  }
}
