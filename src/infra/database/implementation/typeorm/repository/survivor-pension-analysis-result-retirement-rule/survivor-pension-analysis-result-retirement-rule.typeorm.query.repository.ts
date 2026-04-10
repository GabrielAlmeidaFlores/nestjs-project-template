import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-retirement-rule.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisResultRetirementRuleQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/query/result/get-survivor-pension-analysis-result-retirement-rule.query.result';
import { SurvivorPensionAnalysisResultRetirementRuleQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/query/survivor-pension-analysis-result-retirement-rule.query.repository.gateway';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultRetirementRuleTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisResultRetirementRuleTypeormEntity>
  implements SurvivorPensionAnalysisResultRetirementRuleQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisResultRetirementRuleTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisResultRetirementRuleTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisResultRetirementRuleTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyBySurvivorPensionAnalysisResultId(
    id: SurvivorPensionAnalysisResultId,
  ): Promise<GetSurvivorPensionAnalysisResultRetirementRuleQueryResult[]> {
    const data = await this.find({
      where: {
        survivorPensionAnalysisResult: { id: id.toString() },
      },
      relations: { survivorPensionAnalysisResult: true },
    });

    return data.map((item) =>
      this.mapperGateway.map(
        item,
        SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
        GetSurvivorPensionAnalysisResultRetirementRuleQueryResult,
      ),
    );
  }
}
