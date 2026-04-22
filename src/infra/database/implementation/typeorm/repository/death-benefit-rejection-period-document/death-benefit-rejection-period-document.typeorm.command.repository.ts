import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period-document/command/death-benefit-rejection-period-document.command.repository.gateway';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeathBenefitRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/death-benefit-rejection-period-document.entity';

@Injectable()
export class DeathBenefitRejectionPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionPeriodDocumentTypeormEntity>
  implements DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionPeriodDocumentTypeormEntity)
    repository: Repository<DeathBenefitRejectionPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionPeriodDocument(
    props: DeathBenefitRejectionPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionPeriodDocumentEntity,
      DeathBenefitRejectionPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitRejectionPeriodId(
    deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitRejectionPeriodDocumentTypeormEntity)
        .softDelete({
          deathBenefitRejectionPeriod: {
            id: deathBenefitRejectionPeriodId.toString(),
          },
        });
    };
  }
}
