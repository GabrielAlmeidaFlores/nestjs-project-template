import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.entity.props.interface';
import { AdministrativeProcedureInssAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/value-object/administrative-procedure-inss-analysis-legal-proceeding-id/administrative-procedure-inss-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AdministrativeProcedureInssAnalysisLegalProceedingEntity extends BaseEntity<AdministrativeProcedureInssAnalysisLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado ao procedimento administrativo do INSS.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Procedimento administrativo do INSS associado ao processo judicial.',
  )
  public readonly administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity;

  protected readonly _type =
    AdministrativeProcedureInssAnalysisLegalProceedingEntity.name;

  public constructor(
    props: AdministrativeProcedureInssAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(AdministrativeProcedureInssAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.administrativeProcedureInssAnalysis =
      props.administrativeProcedureInssAnalysis;
  }
}
