import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/query/result/get-survivor-pension-analysis-result-dependent-pension-analysis.query.result';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/query/survivor-pension-analysis-result-dependent-pension-analysis.query.repository.gateway';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity>
  implements
    SurvivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyBySurvivorPensionAnalysisResultId(
    id: SurvivorPensionAnalysisResultId,
  ): Promise<
    GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult[]
  > {
    const data = await this.find({
      where: {
        survivorPensionAnalysisResult: { id: id.toString() },
      },
      relations: { survivorPensionAnalysisResult: true },
    });

    return data.map((item) =>
      this.mapperGateway.map(
        item,
        SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
        GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult,
      ),
    );
  }
}
