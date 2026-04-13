import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantDependentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-dependent-document/command/death-benefit-grant-dependent-document.command.repository.gateway';
import { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import { DeathBenefitGrantDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.entity';

@Injectable()
export class DeathBenefitGrantDependentDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantDependentDocumentTypeormEntity>
  implements DeathBenefitGrantDependentDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantDependentDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantDependentDocumentTypeormEntity)
    repository: Repository<DeathBenefitGrantDependentDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantDependentDocument(
    props: DeathBenefitGrantDependentDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantDependentDocumentEntity,
      DeathBenefitGrantDependentDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitGrantDependentId(
    deathBenefitGrantDependentId: DeathBenefitGrantDependentId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitGrantDependentDocumentTypeormEntity)
        .softDelete({
          deathBenefitGrantDependent: {
            id: deathBenefitGrantDependentId.toString(),
          },
        });
    };
  }
}
