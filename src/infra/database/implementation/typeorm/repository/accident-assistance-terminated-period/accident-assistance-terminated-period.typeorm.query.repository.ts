import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/query/accident-assistance-terminated-period.query.repository.gateway';
import { GetAccidentAssistanceTerminatedPeriodQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/query/result/get-accident-assistance-terminated-period.query.result';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<AccidentAssistanceTerminatedPeriodTypeormEntity>
  implements AccidentAssistanceTerminatedPeriodQueryRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedPeriodTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneAccidentAssistanceTerminatedPeriodByIdOrFail(
    id: AccidentAssistanceTerminatedPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAccidentAssistanceTerminatedPeriodQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      AccidentAssistanceTerminatedPeriodTypeormEntity,
      GetAccidentAssistanceTerminatedPeriodQueryResult,
    );
  }
}
