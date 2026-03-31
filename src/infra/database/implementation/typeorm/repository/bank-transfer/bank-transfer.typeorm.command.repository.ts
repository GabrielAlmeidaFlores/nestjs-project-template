import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BankTransferCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/command/bank-transfer.command.repository.gateway';
import { BankTransferEntity } from '@module/generic/bank/domain/schema/entity/bank-transfer/bank-transfer.entity';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

@Injectable()
export class BankTransferTypeormCommandRepository
  extends BaseTypeormCommandRepository<BankTransferTypeormEntity>
  implements BankTransferCommandRepositoryGateway
{
  protected readonly _type = BankTransferTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BankTransferTypeormEntity)
    repository: Repository<BankTransferTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBankTransfer(props: BankTransferEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BankTransferEntity,
      BankTransferTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBankTransfer(
    id: BankTransferId,
    props: BankTransferEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BankTransferEntity,
      BankTransferTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
