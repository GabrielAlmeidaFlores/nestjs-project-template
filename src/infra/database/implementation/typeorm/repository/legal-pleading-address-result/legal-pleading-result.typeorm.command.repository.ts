import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading.entity';

@Injectable()
export class LegalPleadingResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalPleadingResultTypeormEntity>
  implements LegalPleadingResultCommandRepositoryGateway
{
  protected readonly _type = LegalPleadingResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingResultTypeormEntity)
    repository: Repository<LegalPleadingResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createLegalPleadingResult(
    props: LegalPleadingResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalPleadingResultEntity,
      LegalPleadingResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
