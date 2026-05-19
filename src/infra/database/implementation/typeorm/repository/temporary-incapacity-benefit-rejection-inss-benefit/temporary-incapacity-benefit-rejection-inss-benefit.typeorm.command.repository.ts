import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-inss-benefit/command/temporary-incapacity-benefit-rejection-inss-benefit.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/temporary-incapacity-benefit-rejection-inss-benefit.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionInssBenefit(
    props: TemporaryIncapacityBenefitRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionInssBenefitEntity,
      TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
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
          TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitRejection: {
            id: temporaryIncapacityBenefitRejectionId.toString(),
          },
        });
    };
  }
}
