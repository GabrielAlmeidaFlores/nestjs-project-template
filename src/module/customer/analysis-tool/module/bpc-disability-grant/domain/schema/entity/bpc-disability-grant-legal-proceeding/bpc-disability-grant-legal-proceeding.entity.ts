import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity.props.interface';
import { BpcDisabilityGrantLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/value-object/bpc-disability-grant-legal-proceeding-id/bpc-disability-grant-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';

export class BpcDisabilityGrantLegalProceedingEntity extends BaseEntity<BpcDisabilityGrantLegalProceedingId> {
  @Description(
    'NÃºmero do processo judicial associado Ã  anÃ¡lise de BPC ao Idoso.',
  )
  public readonly legalProceedingNumber: string;

  @Description('ID da anÃ¡lise de BPC ao Idoso associada ao processo judicial.')
  public readonly BpcDisabilityGrantId: BpcDisabilityGrantId;

  protected readonly _type = BpcDisabilityGrantLegalProceedingEntity.name;

  public constructor(
    props: BpcDisabilityGrantLegalProceedingEntityPropsInterface,
  ) {
    super(BpcDisabilityGrantLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.BpcDisabilityGrantId = props.BpcDisabilityGrantId;
  }
}
