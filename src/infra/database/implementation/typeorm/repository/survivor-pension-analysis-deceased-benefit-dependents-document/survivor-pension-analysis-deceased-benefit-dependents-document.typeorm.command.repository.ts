import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents-document/command/survivor-pension-analysis-deceased-benefit-dependents-document.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/survivor-pension-analysis-deceased-benefit-dependents-document.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/value-object/survivor-pension-analysis-deceased-benefit-dependents-document-id/survivor-pension-analysis-deceased-benefit-dependents-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity>
  implements
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisDeceasedBenefitDependentsDocument(
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity,
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSurvivorPensionAnalysisDeceasedBenefitDependentsDocument(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisDeceasedBenefitDependentsId(
    survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
        )
        .softDelete({
          deceasedBenefitDependents: {
            id: survivorPensionAnalysisDeceasedBenefitDependentsId.toString(),
          },
        });
    };
  }
}
