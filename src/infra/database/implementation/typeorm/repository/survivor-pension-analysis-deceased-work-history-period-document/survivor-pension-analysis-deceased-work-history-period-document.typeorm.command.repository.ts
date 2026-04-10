import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period-document/command/survivor-pension-analysis-deceased-work-history-period-document.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/survivor-pension-analysis-deceased-work-history-period-document.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/value-object/survivor-pension-analysis-deceased-work-history-period-document-id/survivor-pension-analysis-deceased-work-history-period-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity>
  implements
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocument(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocument(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisDeceasedWorkHistoryPeriodId(
    survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
        )
        .softDelete({
          deceasedWorkHistoryPeriod: {
            id: survivorPensionAnalysisDeceasedWorkHistoryPeriodId.toString(),
          },
        });
    };
  }
}
