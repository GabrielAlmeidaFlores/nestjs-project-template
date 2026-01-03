import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ConversationEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AnalysisToolRecordEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity.props.interface';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';

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
    'Planejamento de aposentadoria RGPS associado ao registro da ferramenta de análise',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  @Description(
    'Registro de planejamento de aposentadoria RPPS associado ao registro da ferramenta de análise',
  )
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity | null;

  @Description(
    'Cliente da ferramenta de análise associado ao registro da ferramenta de análise',
  )
  public readonly analysisToolClient: AnalysisToolClientEntity;

  @Description('')
  public readonly conversation: ConversationEntity | null;

  @Description(
    'Membro da organização que criou o registro da ferramenta de análise.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou o registro da ferramenta de análise.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AnalysisToolRecordEntity.name;

  public constructor(props: AnalysisToolRecordEntityPropsInterface) {
    super(AnalysisToolRecordId, props);

    this.code = props.code;
    this.type = props.type;
    this.cnisFastAnalysis = props.cnisFastAnalysis ?? null;
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? null;
    this.retirementPlanningRpps = props.retirementPlanningRpps ?? null;
    this.status = props.status;
    this.analysisToolClient = props.analysisToolClient;
    this.conversation = props.conversation ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
