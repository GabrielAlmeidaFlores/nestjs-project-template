import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-inss-benefit.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import { BpcDisabilityTerminationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/value-object/bpc-disability-termination-inss-benefit-id/bpc-disability-termination-inss-benefit-id.value-object';

@Injectable()
export class BpcDisabilityTerminationInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationInssBenefitTypeormEntity,
    ): BpcDisabilityTerminationInssBenefitEntity => {
      if (!source.bpcDisabilityTermination) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityTerminationInssBenefitEntity.name,
          sourceClass: BpcDisabilityTerminationInssBenefitTypeormEntity.name,
        });
      }

      return new BpcDisabilityTerminationInssBenefitEntity({
        id: new BpcDisabilityTerminationInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcDisabilityTerminationInssBenefitTypeormEntity,
      BpcDisabilityTerminationInssBenefitEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationInssBenefitEntity,
    ): BpcDisabilityTerminationInssBenefitTypeormEntity => {
      return BpcDisabilityTerminationInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcDisabilityTerminationInssBenefitEntity,
      BpcDisabilityTerminationInssBenefitTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
