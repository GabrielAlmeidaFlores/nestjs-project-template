import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period-document/command/death-benefit-period-document.command.repository.gateway';
import { DeathBenefitPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/death-benefit-period-document.entity';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

@Injectable()
export class DeathBenefitPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitPeriodDocumentTypeormEntity>
  implements DeathBenefitPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitPeriodDocumentTypeormEntity)
    repository: Repository<DeathBenefitPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitPeriodDocument(props: DeathBenefitPeriodDocumentEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitPeriodDocumentEntity,
      DeathBenefitPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitPeriodId(deathBenefitPeriodId: DeathBenefitPeriodId): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitPeriodDocumentTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_period_id = :deathBenefitPeriodId', {
          deathBenefitPeriodId: deathBenefitPeriodId.toString(),
        })
        .execute();
    };
  }
}
