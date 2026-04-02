import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TutorialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/tutorial.typeorm.entity';
import { GetTutorialQueryResult } from '@module/customer/tutorial/domain/repository/tutorial/query/result/get-tutorial.query.result';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

@Injectable()
export class GetTutorialQueryResultAutoMapperProfile {
  protected readonly _type = GetTutorialQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: TutorialTypeormEntity,
    ): GetTutorialQueryResult => {
      return GetTutorialQueryResult.build({
        tutorialId: new TutorialId(source.id),
        name: source.name,
        link: source.link,
        functionality: source.functionality,
        description: source.description,
        image: source.image,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      TutorialTypeormEntity,
      GetTutorialQueryResult,
      mappingFunction,
    );
  }
}
