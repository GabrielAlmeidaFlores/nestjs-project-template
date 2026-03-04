import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-rule-item.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/command/special-category-retirement-analysis-result-rule-item.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import { SpecialCategoryRetirementAnalysisResultRuleItemEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item.entity';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultRuleItemTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity>
  implements
    SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultRuleItemTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
    )
    repository: Repository<SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialCategoryRetirementAnalysisResultRuleItem(
    props: SpecialCategoryRetirementAnalysisResultRuleItemEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisResultRuleItemEntity,
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByResultId(
    resultId: SpecialCategoryRetirementAnalysisResultId,
  ): TransactionType {
    return async (manager: any) => {
      await manager.update(
        SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
        {
          analysisResult: { id: resultId.toString() },
          deletedAt: IsNull(),
        },
        { deletedAt: new Date() },
      );
    };
  }
}
