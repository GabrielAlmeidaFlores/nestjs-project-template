import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import {
  SurvivorPensionAnalysisDeceasedWorkHistoryEntityPropsInterface,
  SurvivorPensionAnalysisDeceasedWorkHistoryRemunerationType,
} from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.entity.props.interface';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisDeceasedWorkHistoryEntity extends BaseEntity<SurvivorPensionAnalysisDeceasedWorkHistoryId> {
  @Description('ID da análise de pensão por morte.')
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @Description('Data de início do histórico de trabalho do falecido.')
  public readonly startDate: Date | null;

  @Description('Data de fim do histórico de trabalho do falecido.')
  public readonly endDate: Date | null;

  @Description('Remunerações do instituidor.')
  public readonly remunerations: SurvivorPensionAnalysisDeceasedWorkHistoryRemunerationType[];

  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisDeceasedWorkHistoryId, props);
    this.survivorPensionAnalysisId = props.survivorPensionAnalysisId;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.remunerations = props.remunerations ?? [];
  }
}
