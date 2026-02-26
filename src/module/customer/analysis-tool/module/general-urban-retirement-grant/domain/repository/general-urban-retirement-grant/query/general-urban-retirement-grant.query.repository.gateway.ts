import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementGrantQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/result/get-general-urban-retirement-grant-query.result';
import type { GetGeneralUrbanRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/result/get-general-urban-retirement-grant-with-relations.query.result';
import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementGrantQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementGrantIdOrFail(
    id: GeneralUrbanRetirementGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantQueryResult>;

  public abstract findOneByGeneralUrbanRetirementGrantIdOrFailWithRelations(
    id: GeneralUrbanRetirementGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantWithRelationsQueryResult>;
}
