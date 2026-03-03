import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeRequestGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-request-generator.typeorm.entity';
import { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';

@Injectable()
export class AdministrativeRequestGeneratorEntityAutoMapperProfile {
  protected readonly _type =
    AdministrativeRequestGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeRequestGeneratorTypeormEntity,
    ): AdministrativeRequestGeneratorEntity => {
      return new AdministrativeRequestGeneratorEntity({
        ...source,
        id: new AdministrativeRequestGeneratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeRequestGeneratorTypeormEntity,
      AdministrativeRequestGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AdministrativeRequestGeneratorEntity,
    ): AdministrativeRequestGeneratorTypeormEntity => {
      return AdministrativeRequestGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AdministrativeRequestGeneratorEntity,
      AdministrativeRequestGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
