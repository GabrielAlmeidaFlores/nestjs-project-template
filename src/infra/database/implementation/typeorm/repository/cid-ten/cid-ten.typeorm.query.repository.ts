import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
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
  ): Promise<CidTenEntity> {
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
      CidTenEntity,
    );

    return mappedData;
  }
}
