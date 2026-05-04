import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-work-periods/command/temporary-incapacity-benefit-termination-work-periods.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/temporary-incapacity-benefit-termination-work-periods.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationWorkPeriods(
    props: TemporaryIncapacityBenefitTerminationWorkPeriodsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationWorkPeriodsEntity,
      TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitTerminationId(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitTermination: {
            id: temporaryIncapacityBenefitTerminationId.toString(),
          },
        });
    };
  }
}
