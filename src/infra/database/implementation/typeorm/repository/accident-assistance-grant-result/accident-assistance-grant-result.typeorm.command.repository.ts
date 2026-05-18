import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant-result/command/accident-assistance-grant-result.command.repository.gateway';
import { AccidentAssistanceGrantResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity';

@Injectable()
export class AccidentAssistanceGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceGrantResultTypeormEntity>
  implements AccidentAssistanceGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceGrantResultTypeormEntity)
    repository: Repository<AccidentAssistanceGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceGrantResult(
    props: AccidentAssistanceGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceGrantResultEntity,
      AccidentAssistanceGrantResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAccidentAssistanceGrantResult(
    props: AccidentAssistanceGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceGrantResultEntity,
      AccidentAssistanceGrantResultTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }
}
