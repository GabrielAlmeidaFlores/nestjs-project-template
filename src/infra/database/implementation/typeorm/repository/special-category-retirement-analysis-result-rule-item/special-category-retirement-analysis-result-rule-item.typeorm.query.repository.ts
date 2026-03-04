import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-rule-item.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/query/result/get-special-category-retirement-analysis-result-rule-item.query.result';
import { SpecialCategoryRetirementAnalysisResultRuleItemQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/query/special-category-retirement-analysis-result-rule-item.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultRuleItemTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity>
  implements SpecialCategoryRetirementAnalysisResultRuleItemQueryRepositoryGateway
{
  protected readonly _type = SpecialCategoryRetirementAnalysisResultRuleItemTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByResultId(
    resultId: SpecialCategoryRetirementAnalysisResultId,
  ): Promise<GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult[]> {
    const data = await this.repository.find({
      where: {
        analysisResult: { id: resultId.toString() },
        deletedAt: IsNull(),
      },
      relations: { analysisResult: true },
    });
    return this.mapperGateway.mapArray(
      data,
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
      GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult,
    );
  }
}
