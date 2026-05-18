import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-retirement-rule.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/command/survivor-pension-analysis-result-retirement-rule.command.repository.gateway';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/survivor-pension-analysis-result-retirement-rule.entity';
import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultRetirementRuleTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisResultRetirementRuleTypeormEntity>
  implements SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisResultRetirementRuleTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SurvivorPensionAnalysisResultRetirementRuleTypeormEntity)
    repository: Repository<SurvivorPensionAnalysisResultRetirementRuleTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisResultRetirementRule(
    props: SurvivorPensionAnalysisResultRetirementRuleEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisResultRetirementRuleEntity,
      SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSurvivorPensionAnalysisResultRetirementRule(
    id: SurvivorPensionAnalysisResultRetirementRuleId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisResultId(
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(SurvivorPensionAnalysisResultRetirementRuleTypeormEntity)
        .softDelete({
          survivorPensionAnalysisResult: {
            id: survivorPensionAnalysisResultId.toString(),
          },
        });
    };
  }
}
