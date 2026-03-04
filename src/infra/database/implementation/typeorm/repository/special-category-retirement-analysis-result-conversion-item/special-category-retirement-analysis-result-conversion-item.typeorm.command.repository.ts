import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-conversion-item.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/command/special-category-retirement-analysis-result-conversion-item.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import { SpecialCategoryRetirementAnalysisResultConversionItemEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/special-category-retirement-analysis-result-conversion-item.entity';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultConversionItemTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity>
  implements
    SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultConversionItemTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
    )
    repository: Repository<SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialCategoryRetirementAnalysisResultConversionItem(
    props: SpecialCategoryRetirementAnalysisResultConversionItemEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisResultConversionItemEntity,
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByResultId(
    resultId: SpecialCategoryRetirementAnalysisResultId,
  ): TransactionType {
    return async (manager: any) => {
      await manager.update(
        SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
        {
          analysisResult: { id: resultId.toString() },
          deletedAt: IsNull(),
        },
        { deletedAt: new Date() },
      );
    };
  }
}
