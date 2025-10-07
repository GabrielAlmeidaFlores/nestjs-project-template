import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { CnisFastAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity.props.interface';
import type { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

export class CnisFastAnalysisEntity extends BaseEntity<CnisFastAnalysisId> {
  @Description('Documento CNIS utilizado na análise rápida.')
  public readonly cnisDocument: string | null;

  @Description(
    'Cliente da ferramenta de análise associado à análise CNIS rápida.',
  )
  public readonly analysisToolClient: AnalysisToolClientEntity;

  @Description('Resultado da análise CNIS rápida.')
  public readonly cnisFastAnalysisResult: CnisFastAnalysisResultEntity | null;

  @Description('Membro da organização que criou a análise CNIS rápida.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a análise CNIS rápida.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = CnisFastAnalysisEntity.name;

  public constructor(props: CnisFastAnalysisEntityPropsInterface) {
    super(CnisFastAnalysisId, props);

    this.cnisDocument = props.cnisDocument ?? null;
    this.cnisFastAnalysisResult = props.cnisFastAnalysisResult ?? null;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
