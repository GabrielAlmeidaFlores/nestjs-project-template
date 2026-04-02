import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CreditPackTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-pack.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CreditPackCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/command/credit-pack.command.repository.gateway';
import { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

@Injectable()
export class CreditPackTypeormCommandRepository
  extends BaseTypeormCommandRepository<CreditPackTypeormEntity>
  implements CreditPackCommandRepositoryGateway
{
  protected readonly _type = CreditPackTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CreditPackTypeormEntity)
    repository: Repository<CreditPackTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createCreditPack(entity: CreditPackEntity): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      CreditPackEntity,
      CreditPackTypeormEntity,
    );
    return this.create(mapped);
  }

  public updateCreditPack(
    id: CreditPackId,
    entity: CreditPackEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      CreditPackEntity,
      CreditPackTypeormEntity,
    );
    return this.update(id.toString(), mapped);
  }

  public deleteCreditPack(id: CreditPackId): TransactionType {
    return this.delete(id.toString());
  }
}
