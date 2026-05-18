import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-legal-proceeding.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import { BpcDisabilityDenialLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/value-object/bpc-disability-denial-legal-proceeding-id/bpc-disability-denial-legal-proceeding-id.value-object';

@Injectable()
export class BpcDisabilityDenialLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityDenialLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityDenialLegalProceedingTypeormEntity,
    ): BpcDisabilityDenialLegalProceedingEntity => {
      if (!source.bpcDisabilityDenial) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityDenialLegalProceedingEntity.name,
          sourceClass: BpcDisabilityDenialLegalProceedingTypeormEntity.name,
        });
      }

      return new BpcDisabilityDenialLegalProceedingEntity({
        id: new BpcDisabilityDenialLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        bpcDisabilityDenialId: new BpcDisabilityDenialId(
          source.bpcDisabilityDenial.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialLegalProceedingTypeormEntity,
      BpcDisabilityDenialLegalProceedingEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityDenialLegalProceedingEntity,
    ): BpcDisabilityDenialLegalProceedingTypeormEntity => {
      return BpcDisabilityDenialLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        bpcDisabilityDenial: {
          id: source.bpcDisabilityDenialId.toString(),
        } as BpcDisabilityDenialTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialLegalProceedingEntity,
      BpcDisabilityDenialLegalProceedingTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
