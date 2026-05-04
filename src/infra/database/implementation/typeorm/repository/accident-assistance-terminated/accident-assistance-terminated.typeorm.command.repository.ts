import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AccidentAssistanceTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/command/accident-assistance-terminated.command.repository.gateway';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedTypeormEntity>
  implements AccidentAssistanceTerminatedCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminated(
    props: AccidentAssistanceTerminatedEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedEntity,
      AccidentAssistanceTerminatedTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAccidentAssistanceTerminated(
    id: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedEntity,
      AccidentAssistanceTerminatedTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateAccidentAssistanceTerminatedEventContext(
    id: AccidentAssistanceTerminatedId,
    accidentDate: Date,
    accidentDescription: string,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      accidentDate,
      accidentDescription,
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }

  public deleteAccidentAssistanceTerminated(
    id: AccidentAssistanceTerminatedId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
