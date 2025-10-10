import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalPleadingAddressCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/command/legal-pleading-address.repository.gateway';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';

@Injectable()
export class LegalPleadingAddressTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalPleadingAddressTypeormEntity>
  implements LegalPleadingAddressCommandRepositoryGateway
{
  protected readonly _type = LegalPleadingAddressTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingAddressTypeormEntity)
    repository: Repository<LegalPleadingAddressTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createLegalPleadingAddress(
    props: LegalPleadingAddressEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalPleadingAddressEntity,
      LegalPleadingAddressTypeormEntity,
    );

    return this.create(mappedData);
  }
}
