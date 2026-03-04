import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-work-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisWorkPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity>
  implements SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway
{
  protected readonly _type = SpecialCategoryRetirementAnalysisWorkPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialCategoryRetirementAnalysisWorkPeriod(
    props: SpecialCategoryRetirementAnalysisWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisWorkPeriodEntity,
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateSpecialCategoryRetirementAnalysisWorkPeriod(
    id: SpecialCategoryRetirementAnalysisWorkPeriodId,
    props: SpecialCategoryRetirementAnalysisWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisWorkPeriodEntity,
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public deleteSpecialCategoryRetirementAnalysisWorkPeriod(
    id: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): TransactionType {
    return this.update(id.toString(), { deletedAt: new Date() });
  }
}
