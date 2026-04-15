import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/command/survivor-pension-analysis.command.repository.gateway';
import { SurvivorPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/survivor-pension-analysis.entity';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisTypeormEntity>
  implements SurvivorPensionAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysis(
    props: SurvivorPensionAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisEntity,
      SurvivorPensionAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSurvivorPensionAnalysis(
    id: SurvivorPensionAnalysisId,
    props: SurvivorPensionAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisEntity,
      SurvivorPensionAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSurvivorPensionAnalysis(
    id: SurvivorPensionAnalysisId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
