import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-document/command/temporary-disability-benefits-grant-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity';
import { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantDocumentTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantDocumentTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantDocument(
    props: TemporaryDisabilityBenefitsGrantDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantDocumentEntity,
      TemporaryDisabilityBenefitsGrantDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteTemporaryDisabilityBenefitsGrantDocument(
    id: TemporaryDisabilityBenefitsGrantDocumentId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(TemporaryDisabilityBenefitsGrantDocumentTypeormEntity)
        .softDelete(id.toString());
    };
  }

  public deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(TemporaryDisabilityBenefitsGrantDocumentTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where(
          'temporary_disability_benefits_grant_id = :temporaryDisabilityBenefitsGrantId',
          {
            temporaryDisabilityBenefitsGrantId:
              temporaryDisabilityBenefitsGrantId.toString(),
          },
        )
        .execute();
    };
  }
}
