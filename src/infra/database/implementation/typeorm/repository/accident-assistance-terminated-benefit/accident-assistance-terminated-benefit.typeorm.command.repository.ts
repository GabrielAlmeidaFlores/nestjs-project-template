import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-benefit/command/accident-assistance-terminated-benefit.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedBenefitEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity';

@Injectable()
export class AccidentAssistanceTerminatedBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedBenefitTypeormEntity>
  implements AccidentAssistanceTerminatedBenefitCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedBenefitTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminatedBenefit(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedBenefitEntity,
      AccidentAssistanceTerminatedBenefitTypeormEntity,
    );

    mappedData.accidentAssistanceTerminated = {
      id: accidentAssistanceTerminatedId.toString(),
    } as AccidentAssistanceTerminatedTypeormEntity;

    return this.create(mappedData);
  }

  public deleteAccidentAssistanceTerminatedBenefitByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceTerminatedBenefitTypeormEntity)
        .softDelete({
          accidentAssistanceTerminated: {
            id: accidentAssistanceTerminatedId.toString(),
          },
        });
    };
  }
}
