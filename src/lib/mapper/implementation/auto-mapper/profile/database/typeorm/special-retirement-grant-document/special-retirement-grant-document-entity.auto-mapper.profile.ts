import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';

@Injectable()
export class SpecialRetirementGrantDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SpecialRetirementGrantDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantDocumentTypeormEntity,
    ): SpecialRetirementGrantDocumentEntity => {
      if (!source.specialRetirementGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialRetirementGrantDocumentEntity.name,
          sourceClass: SpecialRetirementGrantDocumentTypeormEntity.name,
        });
      }

      return new SpecialRetirementGrantDocumentEntity({
        ...source,
        id: new SpecialRetirementGrantDocumentId(source.id),
        specialRetirementGrant: this.mapper.map(
          source.specialRetirementGrant,
          SpecialRetirementGrantTypeormEntity,
          SpecialRetirementGrantEntity,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantDocumentTypeormEntity,
      SpecialRetirementGrantDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialRetirementGrantDocumentEntity,
    ): SpecialRetirementGrantDocumentTypeormEntity => {
      return SpecialRetirementGrantDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrant: {
          id: source.specialRetirementGrant.id.toString(),
        } as SpecialRetirementGrantTypeormEntity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantDocumentEntity,
      SpecialRetirementGrantDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
