import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-disability-analysis-document/command/temporary-incapacity-benefit-rejection-disability-analysis-document.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/temporary-incapacity-benefit-rejection-disability-analysis-document.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocument(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitRejectionDisabilityAnalysisId(
    temporaryIncapacityBenefitRejectionDisabilityAnalysisId: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
        )
        .softDelete({
          disabilityAnalysis: {
            id: temporaryIncapacityBenefitRejectionDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
