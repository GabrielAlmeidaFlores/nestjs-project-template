import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/command/survivor-pension-analysis-result.command.repository.gateway';
import { SurvivorPensionAnalysisResultEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisResultTypeormEntity>
  implements SurvivorPensionAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisResultTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisResult(
    props: SurvivorPensionAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisResultEntity,
      SurvivorPensionAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSurvivorPensionAnalysisResult(
    id: SurvivorPensionAnalysisResultId,
    props: SurvivorPensionAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisResultEntity,
      SurvivorPensionAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSurvivorPensionAnalysisResult(
    id: SurvivorPensionAnalysisResultId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
