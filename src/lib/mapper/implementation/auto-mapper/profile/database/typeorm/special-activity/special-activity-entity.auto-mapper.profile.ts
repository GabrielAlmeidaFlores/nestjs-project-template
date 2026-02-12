import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result.entity';

@Injectable()
export class SpecialActivityEntityAutoMapperProfile {
  protected readonly _type = SpecialActivityEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialActivityTypeormEntity,
    ): SpecialActivityEntity => {
      const specialActivityResult = source.specialActivityResult
        ? this.mapper.map(
            source.specialActivityResult,
            SpecialActivityResultTypeormEntity,
            SpecialActivityResultEntity,
          )
        : null;

      return new SpecialActivityEntity({
        id: new SpecialActivityId(source.id),
        specialActivityResult,
        specialActivityDocuments: null,
        specialActivityInssBenefit: null,
        specialActivityLegalProceeding: null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialActivityTypeormEntity,
      SpecialActivityEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialActivityEntity,
    ): SpecialActivityTypeormEntity => {
      const specialActivityResult = source.specialActivityResult
        ? this.mapper.map(
            source.specialActivityResult,
            SpecialActivityResultEntity,
            SpecialActivityResultTypeormEntity,
          )
        : null;

      return SpecialActivityTypeormEntity.build({
        id: source.id.toString(),
        specialActivityResult,
        specialActivityDocuments: null,
        specialActivityInssBenefit: undefined,
        specialActivityLegalProceeding: undefined,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialActivityEntity,
      SpecialActivityTypeormEntity,
      mappingFunction,
    );
  }
}
