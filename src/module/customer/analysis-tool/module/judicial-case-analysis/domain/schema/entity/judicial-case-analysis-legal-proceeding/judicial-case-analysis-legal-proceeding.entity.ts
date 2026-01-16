import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity.props.interface';
import { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class JudicialCaseAnalysisLegalProceedingEntity extends BaseEntity<JudicialCaseAnalysisLegalProceedingId> {
  @Description('Número do processo judicial relacionado ao caso judicial.')
  public readonly legalProceedingNumber: string;

  @Description('Caso judicial associado ao processo judicial.')
  public readonly judicialCaseAnalysis: JudicialCaseAnalysisEntity;

  protected readonly _type = JudicialCaseAnalysisLegalProceedingEntity.name;

  public constructor(
    props: JudicialCaseAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(JudicialCaseAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.judicialCaseAnalysis = props.judicialCaseAnalysis;
  }
}
