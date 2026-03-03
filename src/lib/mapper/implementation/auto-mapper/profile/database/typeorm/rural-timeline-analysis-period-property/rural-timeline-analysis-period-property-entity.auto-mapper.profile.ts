import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { RuralTimelineAnalysisPeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodPropertyEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodPropertyEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodPropertyTypeormEntity,
    ): RuralTimelineAnalysisPeriodPropertyEntity => {
      return new RuralTimelineAnalysisPeriodPropertyEntity({
        id: new RuralTimelineAnalysisPeriodPropertyId(source.id),
        propertyName: source.propertyName ?? null,
        ownerName: source.ownerName ?? null,
        postalCode:
          source.postalCode !== null && source.postalCode !== undefined
            ? new PostalCode(source.postalCode)
            : null,
        stateCode: source.stateCode ?? null,
        city: source.city ?? null,
        neighborhood: source.neighborhood ?? null,
        street: source.street ?? null,
        streetNumber: source.streetNumber ?? null,
        landOwnershipType: source.landOwnershipType ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
      RuralTimelineAnalysisPeriodPropertyEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodPropertyEntity,
    ): RuralTimelineAnalysisPeriodPropertyTypeormEntity => {
      return RuralTimelineAnalysisPeriodPropertyTypeormEntity.build({
        id: source.id.toString(),
        propertyName: source.propertyName,
        ownerName: source.ownerName,
        postalCode: source.postalCode?.toString() ?? null,
        stateCode: source.stateCode,
        city: source.city,
        neighborhood: source.neighborhood,
        street: source.street,
        streetNumber: source.streetNumber,
        landOwnershipType: source.landOwnershipType,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodPropertyEntity,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
      mappingFunction,
    );
  }
}
