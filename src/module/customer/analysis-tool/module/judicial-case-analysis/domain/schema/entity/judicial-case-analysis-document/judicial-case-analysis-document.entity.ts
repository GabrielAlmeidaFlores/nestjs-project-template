import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity.props.interface';
import { JudicialCaseAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/enum/judicial-case-analysis-document-type.enum';
import { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class JudicialCaseAnalysisDocumentEntity extends BaseEntity<JudicialCaseAnalysisDocumentId> {
  @Description('Documento do caso judicial.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: JudicialCaseAnalysisDocumentTypeEnum;

  @Description('Caso judicial associado ao documento.')
  public readonly judicialCaseAnalysis: JudicialCaseAnalysisEntity;

  protected readonly _type = JudicialCaseAnalysisDocumentEntity.name;

  public constructor(
    props: JudicialCaseAnalysisDocumentEntityPropsInterface,
  ) {
    super(JudicialCaseAnalysisDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.judicialCaseAnalysis = props.judicialCaseAnalysis;
  }
}

