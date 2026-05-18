import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-work-periods/command/permanent-incapacity-benefit-terminated-work-periods.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/permanent-incapacity-benefit-terminated-work-periods.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedWorkPeriods(
    props: PermanentIncapacityBenefitTerminatedWorkPeriodsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedWorkPeriodsEntity,
      PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPermanentIncapacityBenefitTerminatedId(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminated: {
            id: permanentIncapacityBenefitTerminatedId.toString(),
          },
        });
    };
  }
}
