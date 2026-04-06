import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TutorialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/tutorial.typeorm.entity';
import { TutorialEntity } from '@module/customer/tutorial/domain/schema/entity/tutorial/tutorial.entity';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

@Injectable()
export class TutorialEntityAutoMapperProfile {
  protected readonly _type = TutorialEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: TutorialTypeormEntity,
    ): TutorialEntity => {
      return new TutorialEntity({
        id: new TutorialId(source.id),
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

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      TutorialTypeormEntity,
      TutorialEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: TutorialEntity,
    ): TutorialTypeormEntity => {
      return TutorialTypeormEntity.build({
        id: source.id.toString(),
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

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      TutorialEntity,
      TutorialTypeormEntity,
      mappingFunction,
    );
  }
}
