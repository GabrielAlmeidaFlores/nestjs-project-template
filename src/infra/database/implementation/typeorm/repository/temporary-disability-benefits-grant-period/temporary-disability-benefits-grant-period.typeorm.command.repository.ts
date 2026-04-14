import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-period/command/temporary-disability-benefits-grant-period.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantPeriodEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.entity';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantPeriodTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantPeriodTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantPeriod(
    props: TemporaryDisabilityBenefitsGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantPeriodEntity,
      TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryDisabilityBenefitsGrantPeriod(
    id: TemporaryDisabilityBenefitsGrantPeriodId,
    props: TemporaryDisabilityBenefitsGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantPeriodEntity,
      TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(TemporaryDisabilityBenefitsGrantPeriodTypeormEntity)
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
