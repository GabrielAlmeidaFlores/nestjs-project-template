import type { NotFoundError } from '@core/error/not-found.error';
import type { GetMaternityPayRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/result/get-maternity-pay-rejection-with-relations.query.result';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class MaternityPayRejectionQueryRepositoryGateway {
  public abstract findOneByMaternityPayRejectionIdOrFailWithRelations(
    id: MaternityPayRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMaternityPayRejectionWithRelationsQueryResult>;
}
