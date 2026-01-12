import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.entity.props.interface';
import { CnisFastAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class CnisFastAnalysisInssBenefitEntity extends BaseEntity<CnisFastAnalysisInssBenefitId> {
  @Description('Número do benefício INSS associado à análise CNIS rápida.')
  public readonly inssBenefitNumber: string;

  @Description('Análise CNIS rápida associada ao benefício INSS.')
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity;

  protected readonly _type = CnisFastAnalysisInssBenefitEntity.name;

  public constructor(props: CnisFastAnalysisInssBenefitEntityPropsInterface) {
    super(CnisFastAnalysisInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.cnisFastAnalysis = props.cnisFastAnalysis;
  }
}
