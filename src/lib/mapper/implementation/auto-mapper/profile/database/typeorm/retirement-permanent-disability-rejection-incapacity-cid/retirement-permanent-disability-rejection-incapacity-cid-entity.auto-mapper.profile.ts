import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-cid.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/value-object/retirement-permanent-disability-rejection-incapacity-cid-id/retirement-permanent-disability-rejection-incapacity-cid-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityCidEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityCidEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
      RetirementPermanentDisabilityRejectionIncapacityCidEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityCidEntity => {
          if (!source.retirementPermanentDisabilityRejectionIncapacity) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRejectionIncapacityCidEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRejectionIncapacityCidEntity({
            id: new RetirementPermanentDisabilityRejectionIncapacityCidId(
              source.id,
            ),
            cid: source.cid,
            type: source.type,
            retirementPermanentDisabilityRejectionIncapacityId:
              new RetirementPermanentDisabilityRejectionIncapacityId(
                source.retirementPermanentDisabilityRejectionIncapacity.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionIncapacityCidEntity,
      RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityCidEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity =>
          RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity.build(
            {
              id: source.id.toString(),
              cid: source.cid,
              type: source.type,
              retirementPermanentDisabilityRejectionIncapacity:
                RetirementPermanentDisabilityRejectionIncapacityTypeormEntity.build(
                  {
                    id: source.retirementPermanentDisabilityRejectionIncapacityId.toString(),
                  } as RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
