import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity.props.interface';
import { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class JudicialCaseAnalysisBenefitEntity extends BaseEntity<JudicialCaseAnalysisBenefitId> {
  @Description('Número do benefício INSS associado ao caso judicial.')
  public readonly inssBenefitNumber: string;

  @Description('Caso judicial associado ao benefício INSS.')
  public readonly judicialCaseAnalysis: JudicialCaseAnalysisEntity;

  protected readonly _type = JudicialCaseAnalysisBenefitEntity.name;

  public constructor(props: JudicialCaseAnalysisBenefitEntityPropsInterface) {
    super(JudicialCaseAnalysisBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.judicialCaseAnalysis = props.judicialCaseAnalysis;
  }
}
