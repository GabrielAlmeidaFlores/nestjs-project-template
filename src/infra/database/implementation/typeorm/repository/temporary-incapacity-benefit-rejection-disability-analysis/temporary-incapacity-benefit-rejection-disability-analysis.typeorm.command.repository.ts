import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-disability-analysis/command/temporary-incapacity-benefit-rejection-disability-analysis.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionDisabilityAnalysis(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitRejectionId(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitRejection: {
            id: temporaryIncapacityBenefitRejectionId.toString(),
          },
        });
    };
  }
}
