import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.entity.props.interface';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity extends BaseEntity<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId> {
  @Description('ID do histórico de trabalho do falecido.')
  public readonly survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId;

  @Description('Data de início do período.')
  public readonly startDate: Date | null;

  @Description('Data de fim do período.')
  public readonly endDate: Date | null;

  @Description('Data de início do período especial.')
  public readonly specialPeriodStartDate: Date | null;

  @Description('Data de fim do período especial.')
  public readonly specialPeriodEndDate: Date | null;

  @Description('Tipo de tempo especial.')
  public readonly specialTimeType: string | null;

  @Description('Cargo/função.')
  public readonly jobTitle: string | null;

  @Description('Nome da carreira.')
  public readonly careerName: string | null;

  @Description('Tipo de serviço.')
  public readonly serviceType: string | null;

  @Description('Departamento.')
  public readonly department: string | null;

  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId, props);
    this.survivorPensionAnalysisDeceasedWorkHistoryId =
      props.survivorPensionAnalysisDeceasedWorkHistoryId;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.specialPeriodStartDate = props.specialPeriodStartDate ?? null;
    this.specialPeriodEndDate = props.specialPeriodEndDate ?? null;
    this.specialTimeType = props.specialTimeType ?? null;
    this.jobTitle = props.jobTitle ?? null;
    this.careerName = props.careerName ?? null;
    this.serviceType = props.serviceType ?? null;
    this.department = props.department ?? null;
  }
}
