import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-inss-benefit/command/death-benefit-rejection-inss-benefit.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity';

@Injectable()
export class DeathBenefitRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionInssBenefitTypeormEntity>
  implements DeathBenefitRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionInssBenefitTypeormEntity)
    repository: Repository<DeathBenefitRejectionInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionInssBenefit(
    props: DeathBenefitRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionInssBenefitEntity,
      DeathBenefitRejectionInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitRejectionId(
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitRejectionInssBenefitTypeormEntity)
        .softDelete({
          deathBenefitRejection: { id: deathBenefitRejectionId.toString() },
        });
    };
  }
}
