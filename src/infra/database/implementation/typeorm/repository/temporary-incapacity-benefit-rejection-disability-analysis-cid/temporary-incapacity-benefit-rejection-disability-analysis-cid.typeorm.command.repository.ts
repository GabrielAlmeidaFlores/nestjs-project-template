import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-disability-analysis-cid/command/temporary-incapacity-benefit-rejection-disability-analysis-cid.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/temporary-incapacity-benefit-rejection-disability-analysis-cid.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionDisabilityAnalysisCid(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
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
          TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitRejectionDisabilityAnalysis: {
            id: temporaryIncapacityBenefitRejectionDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
