import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-disability-analysis-cid/command/temporary-incapacity-benefit-termination-disability-analysis-cid.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/temporary-incapacity-benefit-termination-disability-analysis-cid.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationDisabilityAnalysisCid(
    props: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
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
          TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitTerminationDisabilityAnalysis: {
            id: temporaryIncapacityBenefitTerminationDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
