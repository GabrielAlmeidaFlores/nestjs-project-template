import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/command/survivor-pension-analysis-deceased-work-history.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity>
  implements SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisDeceasedWorkHistory(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSurvivorPensionAnalysisDeceasedWorkHistory(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    props: SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSurvivorPensionAnalysisDeceasedWorkHistory(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
