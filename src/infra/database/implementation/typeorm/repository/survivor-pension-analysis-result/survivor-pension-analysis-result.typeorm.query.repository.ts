import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/result/get-survivor-pension-analysis-result.query.result';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SurvivorPensionAnalysisResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisResultTypeormEntity>
  implements SurvivorPensionAnalysisResultQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisResultTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisResultQueryResult | null> {
    const data = await this.findOne({
      where: {
        survivorPensionAnalysis: { id: survivorPensionAnalysisId.toString() },
      },
      relations: {
        survivorPensionAnalysis: true,
        retirementRules: { survivorPensionAnalysisResult: true },
        dependentPensionAnalyses: { survivorPensionAnalysisResult: true },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisResultTypeormEntity,
      GetSurvivorPensionAnalysisResultQueryResult,
    );
  }

  public async findOneById(
    id: SurvivorPensionAnalysisResultId,
  ): Promise<GetSurvivorPensionAnalysisResultQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: {
        survivorPensionAnalysis: true,
        retirementRules: { survivorPensionAnalysisResult: true },
        dependentPensionAnalyses: { survivorPensionAnalysisResult: true },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisResultTypeormEntity,
      GetSurvivorPensionAnalysisResultQueryResult,
    );
  }

  public async findOneByIdOrFail(
    id: SurvivorPensionAnalysisResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisResultQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          survivorPensionAnalysis: true,
          retirementRules: { survivorPensionAnalysisResult: true },
          dependentPensionAnalyses: { survivorPensionAnalysisResult: true },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisResultTypeormEntity,
      GetSurvivorPensionAnalysisResultQueryResult,
    );
  }
}
