import type { GetGeneralUrbanRetirementDenialWithRelationsQueryResult } from './result/get-general-urban-retirement-denial-with-relations.query.result';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { NotFoundError } from '@core/error/not-found.error';
import type { Constructor } from 'type-fest';

export abstract class GeneralUrbanRetirementDenialQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
    id: GeneralUrbanRetirementDenialId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementDenialWithRelationsQueryResult>;
}
