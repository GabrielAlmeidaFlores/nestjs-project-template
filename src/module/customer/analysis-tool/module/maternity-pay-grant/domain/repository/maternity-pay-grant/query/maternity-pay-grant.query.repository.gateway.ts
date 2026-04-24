import type { NotFoundError } from '@core/error/not-found.error';
import type { GetMaternityPayGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/result/get-maternity-pay-grant-with-relations.query.result';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class MaternityPayGrantQueryRepositoryGateway {
  public abstract findOneByMaternityPayGrantIdOrFailWithRelations(
    id: MaternityPayGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMaternityPayGrantWithRelationsQueryResult>;
}
