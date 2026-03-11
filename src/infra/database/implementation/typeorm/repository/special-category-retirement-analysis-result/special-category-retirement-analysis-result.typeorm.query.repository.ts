import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSpecialCategoryRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/result/get-special-category-retirement-analysis-result.query.result';
import { SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/special-category-retirement-analysis-result.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialCategoryRetirementAnalysisResultTypeormEntity>
  implements SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisResultTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByAnalysisIdOrNull(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisResultQueryResult | null> {
    const data = await this.repository.findOne({
      where: {
        specialCategoryRetirementAnalysis: { id: analysisId.toString() },
        deletedAt: IsNull(),
      },
      relations: { specialCategoryRetirementAnalysis: true },
    });
    if (!data) {
      return null;
    }
    return this.mapperGateway.map(
      data,
      SpecialCategoryRetirementAnalysisResultTypeormEntity,
      GetSpecialCategoryRetirementAnalysisResultQueryResult,
    );
  }
}
