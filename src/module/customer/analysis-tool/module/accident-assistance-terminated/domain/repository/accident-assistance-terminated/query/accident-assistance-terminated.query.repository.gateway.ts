import type { NotFoundError } from '@core/error/not-found.error';
import type { GetAccidentAssistanceTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-with-relations.query.result';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AccidentAssistanceTerminatedQueryRepositoryGateway {
  public abstract findOneAccidentAssistanceTerminatedByIdOrFail(
    id: AccidentAssistanceTerminatedId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAccidentAssistanceTerminatedWithRelationsQueryResult>;
}
