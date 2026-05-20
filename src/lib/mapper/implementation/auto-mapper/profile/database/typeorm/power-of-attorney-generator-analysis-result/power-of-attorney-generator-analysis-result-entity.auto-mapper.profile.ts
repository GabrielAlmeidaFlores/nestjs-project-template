import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PowerOfAttorneyGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/power-of-attorney-generator.typeorm.entity';
import { PowerOfAttorneyGeneratorEntity } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.entity';
import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';

@Injectable()
export class PowerOfAttorneyGeneratorEntityAutoMapperProfile {
  protected readonly _type =
    PowerOfAttorneyGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PowerOfAttorneyGeneratorTypeormEntity,
    ): PowerOfAttorneyGeneratorEntity => {
      return new PowerOfAttorneyGeneratorEntity({
        ...source,
        id: new PowerOfAttorneyGeneratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PowerOfAttorneyGeneratorTypeormEntity,
      PowerOfAttorneyGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PowerOfAttorneyGeneratorEntity,
    ): PowerOfAttorneyGeneratorTypeormEntity => {
      return PowerOfAttorneyGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PowerOfAttorneyGeneratorEntity,
      PowerOfAttorneyGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
