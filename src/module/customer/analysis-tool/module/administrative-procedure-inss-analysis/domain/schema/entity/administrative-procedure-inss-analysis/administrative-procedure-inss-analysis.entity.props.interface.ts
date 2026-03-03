import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import type { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';

export interface AdministrativeProcedureInssAnalysisEntityPropsInterface extends BaseEntityPropsInterface<AdministrativeProcedureInssAnalysisId> {
  administrativeProcedureDocument?: string | null;
  administrativeProcedureInssAnalysisResult?: AdministrativeProcedureInssAnalysisResultEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
