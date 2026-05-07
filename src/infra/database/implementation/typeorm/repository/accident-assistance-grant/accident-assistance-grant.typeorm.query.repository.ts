import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/accident-assistance-grant.query.repository.gateway';
import { GetAccidentAssistanceGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/result/get-accident-assistance-grant-with-relations.query.result';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class AccidentAssistanceGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<AccidentAssistanceGrantTypeormEntity>
  implements AccidentAssistanceGrantQueryRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceGrantTypeormEntity)
    repository: Repository<AccidentAssistanceGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByAccidentAssistanceGrantIdOrFailWithRelations(
    id: AccidentAssistanceGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAccidentAssistanceGrantWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          accidentAssistanceGrantResult: true,
          accidentAssistanceGrantDocument: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      AccidentAssistanceGrantTypeormEntity,
      GetAccidentAssistanceGrantWithRelationsQueryResult,
    );
  }
}
