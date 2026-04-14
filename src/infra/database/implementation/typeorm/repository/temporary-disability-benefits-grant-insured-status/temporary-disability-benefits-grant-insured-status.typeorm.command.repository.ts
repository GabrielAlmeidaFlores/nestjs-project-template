import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-insured-status/command/temporary-disability-benefits-grant-insured-status.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantInsuredStatusTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity>
  implements
    TemporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantInsuredStatus(
    props: TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
      TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryDisabilityBenefitsGrantInsuredStatus(
    id: TemporaryDisabilityBenefitsGrantInsuredStatusId,
    props: TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
      TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
        )
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
