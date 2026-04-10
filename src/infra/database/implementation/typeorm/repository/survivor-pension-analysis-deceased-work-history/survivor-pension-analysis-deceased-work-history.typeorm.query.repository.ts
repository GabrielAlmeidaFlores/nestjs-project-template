import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/result/get-survivor-pension-analysis-deceased-work-history.query.result';
import { SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/survivor-pension-analysis-deceased-work-history.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity>
  implements SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult | null> {
    const data = await this.findOne({
      where: {
        survivorPensionAnalysis: { id: survivorPensionAnalysisId.toString() },
      },
      relations: {
        survivorPensionAnalysis: true,
        periods: {
          deceasedWorkHistory: true,
          documents: { deceasedWorkHistoryPeriod: true },
        },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult,
    );
  }

  public async findOneById(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: {
        survivorPensionAnalysis: true,
        periods: {
          deceasedWorkHistory: true,
          documents: { deceasedWorkHistoryPeriod: true },
        },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult,
    );
  }

  public async findOneByIdOrFail(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          survivorPensionAnalysis: true,
          periods: {
            deceasedWorkHistory: true,
            documents: { deceasedWorkHistoryPeriod: true },
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult,
    );
  }
}
