import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/result/get-survivor-pension-analysis-deceased-work-history-period.query.result';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/survivor-pension-analysis-deceased-work-history-period.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity>
  implements
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listBySurvivorPensionAnalysisDeceasedWorkHistoryId(
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult[]> {
    const data = await this.find({
      where: {
        deceasedWorkHistory: {
          id: survivorPensionAnalysisDeceasedWorkHistoryId.toString(),
        },
      },
      relations: {
        deceasedWorkHistory: true,
        documents: { deceasedWorkHistoryPeriod: true },
      },
    });

    return data.map((item) =>
      this.mapperGateway.map(
        item,
        SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
        GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult,
      ),
    );
  }

  public async findOneById(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: {
        deceasedWorkHistory: true,
        documents: { deceasedWorkHistoryPeriod: true },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult,
    );
  }

  public async findOneByIdOrFail(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          deceasedWorkHistory: true,
          documents: { deceasedWorkHistoryPeriod: true },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult,
    );
  }
}
