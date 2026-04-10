import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-document/command/death-benefit-grant-document.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';

@Injectable()
export class DeathBenefitGrantDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantDocumentTypeormEntity>
  implements DeathBenefitGrantDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantDocumentTypeormEntity)
    repository: Repository<DeathBenefitGrantDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantDocument(
    props: DeathBenefitGrantDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantDocumentEntity,
      DeathBenefitGrantDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitGrantId(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitGrantDocumentTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_id = :deathBenefitGrantId', {
          deathBenefitGrantId: deathBenefitGrantId.toString(),
        })
        .execute();
    };
  }
}
