import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-conversion-item.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/query/result/get-special-category-retirement-analysis-result-conversion-item.query.result';
import { SpecialCategoryRetirementAnalysisResultConversionItemQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/query/special-category-retirement-analysis-result-conversion-item.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultConversionItemTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity>
  implements
    SpecialCategoryRetirementAnalysisResultConversionItemQueryRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultConversionItemTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
    )
    repository: Repository<SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByResultId(
    resultId: SpecialCategoryRetirementAnalysisResultId,
  ): Promise<
    GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult[]
  > {
    const data = await this.repository.find({
      where: {
        specialCategoryRetirementAnalysisResult: { id: resultId.toString() },
        deletedAt: IsNull(),
      },
      relations: { specialCategoryRetirementAnalysisResult: true },
    });
    return this.mapperGateway.mapArray(
      data,
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
      GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult,
    );
  }
}
