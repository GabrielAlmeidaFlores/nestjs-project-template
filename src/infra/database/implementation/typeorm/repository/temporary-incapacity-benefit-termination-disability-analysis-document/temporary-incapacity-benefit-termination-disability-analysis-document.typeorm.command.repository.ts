import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-disability-analysis-document/command/temporary-incapacity-benefit-termination-disability-analysis-document.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/temporary-incapacity-benefit-termination-disability-analysis-document.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocument(
    props: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitTerminationDisabilityAnalysisId(
    temporaryIncapacityBenefitTerminationDisabilityAnalysisId: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitTerminationDisabilityAnalysis: {
            id: temporaryIncapacityBenefitTerminationDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
