import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-inss-benefit/command/death-benefit-inss-benefit.command.repository.gateway';
import { DeathBenefitInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/death-benefit-inss-benefit.entity';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

@Injectable()
export class DeathBenefitInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitInssBenefitTypeormEntity>
  implements DeathBenefitInssBenefitCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitInssBenefitTypeormEntity)
    repository: Repository<DeathBenefitInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitInssBenefit(props: DeathBenefitInssBenefitEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitInssBenefitEntity,
      DeathBenefitInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitId(deathBenefitId: DeathBenefitId): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitInssBenefitTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_id = :deathBenefitId', {
          deathBenefitId: deathBenefitId.toString(),
        })
        .execute();
    };
  }
}
