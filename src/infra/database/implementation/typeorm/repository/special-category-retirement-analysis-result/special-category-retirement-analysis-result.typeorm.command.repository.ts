import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/command/special-category-retirement-analysis-result.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialCategoryRetirementAnalysisResultTypeormEntity>
  implements SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisResultTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialCategoryRetirementAnalysisResult(
    props: SpecialCategoryRetirementAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisResultEntity,
      SpecialCategoryRetirementAnalysisResultTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateSpecialCategoryRetirementAnalysisResult(
    id: SpecialCategoryRetirementAnalysisResultId,
    props: SpecialCategoryRetirementAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisResultEntity,
      SpecialCategoryRetirementAnalysisResultTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
