import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-period-document/command/temporary-disability-benefits-grant-period-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/value-object/temporary-disability-benefits-grant-period-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity>
  implements
    TemporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantPeriodDocument(
    props: TemporaryDisabilityBenefitsGrantPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantPeriodDocumentEntity,
      TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteTemporaryDisabilityBenefitsGrantPeriodDocument(
    id: TemporaryDisabilityBenefitsGrantPeriodDocumentId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
        )
        .softDelete(id.toString());
    };
  }
}
