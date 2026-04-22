import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/command/death-benefit-rejection-period.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/death-benefit-rejection-period.entity';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

@Injectable()
export class DeathBenefitRejectionPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionPeriodTypeormEntity>
  implements DeathBenefitRejectionPeriodCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionPeriodTypeormEntity)
    repository: Repository<DeathBenefitRejectionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionPeriod(
    props: DeathBenefitRejectionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionPeriodEntity,
      DeathBenefitRejectionPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitRejectionPeriod(
    id: DeathBenefitRejectionPeriodId,
    props: DeathBenefitRejectionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionPeriodEntity,
      DeathBenefitRejectionPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteDeathBenefitRejectionPeriod(
    id: DeathBenefitRejectionPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByDeathBenefitRejectionId(
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitRejectionPeriodTypeormEntity)
        .softDelete({
          deathBenefitRejection: { id: deathBenefitRejectionId.toString() },
        });
    };
  }
}
