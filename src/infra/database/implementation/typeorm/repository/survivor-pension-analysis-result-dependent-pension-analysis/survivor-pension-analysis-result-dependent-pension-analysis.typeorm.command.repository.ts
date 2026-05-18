import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/command/survivor-pension-analysis-result-dependent-pension-analysis.command.repository.gateway';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.entity';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity>
  implements
    SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisResultDependentPensionAnalysis(
    props: SurvivorPensionAnalysisResultDependentPensionAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisResultDependentPensionAnalysisEntity,
      SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSurvivorPensionAnalysisResultDependentPensionAnalysis(
    id: SurvivorPensionAnalysisResultDependentPensionAnalysisId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisResultId(
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
        )
        .softDelete({
          survivorPensionAnalysisResult: {
            id: survivorPensionAnalysisResultId.toString(),
          },
        });
    };
  }
}
