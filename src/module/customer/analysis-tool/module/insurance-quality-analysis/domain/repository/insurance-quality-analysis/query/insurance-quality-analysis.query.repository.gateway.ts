import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetInsuranceQualityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-with-relations.query.result';
import type { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class InsuranceQualityAnalysisQueryRepositoryGateway {
  public abstract findOneById(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    id: InsuranceQualityAnalysisId,
  ): Promise<GetInsuranceQualityAnalysisWithRelationsQueryResult | null>;

  public abstract findOneByIdOrFail(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    id: InsuranceQualityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetInsuranceQualityAnalysisWithRelationsQueryResult>;

  public abstract findOneWithRelationsByIdOrFail(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    id: InsuranceQualityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetInsuranceQualityAnalysisWithRelationsQueryResult>;
}
