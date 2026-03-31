import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SystemActivityId } from '@module/customer/analysis-tool/domain/schema/entity/system-activity/value-object/system-activity-id/system-activity-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { SystemActivityEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/system-activity/system-activity.entity.props.interface';

export class SystemActivityEntity extends BaseEntity<SystemActivityId> {
  @Description('Titulo da atividade do sistema.')
  public readonly title: string;

  @Description('Descricao da atividade do sistema.')
  public readonly description: string;

  @Description('Membro da organizacao relacionado a atividade do sistema.')
  public readonly organizationMemberId: OrganizationMemberId | null;

  @Description(
    'Cliente da ferramenta de analise relacionado a atividade do sistema.',
  )
  public readonly analysisToolClientId: AnalysisToolClientId | null;

  @Description(
    'Registro da ferramenta de analise relacionado a atividade do sistema.',
  )
  public readonly analysisToolRecordId: AnalysisToolRecordId | null;

  protected readonly _type = SystemActivityEntity.name;

  public constructor(props: SystemActivityEntityPropsInterface) {
    super(SystemActivityId, props);

    this.title = props.title;
    this.description = props.description;
    this.organizationMemberId = props.organizationMemberId ?? null;
    this.analysisToolClientId = props.analysisToolClientId ?? null;
    this.analysisToolRecordId = props.analysisToolRecordId ?? null;
  }
}
