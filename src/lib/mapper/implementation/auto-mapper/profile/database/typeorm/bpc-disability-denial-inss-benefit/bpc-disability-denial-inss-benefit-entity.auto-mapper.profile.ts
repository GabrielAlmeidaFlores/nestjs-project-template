import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-inss-benefit.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import { BpcDisabilityDenialInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/value-object/bpc-disability-denial-inss-benefit-id/bpc-disability-denial-inss-benefit-id.value-object';

@Injectable()
export class BpcDisabilityDenialInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityDenialInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityDenialInssBenefitTypeormEntity,
    ): BpcDisabilityDenialInssBenefitEntity => {
      if (!source.bpcDisabilityDenial) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityDenialInssBenefitEntity.name,
          sourceClass: BpcDisabilityDenialInssBenefitTypeormEntity.name,
        });
      }

      return new BpcDisabilityDenialInssBenefitEntity({
        id: new BpcDisabilityDenialInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcDisabilityDenialInssBenefitTypeormEntity,
      BpcDisabilityDenialInssBenefitEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityDenialInssBenefitEntity,
    ): BpcDisabilityDenialInssBenefitTypeormEntity => {
      return BpcDisabilityDenialInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcDisabilityDenialInssBenefitEntity,
      BpcDisabilityDenialInssBenefitTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
