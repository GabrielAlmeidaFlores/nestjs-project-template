import type { NotFoundError } from '@core/error/not-found.error';
import type { GetAccidentBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/result/get-accident-benefit-rejection-with-relations.query.result';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AccidentBenefitRejectionQueryRepositoryGateway {
  public abstract findOneByAccidentBenefitRejectionIdOrFailWithRelations(
    id: AccidentBenefitRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAccidentBenefitRejectionWithRelationsQueryResult>;
}
