import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AdministrativeProcedureInssAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity.props.interface';
import type { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';

export class AdministrativeProcedureInssAnalysisEntity extends BaseEntity<AdministrativeProcedureInssAnalysisId> {
  @Description('Resultado do procedimento administrativo do INSS.')
  public readonly administrativeProcedureInssAnalysisResult: AdministrativeProcedureInssAnalysisResultEntity | null;

  @Description(
    'Membro da organização que criou o procedimento administrativo do INSS.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou o procedimento administrativo do INSS.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AdministrativeProcedureInssAnalysisEntity.name;

  public constructor(
    props: AdministrativeProcedureInssAnalysisEntityPropsInterface,
  ) {
    super(AdministrativeProcedureInssAnalysisId, props);

    this.administrativeProcedureInssAnalysisResult =
      props.administrativeProcedureInssAnalysisResult ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
