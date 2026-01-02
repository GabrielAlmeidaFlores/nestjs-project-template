import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { GetCidTenQueryResult } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/result/get-cid-ten.query.result';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';

@Injectable()
export class CidTenTypeormQueryRepository
  extends BaseTypeormQueryRepository<CidTenTypeormEntity>
  implements CidTenQueryRepositoryGateway
{
  protected readonly _type = CidTenTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CidTenTypeormEntity)
    repository: Repository<CidTenTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdOrFail(
    id: CidTenId,
    err: Constructor<NotFoundError>,
  ): Promise<GetCidTenQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      CidTenTypeormEntity,
      GetCidTenQueryResult,
    );

    return mappedData;
  }

  public async findAllPaginated(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetCidTenQueryResult>> {
    const data = await this.list(listData);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      CidTenTypeormEntity,
      GetCidTenQueryResult,
    );

    return new ListDataOutputModel<GetCidTenQueryResult>({
      ...data,
      resource: mappedData,
    });
  }
}
