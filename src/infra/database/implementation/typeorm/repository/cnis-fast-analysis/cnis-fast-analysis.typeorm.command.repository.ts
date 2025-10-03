import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

@Injectable()
export class CnisFastAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<CnisFastAnalysisTypeormEntity>
  implements CnisFastAnalysisCommandRepositoryGateway
{
  protected readonly _type = CnisFastAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisTypeormEntity)
    repository: Repository<CnisFastAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateCnisFastAnalysis(
    id: CnisFastAnalysisId,
    props: CnisFastAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisEntity,
      CnisFastAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createCnisFastAnalysis(
    props: CnisFastAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisEntity,
      CnisFastAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }
}
