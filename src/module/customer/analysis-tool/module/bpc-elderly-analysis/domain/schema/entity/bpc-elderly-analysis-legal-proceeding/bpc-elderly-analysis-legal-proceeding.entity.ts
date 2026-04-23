import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity.props.interface';
import { BpcElderlyAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/value-object/bpc-elderly-analysis-legal-proceeding-id/bpc-elderly-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

export class BpcElderlyAnalysisLegalProceedingEntity extends BaseEntity<BpcElderlyAnalysisLegalProceedingId> {
  @Description(
    'Número do processo judicial associado à análise de BPC ao Idoso.',
  )
  public readonly legalProceedingNumber: string;

  @Description('ID da análise de BPC ao Idoso associada ao processo judicial.')
  public readonly bpcElderlyAnalysisId: BpcElderlyAnalysisId;

  protected readonly _type = BpcElderlyAnalysisLegalProceedingEntity.name;

  public constructor(
    props: BpcElderlyAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(BpcElderlyAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.bpcElderlyAnalysisId = props.bpcElderlyAnalysisId;
  }
}
