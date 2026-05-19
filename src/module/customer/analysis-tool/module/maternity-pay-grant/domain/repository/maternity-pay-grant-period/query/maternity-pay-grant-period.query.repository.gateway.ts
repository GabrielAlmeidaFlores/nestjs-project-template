import type { NotFoundError } from '@core/error/not-found.error';
import type { GetMaternityPayGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/query/result/get-maternity-pay-grant-period.query.result';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class MaternityPayGrantPeriodQueryRepositoryGateway {
  public abstract findOneByMaternityPayGrantPeriodIdOrFail(
    id: MaternityPayGrantPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMaternityPayGrantPeriodQueryResult>;
}
