import type { NotFoundError } from '@core/error/not-found.error';
import type { GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/result/get-permanent-incapacity-benefit-terminated-with-relations.query.result';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PermanentIncapacityBenefitTerminatedQueryRepositoryGateway {
  public abstract findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
    id: PermanentIncapacityBenefitTerminatedId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult>;
}
