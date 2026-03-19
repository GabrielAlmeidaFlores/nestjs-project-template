import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TutorialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/tutorial.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTutorialQueryResult } from '@module/customer/tutorial/domain/repository/tutorial/query/result/get-tutorial.query.result';
import { TutorialQueryRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/query/tutorial.query.repository.gateway';

@Injectable()
export class TutorialTypeormQueryRepository
  extends BaseTypeormQueryRepository<TutorialTypeormEntity>
  implements TutorialQueryRepositoryGateway
{
  protected readonly _type = TutorialTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TutorialTypeormEntity)
    repository: Repository<TutorialTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listTutorials(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetTutorialQueryResult>> {
    const data = await this.list(pagination);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      TutorialTypeormEntity,
      GetTutorialQueryResult,
    );

    return new ListDataOutputModel<GetTutorialQueryResult>({
      ...data,
      resource: mappedData,
    });
  }
}
