import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { AnalysisToolClientInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.entity.props.interface';

export class AnalysisToolClientInssBenefitEntity extends BaseEntity<AnalysisToolClientInssBenefitId> {
  @Description('Número do benefício INSS associado à análise CNIS rápida.')
  public readonly inssBenefitNumber: string;

  @Description('Análise CNIS rápida associada ao benefício INSS.')
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity;

  protected readonly _type = AnalysisToolClientInssBenefitEntity.name;

  public constructor(props: AnalysisToolClientInssBenefitEntityPropsInterface) {
    super(AnalysisToolClientInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.cnisFastAnalysis = props.cnisFastAnalysis;
  }
}
