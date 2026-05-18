import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-inss-benefit.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import { BpcElderlyCessationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/value-object/bpc-elderly-cessation-inss-benefit-id/bpc-elderly-cessation-inss-benefit-id.value-object';

@Injectable()
export class BpcElderlyCessationInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyCessationInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyCessationInssBenefitTypeormEntity,
    ): BpcElderlyCessationInssBenefitEntity => {
      if (!source.bpcElderlyCessation) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcElderlyCessationInssBenefitEntity.name,
          sourceClass: BpcElderlyCessationInssBenefitTypeormEntity.name,
        });
      }

      return new BpcElderlyCessationInssBenefitEntity({
        id: new BpcElderlyCessationInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        bpcElderlyCessationId: new BpcElderlyCessationId(
          source.bpcElderlyCessation.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationInssBenefitTypeormEntity,
      BpcElderlyCessationInssBenefitEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyCessationInssBenefitEntity,
    ): BpcElderlyCessationInssBenefitTypeormEntity => {
      return BpcElderlyCessationInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        bpcElderlyCessation: {
          id: source.bpcElderlyCessationId.toString(),
        } as BpcElderlyCessationTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationInssBenefitEntity,
      BpcElderlyCessationInssBenefitTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
