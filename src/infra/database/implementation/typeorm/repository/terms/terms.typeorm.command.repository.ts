import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TermsAndConditionsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/terms-and-conditions.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TermsCommandRepositoryGateway } from '@module/customer/account/domain/repository/terms/command/terms.command.repository.gateway';
import { TermsEntity } from '@module/customer/account/domain/schema/entity/terms/terms.entity';

@Injectable()
export class TermsTypeormCommandRepository
  extends BaseTypeormCommandRepository<TermsAndConditionsTypeormEntity>
  implements TermsCommandRepositoryGateway
{
  protected readonly _type = TermsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TermsAndConditionsTypeormEntity)
    repository: Repository<TermsAndConditionsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTermsAndConditions(props: TermsEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TermsEntity,
      TermsAndConditionsTypeormEntity,
    );

    return this.create(mappedData);
  }
}
