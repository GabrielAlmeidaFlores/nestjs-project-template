import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-document/command/death-benefit-grant-period-document.command.repository.gateway';
import { DeathBenefitGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/death-benefit-grant-period-document.entity';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

@Injectable()
export class DeathBenefitGrantPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantPeriodDocumentTypeormEntity>
  implements DeathBenefitGrantPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantPeriodDocumentTypeormEntity)
    repository: Repository<DeathBenefitGrantPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantPeriodDocument(
    props: DeathBenefitGrantPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantPeriodDocumentEntity,
      DeathBenefitGrantPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitGrantPeriodId(
    DeathBenefitGrantPeriodId: DeathBenefitGrantPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitGrantPeriodDocumentTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_period_id = :DeathBenefitGrantPeriodId', {
          DeathBenefitGrantPeriodId: DeathBenefitGrantPeriodId.toString(),
        })
        .execute();
    };
  }
}
