import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-disability-analysis/command/permanent-incapacity-benefit-terminated-disability-analysis.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/permanent-incapacity-benefit-terminated-disability-analysis.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedDisabilityAnalysis(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPermanentIncapacityBenefitTerminatedId(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminated: {
            id: permanentIncapacityBenefitTerminatedId.toString(),
          },
        });
    };
  }
}
