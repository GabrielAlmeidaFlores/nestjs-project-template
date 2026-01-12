import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { GetCidTenQueryResult } from '@module/customer/analysis-tool/module/cid-ten/domain/repository/cid-ten/query/result/get-cid-ten.query.result';
import type { CidTenId } from '@module/customer/analysis-tool/module/cid-ten/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class CidTenQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: CidTenId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCidTenQueryResult>;

  public abstract findAllPaginated(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetCidTenQueryResult>>;
}
