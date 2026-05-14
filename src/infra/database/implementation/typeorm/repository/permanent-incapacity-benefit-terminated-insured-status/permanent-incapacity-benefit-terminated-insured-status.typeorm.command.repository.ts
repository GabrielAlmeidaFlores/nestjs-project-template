import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-insured-status/command/permanent-incapacity-benefit-terminated-insured-status.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedInsuredStatusEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/permanent-incapacity-benefit-terminated-insured-status.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedInsuredStatusTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedInsuredStatus(
    props: PermanentIncapacityBenefitTerminatedInsuredStatusEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedInsuredStatusEntity,
      PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
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
          PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminated: {
            id: permanentIncapacityBenefitTerminatedId.toString(),
          },
        });
    };
  }
}
