import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/command/survivor-pension-analysis-deceased-benefit-dependents.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity>
  implements
    SurvivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisDeceasedBenefitDependents(
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSurvivorPensionAnalysisDeceasedBenefitDependents(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSurvivorPensionAnalysisDeceasedBenefitDependents(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
        )
        .softDelete({
          survivorPensionAnalysis: { id: survivorPensionAnalysisId.toString() },
        });
    };
  }
}
