import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CnisFastAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity.props.interface';

export class CnisFastAnalysisResultEntity extends BaseEntity<CnisFastAnalysisResultId> {
  @Description('Nome do cliente associado ao resultado da análise CNIS.')
  public readonly clientName: string | null;

  @Description(
    'Documento federal do cliente associado ao resultado da análise CNIS.',
  )
  public readonly clientFederalDocument: FederalDocument | null;

  @Description(
    'Data de nascimento do cliente associado ao resultado da análise CNIS.',
  )
  public readonly clientBirthDate: Date | null;

  @Description(
    'Data da última filiação do cliente associado ao resultado da análise CNIS.',
  )
  public readonly clientLastAffiliationDate: Date | null;

  @Description('Análise completa do CNIS.')
  public readonly cnisCompleteAnalysis: string | null;

  @Description('Análise simplificada do CNIS.')
  public readonly cnisSimplifiedAnalysis: string | null;

  protected readonly _type = CnisFastAnalysisResultEntity.name;

  public constructor(props: CnisFastAnalysisResultEntityPropsInterface) {
    super(CnisFastAnalysisResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.cnisCompleteAnalysis = props.cnisCompleteAnalysis ?? null;
    this.cnisSimplifiedAnalysis = props.cnisSimplifiedAnalysis ?? null;
  }
}
