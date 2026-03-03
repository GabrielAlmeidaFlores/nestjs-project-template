import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.entity.props.interface';
import { AdministrativeProcedureInssAnalysisBenefitId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/value-object/administrative-procedure-inss-analysis-benefit-id/administrative-procedure-inss-analysis-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AdministrativeProcedureInssAnalysisBenefitEntity extends BaseEntity<AdministrativeProcedureInssAnalysisBenefitId> {
  @Description(
    'Número do benefício INSS associado ao procedimento administrativo do INSS.',
  )
  public readonly inssBenefitNumber: string;

  @Description(
    'Procedimento administrativo do INSS associado ao benefício INSS.',
  )
  public readonly administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity;

  protected readonly _type =
    AdministrativeProcedureInssAnalysisBenefitEntity.name;

  public constructor(
    props: AdministrativeProcedureInssAnalysisBenefitEntityPropsInterface,
  ) {
    super(AdministrativeProcedureInssAnalysisBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.administrativeProcedureInssAnalysis =
      props.administrativeProcedureInssAnalysis;
  }
}
