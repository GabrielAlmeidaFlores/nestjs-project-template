import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-disability-analysis-document/command/temporary-disability-benefits-terminated-disability-analysis-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/temporary-disability-benefits-terminated-disability-analysis-document.entity';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocument(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
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
          TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
        )
        .softDelete({
          temporaryDisabilityBenefitsTerminatedDisabilityAnalysis: {
            id: temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
