import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-previous-benefits-document/command/temporary-disability-benefits-grant-previous-benefits-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/value-object/temporary-disability-benefits-grant-previous-benefits-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity>
  implements
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantPreviousBenefitsDocument(
    props: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteTemporaryDisabilityBenefitsGrantPreviousBenefitsDocument(
    id: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
        )
        .softDelete(id.toString());
    };
  }
}
