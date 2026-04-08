import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitDependentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-dependent-document/command/death-benefit-dependent-document.command.repository.gateway';
import { DeathBenefitDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/death-benefit-dependent-document.entity';
import { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';

@Injectable()
export class DeathBenefitDependentDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitDependentDocumentTypeormEntity>
  implements DeathBenefitDependentDocumentCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitDependentDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitDependentDocumentTypeormEntity)
    repository: Repository<DeathBenefitDependentDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitDependentDocument(props: DeathBenefitDependentDocumentEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitDependentDocumentEntity,
      DeathBenefitDependentDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitDependentId(deathBenefitDependentId: DeathBenefitDependentId): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitDependentDocumentTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_dependent_id = :deathBenefitDependentId', {
          deathBenefitDependentId: deathBenefitDependentId.toString(),
        })
        .execute();
    };
  }
}
