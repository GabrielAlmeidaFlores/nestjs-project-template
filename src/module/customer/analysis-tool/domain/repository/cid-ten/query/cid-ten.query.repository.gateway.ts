import type { NotFoundError } from '@core/error/not-found.error';
import type { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import type { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class CidTenQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: CidTenId,
    err: ConstructorType<NotFoundError>,
  ): Promise<CidTenEntity>;
}
