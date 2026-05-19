import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-insured-status/command/temporary-incapacity-benefit-rejection-insured-status.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/temporary-incapacity-benefit-rejection-insured-status.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionInsuredStatusTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionInsuredStatus(
    props: TemporaryIncapacityBenefitRejectionInsuredStatusEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionInsuredStatusEntity,
      TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitRejectionId(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitRejection: {
            id: temporaryIncapacityBenefitRejectionId.toString(),
          },
        });
    };
  }
}
