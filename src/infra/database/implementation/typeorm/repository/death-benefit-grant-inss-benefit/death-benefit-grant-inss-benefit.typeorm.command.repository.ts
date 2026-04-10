import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-inss-benefit/command/death-benefit-grant-inss-benefit.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';

@Injectable()
export class DeathBenefitGrantInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantInssBenefitTypeormEntity>
  implements DeathBenefitGrantInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantInssBenefitTypeormEntity)
    repository: Repository<DeathBenefitGrantInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantInssBenefit(
    props: DeathBenefitGrantInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantInssBenefitEntity,
      DeathBenefitGrantInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitGrantId(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitGrantInssBenefitTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_id = :deathBenefitGrantId', {
          deathBenefitGrantId: deathBenefitGrantId.toString(),
        })
        .execute();
    };
  }
}
