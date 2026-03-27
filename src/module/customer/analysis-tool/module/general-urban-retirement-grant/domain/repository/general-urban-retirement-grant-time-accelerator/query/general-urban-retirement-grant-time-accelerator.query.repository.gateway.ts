import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/result/get-general-urban-retirement-grant-time-accelerator.query.result';
import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import type { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementGrantTimeAcceleratorIdOrFail(
    id: GeneralUrbanRetirementGrantTimeAcceleratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult>;

  public abstract findByGeneralUrbanRetirementGrantId(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
  ): Promise<GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult[]>;
}
