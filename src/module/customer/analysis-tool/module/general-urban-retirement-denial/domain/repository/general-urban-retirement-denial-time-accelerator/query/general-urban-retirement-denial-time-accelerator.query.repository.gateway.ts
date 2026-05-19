import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/query/result/get-general-urban-retirement-denial-time-accelerator.query.result';
import type { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class GeneralUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementDenialTimeAcceleratorIdOrFail(
    id: GeneralUrbanRetirementDenialTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult>;
}
