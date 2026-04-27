import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-disability-analysis-cid/command/temporary-disability-benefits-terminated-disability-analysis-cid.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/temporary-disability-benefits-terminated-disability-analysis-cid.entity';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCid(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
    temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
        )
        .softDelete({
          temporaryDisabilityBenefitsTerminatedDisabilityAnalysis: {
            id: temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
