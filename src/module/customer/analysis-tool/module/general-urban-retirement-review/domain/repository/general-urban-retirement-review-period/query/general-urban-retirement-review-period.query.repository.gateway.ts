import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListGeneralUrbanRetirementReviewPeriodQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/param/list-general-urban-retirement-review-period.query.param';
import type { GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/result/get-general-urban-retirement-review-period-with-relations.query.result';
import type { GetGeneralUrbanRetirementReviewPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/result/get-general-urban-retirement-review-period.query.result';
import type { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway {
  public abstract listByGeneralUrbanRetirementReviewId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListGeneralUrbanRetirementReviewPeriodQueryParam,
  ): Promise<
    ListDataOutputModel<GetGeneralUrbanRetirementReviewPeriodQueryResult>
  >;

  public abstract findOneByGeneralUrbanRetirementReviewPeriodIdOrFail(
    id: GeneralUrbanRetirementReviewPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodQueryResult>;

  public abstract findOneByGeneralUrbanRetirementReviewPeriodIdOrFailWithRelations(
    id: GeneralUrbanRetirementReviewPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult>;
}
