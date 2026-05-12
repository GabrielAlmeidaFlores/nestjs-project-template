import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-document.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SpecialRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/special-retirement-grant-period-document.entity';
import { SpecialRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/value-object/special-retirement-grant-period-document-id/special-retirement-grant-period-document-id.value-object';

@Injectable()
export class SpecialRetirementGrantPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SpecialRetirementGrantPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantPeriodDocumentTypeormEntity,
    ): SpecialRetirementGrantPeriodDocumentEntity => {
      if (!source.specialRetirementGrantPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialRetirementGrantPeriodDocumentEntity.name,
          sourceClass: SpecialRetirementGrantPeriodDocumentTypeormEntity.name,
        });
      }

      return new SpecialRetirementGrantPeriodDocumentEntity({
        id: new SpecialRetirementGrantPeriodDocumentId(source.id),
        type: source.type,
        document: source.document,
        specialRetirementGrantPeriodId: source.specialRetirementGrantPeriod.id,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialRetirementGrantPeriodDocumentTypeormEntity,
      SpecialRetirementGrantPeriodDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialRetirementGrantPeriodDocumentEntity,
    ): SpecialRetirementGrantPeriodDocumentTypeormEntity => {
      const specialRetirementGrantPeriod =
        SpecialRetirementGrantPeriodTypeormEntity.build({
          id: source.specialRetirementGrantPeriodId,
        } as SpecialRetirementGrantPeriodTypeormEntity);

      return SpecialRetirementGrantPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        type: source.type,
        document: source.document,
        specialRetirementGrantPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialRetirementGrantPeriodDocumentEntity,
      SpecialRetirementGrantPeriodDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
