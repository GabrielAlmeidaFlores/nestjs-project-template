import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListGeneralUrbanRetirementGrantPeriodQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/param/list-general-urban-retirement-grant-period.query.param';
import type { GetGeneralUrbanRetirementGrantPeriodWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/result/get-general-urban-retirement-grant-period-with-relations.query.result';
import type { GetGeneralUrbanRetirementGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/result/get-general-urban-retirement-grant-period.query.result';
import type { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway {
  public abstract listByGeneralUrbanRetirementGrantId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListGeneralUrbanRetirementGrantPeriodQueryParam,
  ): Promise<ListDataOutputModel<GetGeneralUrbanRetirementGrantPeriodQueryResult>>;

  public abstract findOneByGeneralUrbanRetirementGrantPeriodIdOrFail(
    id: GeneralUrbanRetirementGrantPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodQueryResult>;

  public abstract findOneByGeneralUrbanRetirementGrantPeriodIdOrFailWithRelations(
    id: GeneralUrbanRetirementGrantPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodWithRelationsQueryResult>;
}
