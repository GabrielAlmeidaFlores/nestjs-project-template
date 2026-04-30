import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-insured-status-document/command/temporary-disability-benefits-terminated-insured-status-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/temporary-disability-benefits-terminated-insured-status-document.entity';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedInsuredStatusDocument(
    props: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsTerminatedInsuredStatusId(
    temporaryDisabilityBenefitsTerminatedInsuredStatusId: TemporaryDisabilityBenefitsTerminatedInsuredStatusId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
        )
        .softDelete({
          temporaryDisabilityBenefitsTerminatedInsuredStatus: {
            id: temporaryDisabilityBenefitsTerminatedInsuredStatusId.toString(),
          },
        });
    };
  }
}
