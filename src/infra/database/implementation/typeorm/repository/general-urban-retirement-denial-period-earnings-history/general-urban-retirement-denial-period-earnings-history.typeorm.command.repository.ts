import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-period-earnings-history/command/general-urban-retirement-denial-period-earnings-history.command.repository.gateway';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';

@Injectable()
export class GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity>
  implements
    GeneralUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenialPeriodEarningsHistory(
    props: GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity,
      GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByGeneralUrbanRetirementDenialPeriodId(
    generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
        )
        .softDelete({
          generalUrbanRetirementDenialPeriod: {
            id: generalUrbanRetirementDenialPeriodId.toString(),
          },
        });
    };
  }
}
