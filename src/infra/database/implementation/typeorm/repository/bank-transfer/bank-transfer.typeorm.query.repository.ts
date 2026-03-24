import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';
import { GetBankTransferQueryResult } from '@module/generic/bank/domain/repository/bank-transfer/query/result/get-bank-transfer.query.result';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';
import { BankTransferNotFoundError } from '@module/generic/bank/error/bank-transfer-not-found.error';

@Injectable()
export class BankTransferTypeormQueryRepository
  extends BaseTypeormQueryRepository<BankTransferTypeormEntity>
  implements BankTransferQueryRepositoryGateway
{
  protected readonly _type = BankTransferTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(BankTransferTypeormEntity)
    repository: Repository<BankTransferTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdOrFail(
    id: BankTransferId,
  ): Promise<GetBankTransferQueryResult> {
    const entity = await this.findOneOrFail(
      { where: { id: id.toString() } },
      BankTransferNotFoundError,
    );

    return this.mapperGateway.map(
      entity,
      BankTransferTypeormEntity,
      GetBankTransferQueryResult,
    );
  }

  public async findOneById(
    id: BankTransferId,
  ): Promise<GetBankTransferQueryResult | null> {
    const entity = await this.findOne({ where: { id: id.toString() } });

    if (entity === null) {
      return null;
    }

    return this.mapperGateway.map(
      entity,
      BankTransferTypeormEntity,
      GetBankTransferQueryResult,
    );
  }

  public async findOneByBankExternalId(
    bankExternalId: string,
  ): Promise<GetBankTransferQueryResult | null> {
    const entity = await this.findOne({ where: { bankExternalId } });

    if (entity === null) {
      return null;
    }

    return this.mapperGateway.map(
      entity,
      BankTransferTypeormEntity,
      GetBankTransferQueryResult,
    );
  }

  public async findManyByIds(
    ids: BankTransferId[],
  ): Promise<GetBankTransferQueryResult[]> {
    if (ids.length === 0) {
      return [];
    }

    const entities = await this.find({
      where: { id: In(ids.map((id) => id.toString())) },
    });

    return this.mapperGateway.mapArray(
      entities,
      BankTransferTypeormEntity,
      GetBankTransferQueryResult,
    );
  }
}
