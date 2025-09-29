import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisResultEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

@Injectable()
export class CnisFastAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<CnisFastAnalysisResultTypeormEntity>
  implements CnisFastAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    CnisFastAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisResultTypeormEntity)
    repository: Repository<CnisFastAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createCnisFastAnalysisResult(
    props: CnisFastAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisResultEntity,
      CnisFastAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
