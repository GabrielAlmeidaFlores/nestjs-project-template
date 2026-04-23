import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { GetAccidentAssistanceTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-with-relations.query.result';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedTypeormQueryRepository
  extends BaseTypeormQueryRepository<AccidentAssistanceTerminatedTypeormEntity>
  implements AccidentAssistanceTerminatedQueryRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneAccidentAssistanceTerminatedByIdOrFail(
    id: AccidentAssistanceTerminatedId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAccidentAssistanceTerminatedWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
        relations: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          accidentAssistanceTerminatedBenefit: true,
          accidentAssistanceTerminatedLegalProceeding: true,
          accidentAssistanceTerminatedDocument: true,
          accidentAssistanceTerminatedResult: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AccidentAssistanceTerminatedTypeormEntity,
      GetAccidentAssistanceTerminatedWithRelationsQueryResult,
    );

    return mappedData;
  }
}
