import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.entity.props.interface';
import { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class CnisFastAnalysisLegalProceedingEntity extends BaseEntity<CnisFastAnalysisLegalProceedingId> {
  @Description('Número do processo judicial relacionado à análise CNIS rápida.')
  public readonly legalProceedingNumber: string;

  @Description('Análise CNIS rápida associada ao processo judicial.')
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity;

  protected readonly _type = CnisFastAnalysisLegalProceedingEntity.name;

  public constructor(
    props: CnisFastAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(CnisFastAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.cnisFastAnalysis = props.cnisFastAnalysis;
  }
}
