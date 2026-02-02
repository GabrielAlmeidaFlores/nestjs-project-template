import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InitialPetitionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/initial-petition-generator.typeorm.entity';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { InitialPetitionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result.entity';

@Injectable()
export class InitialPetitionGeneratorEntityAutoMapperProfile {
  protected readonly _type =
    InitialPetitionGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: InitialPetitionGeneratorTypeormEntity,
    ): InitialPetitionGeneratorEntity => {
      return new InitialPetitionGeneratorEntity({
        ...source,
        id: new InitialPetitionGeneratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InitialPetitionGeneratorTypeormEntity,
      InitialPetitionGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: InitialPetitionGeneratorEntity,
    ): InitialPetitionGeneratorTypeormEntity => {
      return InitialPetitionGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      InitialPetitionGeneratorEntity,
      InitialPetitionGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
