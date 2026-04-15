import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/result/get-survivor-pension-analysis-with-relations.query.result';
import { SurvivorPensionAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/survivor-pension-analysis.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SurvivorPensionAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisTypeormEntity>
  implements SurvivorPensionAnalysisQueryRepositoryGateway
{
  protected readonly _type = SurvivorPensionAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisWithRelationsQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: {
        customerProfileIdentification: {
          documents: true,
          survivorPensionAnalysis: true,
        },
        benefitOriginatorIdentification: {
          documents: true,
          survivorPensionAnalysis: true,
        },
        deceasedWorkHistory: {
          survivorPensionAnalysis: true,
          periods: {
            deceasedWorkHistory: true,
            documents: { deceasedWorkHistoryPeriod: true },
          },
        },
        deceasedBenefitDependents: {
          survivorPensionAnalysis: true,
          documents: { deceasedBenefitDependents: true },
        },
        result: {
          survivorPensionAnalysis: true,
          retirementRules: { survivorPensionAnalysisResult: true },
          dependentPensionAnalyses: { survivorPensionAnalysisResult: true },
        },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisTypeormEntity,
      GetSurvivorPensionAnalysisWithRelationsQueryResult,
    );
  }

  public async findOneByIdOrFail(
    id: SurvivorPensionAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          customerProfileIdentification: {
            documents: true,
            survivorPensionAnalysis: true,
          },
          benefitOriginatorIdentification: {
            documents: true,
            survivorPensionAnalysis: true,
          },
          deceasedWorkHistory: {
            survivorPensionAnalysis: true,
            periods: {
              deceasedWorkHistory: true,
              documents: { deceasedWorkHistoryPeriod: true },
            },
          },
          deceasedBenefitDependents: {
            survivorPensionAnalysis: true,
            documents: { deceasedBenefitDependents: true },
          },
          result: {
            survivorPensionAnalysis: true,
            retirementRules: { survivorPensionAnalysisResult: true },
            dependentPensionAnalyses: { survivorPensionAnalysisResult: true },
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisTypeormEntity,
      GetSurvivorPensionAnalysisWithRelationsQueryResult,
    );
  }
}
