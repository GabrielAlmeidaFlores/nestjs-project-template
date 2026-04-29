import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-insured-status/command/temporary-incapacity-benefit-termination-insured-status.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/temporary-incapacity-benefit-termination-insured-status.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationInsuredStatusTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationInsuredStatus(
    props: TemporaryIncapacityBenefitTerminationInsuredStatusEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationInsuredStatusEntity,
      TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
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
          TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitTermination: {
            id: temporaryIncapacityBenefitTerminationId.toString(),
          },
        });
    };
  }
}
