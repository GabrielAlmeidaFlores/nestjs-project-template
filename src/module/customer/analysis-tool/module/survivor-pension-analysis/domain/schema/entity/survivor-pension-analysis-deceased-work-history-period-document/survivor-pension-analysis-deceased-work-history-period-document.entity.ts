import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/survivor-pension-analysis-deceased-work-history-period-document.entity.props.interface';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/value-object/survivor-pension-analysis-deceased-work-history-period-document-id/survivor-pension-analysis-deceased-work-history-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity extends BaseEntity<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId> {
  @Description('Tipo do documento.')
  public readonly documentType: string;

  @Description('Nome do arquivo no bucket de armazenamento.')
  public readonly documentName: string;

  @Description('ID do período do histórico de trabalho do falecido.')
  public readonly survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId;

  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId, props);
    this.documentType = props.documentType;
    this.documentName = props.documentName;
    this.survivorPensionAnalysisDeceasedWorkHistoryPeriodId =
      props.survivorPensionAnalysisDeceasedWorkHistoryPeriodId;
  }
}
