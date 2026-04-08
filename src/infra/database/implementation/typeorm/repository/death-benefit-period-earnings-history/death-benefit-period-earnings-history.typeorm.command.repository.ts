import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period-earnings-history/command/death-benefit-period-earnings-history.command.repository.gateway';
import { DeathBenefitPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/death-benefit-period-earnings-history.entity';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

@Injectable()
export class DeathBenefitPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitPeriodEarningsHistoryTypeormEntity>
  implements DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitPeriodEarningsHistoryTypeormEntity)
    repository: Repository<DeathBenefitPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitPeriodEarningsHistory(props: DeathBenefitPeriodEarningsHistoryEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitPeriodEarningsHistoryEntity,
      DeathBenefitPeriodEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitPeriodId(deathBenefitPeriodId: DeathBenefitPeriodId): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitPeriodEarningsHistoryTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_period_id = :deathBenefitPeriodId', {
          deathBenefitPeriodId: deathBenefitPeriodId.toString(),
        })
        .execute();
    };
  }
}
