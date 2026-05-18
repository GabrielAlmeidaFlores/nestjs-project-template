import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/command/survivor-pension-analysis-deceased-work-history-period.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity>
  implements
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisDeceasedWorkHistoryId(
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
        )
        .softDelete({
          deceasedWorkHistory: {
            id: survivorPensionAnalysisDeceasedWorkHistoryId.toString(),
          },
        });
    };
  }
}
