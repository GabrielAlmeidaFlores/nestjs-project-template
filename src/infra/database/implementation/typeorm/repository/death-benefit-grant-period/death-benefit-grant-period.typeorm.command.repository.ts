import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/command/death-benefit-grant-period.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

@Injectable()
export class DeathBenefitGrantPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantPeriodTypeormEntity>
  implements DeathBenefitGrantPeriodCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantPeriodTypeormEntity)
    repository: Repository<DeathBenefitGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantPeriod(
    props: DeathBenefitGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantPeriodEntity,
      DeathBenefitGrantPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitGrantPeriod(
    id: DeathBenefitGrantPeriodId,
    props: DeathBenefitGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantPeriodEntity,
      DeathBenefitGrantPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteDeathBenefitGrantPeriod(
    id: DeathBenefitGrantPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByDeathBenefitGrantId(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitGrantPeriodTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_id = :deathBenefitGrantId', {
          deathBenefitGrantId: deathBenefitGrantId.toString(),
        })
        .execute();
    };
  }
}
