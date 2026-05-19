import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-disability-analysis-cid/command/permanent-incapacity-benefit-terminated-disability-analysis-cid.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/permanent-incapacity-benefit-terminated-disability-analysis-cid.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedDisabilityAnalysisCid(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPermanentIncapacityBenefitTerminatedDisabilityAnalysisId(
    permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminatedDisabilityAnalysis: {
            id: permanentIncapacityBenefitTerminatedDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
