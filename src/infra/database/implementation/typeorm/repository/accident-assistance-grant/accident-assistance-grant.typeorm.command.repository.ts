import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { AccidentAssistanceGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/command/accident-assistance-grant.command.repository.gateway';
import { AccidentAssistanceGrantEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';

@Injectable()
export class AccidentAssistanceGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceGrantTypeormEntity>
  implements AccidentAssistanceGrantCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceGrantTypeormEntity)
    repository: Repository<AccidentAssistanceGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceGrant(
    props: AccidentAssistanceGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceGrantEntity,
      AccidentAssistanceGrantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAccidentAssistanceGrant(
    id: AccidentAssistanceGrantId,
    props: AccidentAssistanceGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceGrantEntity,
      AccidentAssistanceGrantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateAccidentAssistanceGrantResultId(
    id: AccidentAssistanceGrantId,
    resultId: AccidentAssistanceGrantResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      accidentAssistanceGrantResult:
        AccidentAssistanceGrantResultTypeormEntity.build({
          id: resultId.toString(),
        } as AccidentAssistanceGrantResultTypeormEntity),
    });
  }
}
