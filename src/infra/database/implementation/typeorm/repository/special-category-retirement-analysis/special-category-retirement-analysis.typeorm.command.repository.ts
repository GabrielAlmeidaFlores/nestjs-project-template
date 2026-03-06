import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialCategoryRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/command/special-category-retirement-analysis.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialCategoryRetirementAnalysisTypeormEntity>
  implements SpecialCategoryRetirementAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialCategoryRetirementAnalysis(
    props: SpecialCategoryRetirementAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisEntity,
      SpecialCategoryRetirementAnalysisTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateSpecialCategoryRetirementAnalysis(
    id: SpecialCategoryRetirementAnalysisId,
    props: SpecialCategoryRetirementAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisEntity,
      SpecialCategoryRetirementAnalysisTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public deleteSpecialCategoryRetirementAnalysis(
    id: SpecialCategoryRetirementAnalysisId,
  ): TransactionType {
    return this.update(id.toString(), { deletedAt: new Date() });
  }
}
