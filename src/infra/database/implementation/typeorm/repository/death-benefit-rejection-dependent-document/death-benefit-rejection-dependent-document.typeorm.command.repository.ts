import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionDependentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-dependent-document/command/death-benefit-rejection-dependent-document.command.repository.gateway';
import { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import { DeathBenefitRejectionDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.entity';

@Injectable()
export class DeathBenefitRejectionDependentDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionDependentDocumentTypeormEntity>
  implements DeathBenefitRejectionDependentDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionDependentDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionDependentDocumentTypeormEntity)
    repository: Repository<DeathBenefitRejectionDependentDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionDependentDocument(
    props: DeathBenefitRejectionDependentDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionDependentDocumentEntity,
      DeathBenefitRejectionDependentDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitRejectionDependentId(
    deathBenefitRejectionDependentId: DeathBenefitRejectionDependentId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitRejectionDependentDocumentTypeormEntity)
        .softDelete({
          deathBenefitRejectionDependent: {
            id: deathBenefitRejectionDependentId.toString(),
          },
        });
    };
  }
}
