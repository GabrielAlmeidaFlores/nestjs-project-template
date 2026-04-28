import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-legal-proceeding.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import { BpcDisabilityTerminationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/value-object/bpc-disability-termination-legal-proceeding-id/bpc-disability-termination-legal-proceeding-id.value-object';

@Injectable()
export class BpcDisabilityTerminationLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationLegalProceedingTypeormEntity,
    ): BpcDisabilityTerminationLegalProceedingEntity => {
      if (!source.bpcDisabilityTermination) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityTerminationLegalProceedingEntity.name,
          sourceClass:
            BpcDisabilityTerminationLegalProceedingTypeormEntity.name,
        });
      }

      return new BpcDisabilityTerminationLegalProceedingEntity({
        id: new BpcDisabilityTerminationLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        bpcDisabilityTerminationId: new BpcDisabilityTerminationId(
          source.bpcDisabilityTermination.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationLegalProceedingTypeormEntity,
      BpcDisabilityTerminationLegalProceedingEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationLegalProceedingEntity,
    ): BpcDisabilityTerminationLegalProceedingTypeormEntity => {
      return BpcDisabilityTerminationLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        bpcDisabilityTermination: {
          id: source.bpcDisabilityTerminationId.toString(),
        } as BpcDisabilityTerminationTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationLegalProceedingEntity,
      BpcDisabilityTerminationLegalProceedingTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
