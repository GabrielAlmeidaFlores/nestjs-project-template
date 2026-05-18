import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyAnalysisInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity.props.interface';
import { BpcElderlyAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/value-object/bpc-elderly-analysis-inss-benefit-id/bpc-elderly-analysis-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

export class BpcElderlyAnalysisInssBenefitEntity extends BaseEntity<BpcElderlyAnalysisInssBenefitId> {
  @Description('Número do benefício INSS associado à análise de BPC ao Idoso.')
  public readonly inssBenefitNumber: string;

  @Description('ID da análise de BPC ao Idoso associada ao benefício INSS.')
  public readonly bpcElderlyAnalysisId: BpcElderlyAnalysisId;

  protected readonly _type = BpcElderlyAnalysisInssBenefitEntity.name;

  public constructor(props: BpcElderlyAnalysisInssBenefitEntityPropsInterface) {
    super(BpcElderlyAnalysisInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.bpcElderlyAnalysisId = props.bpcElderlyAnalysisId;
  }
}
