import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-insured-status-document/command/temporary-disability-benefits-grant-insured-status-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/value-object/temporary-disability-benefits-grant-insured-status-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity>
  implements
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantInsuredStatusDocument(
    props: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity,
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteTemporaryDisabilityBenefitsGrantInsuredStatusDocument(
    id: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
        )
        .softDelete(id.toString());
    };
  }
}
