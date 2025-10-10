import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';

@Injectable()
export class LegalPleadingTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalPleadingTypeormEntity>
  implements LegalPleadingCommandRepositoryGateway
{
  protected readonly _type = LegalPleadingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingTypeormEntity)
    repository: Repository<LegalPleadingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public updateLegalPleading(
    id: LegalPleadingId,
    props: LegalPleadingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalPleadingEntity,
      LegalPleadingTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createLegalPleading(props: LegalPleadingEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalPleadingEntity,
      LegalPleadingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
