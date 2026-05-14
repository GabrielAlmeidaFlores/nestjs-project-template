import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-inss-benefit/command/permanent-incapacity-benefit-terminated-inss-benefit.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/permanent-incapacity-benefit-terminated-inss-benefit.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedInssBenefit(
    props: PermanentIncapacityBenefitTerminatedInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedInssBenefitEntity,
      PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
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
          PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminated: {
            id: permanentIncapacityBenefitTerminatedId.toString(),
          },
        });
    };
  }
}
