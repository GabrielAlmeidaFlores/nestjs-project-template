import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AnalysisToolRecordEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity.props.interface';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

export class AnalysisToolRecordEntity extends BaseEntity<AnalysisToolRecordId> {
  @Description('Status do registro da ferramenta de análise')
  public readonly status: AnalysisStatusEnum;

  @Description('Código de identificação do registro da ferramenta de análise')
  public readonly code: AnalysisToolRecordCode;

  @Description('Tipo do registro da ferramenta de análise')
  public readonly type: AnalysisToolRecordTypeEnum;

  @Description(
    'Análise rápida do CNIS associada ao registro da ferramenta de análise',
  )
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity | null;

  @Description(
    'Cliente da ferramenta de análise associado ao registro da ferramenta de análise',
  )
  public readonly analysisToolClient: AnalysisToolClientEntity;

  @Description('Membro da organização que criou a análise CNIS rápida.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a análise CNIS rápida.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AnalysisToolRecordEntity.name;

  public constructor(props: AnalysisToolRecordEntityPropsInterface) {
    super(AnalysisToolRecordId, props);

    this.code = props.code;
    this.type = props.type;
    this.cnisFastAnalysis = props.cnisFastAnalysis ?? null;
    this.status = props.status;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
