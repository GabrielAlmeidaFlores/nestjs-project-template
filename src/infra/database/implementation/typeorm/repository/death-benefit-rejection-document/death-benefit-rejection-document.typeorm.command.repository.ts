import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-document/command/death-benefit-rejection-document.command.repository.gateway';
import { DeathBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity';
import { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

@Injectable()
export class DeathBenefitRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionDocumentTypeormEntity>
  implements DeathBenefitRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionDocumentTypeormEntity)
    repository: Repository<DeathBenefitRejectionDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionDocument(
    props: DeathBenefitRejectionDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionDocumentEntity,
      DeathBenefitRejectionDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitRejectionInstitorId(
    deathBenefitRejectionInstitorId: DeathBenefitRejectionInstitorId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitRejectionDocumentTypeormEntity)
        .softDelete({
          deathBenefitRejectionInstitutor: {
            id: deathBenefitRejectionInstitorId.toString(),
          },
        });
    };
  }
}
