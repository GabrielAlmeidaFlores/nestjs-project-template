import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisClientCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client/command/cnis-fast-analysis-client.command.repository.gateway';
import { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';

@Injectable()
export class CnisFastAnalysisClientTypeormCommandRepository
  extends BaseTypeormCommandRepository<CnisFastAnalysisClientTypeormEntity>
  implements CnisFastAnalysisClientCommandRepositoryGateway
{
  protected readonly _type =
    CnisFastAnalysisClientTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisClientTypeormEntity)
    repository: Repository<CnisFastAnalysisClientTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createCnisFastAnalysisClient(
    props: CnisFastAnalysisClientEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisClientEntity,
      CnisFastAnalysisClientTypeormEntity,
    );

    return this.create(mappedData);
  }
}
