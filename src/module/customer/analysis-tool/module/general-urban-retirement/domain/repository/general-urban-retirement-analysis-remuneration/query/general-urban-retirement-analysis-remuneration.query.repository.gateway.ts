import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListGeneralUrbanRetirementAnalysisRemunerationQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/param/list-general-urban-retirement-analysis-remuneration.query.param';
import type { GetGeneralUrbanRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/result/get-general-urban-retirement-analysis-remuneration.query.result';
import type { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway {
  public abstract findByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<GetGeneralUrbanRetirementAnalysisRemunerationQueryResult[]>;

  public abstract listByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    listData: ListGeneralUrbanRetirementAnalysisRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetGeneralUrbanRetirementAnalysisRemunerationQueryResult>
  >;
}
