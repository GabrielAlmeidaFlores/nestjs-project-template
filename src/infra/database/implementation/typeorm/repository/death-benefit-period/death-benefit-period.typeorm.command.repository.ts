import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/command/death-benefit-period.command.repository.gateway';
import { DeathBenefitPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/death-benefit-period.entity';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

@Injectable()
export class DeathBenefitPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitPeriodTypeormEntity>
  implements DeathBenefitPeriodCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitPeriodTypeormEntity)
    repository: Repository<DeathBenefitPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitPeriod(props: DeathBenefitPeriodEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitPeriodEntity,
      DeathBenefitPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitPeriod(
    id: DeathBenefitPeriodId,
    props: DeathBenefitPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitPeriodEntity,
      DeathBenefitPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteDeathBenefitPeriod(id: DeathBenefitPeriodId): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByDeathBenefitId(deathBenefitId: DeathBenefitId): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitPeriodTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_id = :deathBenefitId', {
          deathBenefitId: deathBenefitId.toString(),
        })
        .execute();
    };
  }
}
