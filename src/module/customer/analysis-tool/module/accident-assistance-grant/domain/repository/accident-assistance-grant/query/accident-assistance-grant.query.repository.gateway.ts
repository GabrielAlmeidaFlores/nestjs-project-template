import type { NotFoundError } from '@core/error/not-found.error';
import type { GetAccidentAssistanceGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/result/get-accident-assistance-grant-with-relations.query.result';
import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AccidentAssistanceGrantQueryRepositoryGateway {
  public abstract findOneByAccidentAssistanceGrantIdOrFailWithRelations(
    id: AccidentAssistanceGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAccidentAssistanceGrantWithRelationsQueryResult>;
}
