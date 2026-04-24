import type { Constructor } from 'type-fest';

import type { NotFoundError } from '@core/error/not-found.error';
import type { GetAccidentAssistanceTerminatedPeriodQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/query/result/get-accident-assistance-terminated-period.query.result';
import type { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

export abstract class AccidentAssistanceTerminatedPeriodQueryRepositoryGateway {
  public abstract findOneAccidentAssistanceTerminatedPeriodByIdOrFail(
    id: AccidentAssistanceTerminatedPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAccidentAssistanceTerminatedPeriodQueryResult>;
}
