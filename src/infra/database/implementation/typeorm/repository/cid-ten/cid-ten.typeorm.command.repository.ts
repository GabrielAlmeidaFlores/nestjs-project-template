import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten-typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CidTenCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/command/cid-ten.command.repository.gateway';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';

@Injectable()
export class CidTenTypeormCommandRepository
  extends BaseTypeormCommandRepository<CidTenTypeormEntity>
  implements CidTenCommandRepositoryGateway
{
  protected readonly _type = CidTenTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CidTenTypeormEntity)
    repository: Repository<CidTenTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateCidTen(id: CidTenId, props: CidTenEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CidTenEntity,
      CidTenTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createCidTen(props: CidTenEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CidTenEntity,
      CidTenTypeormEntity,
    );

    return this.create(mappedData);
  }

  public async _upsertCidTenWithNoTransaction(
    props: CidTenEntity,
  ): Promise<void> {
    const mappedData = this.mapperGateway.map(
      props,
      CidTenEntity,
      CidTenTypeormEntity,
    );

    await this._upsertWithNoTransaction(mappedData, ['code']);
  }
}
