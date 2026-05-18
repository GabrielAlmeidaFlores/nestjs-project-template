import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-proceeding.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity';
import { BpcDisabilityGrantLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/value-object/bpc-disability-grant-legal-proceeding-id/bpc-disability-grant-legal-proceeding-id.value-object';

@Injectable()
export class BpcDisabilityGrantLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityGrantLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityGrantLegalProceedingTypeormEntity,
    ): BpcDisabilityGrantLegalProceedingEntity => {
      if (!source.BpcDisabilityGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityGrantLegalProceedingEntity.name,
          sourceClass: BpcDisabilityGrantLegalProceedingTypeormEntity.name,
        });
      }

      return new BpcDisabilityGrantLegalProceedingEntity({
        id: new BpcDisabilityGrantLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        BpcDisabilityGrantId: new BpcDisabilityGrantId(
          source.BpcDisabilityGrant.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantLegalProceedingTypeormEntity,
      BpcDisabilityGrantLegalProceedingEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityGrantLegalProceedingEntity,
    ): BpcDisabilityGrantLegalProceedingTypeormEntity => {
      return BpcDisabilityGrantLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        BpcDisabilityGrant: {
          id: source.BpcDisabilityGrantId.toString(),
        } as BpcDisabilityGrantTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantLegalProceedingEntity,
      BpcDisabilityGrantLegalProceedingTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
