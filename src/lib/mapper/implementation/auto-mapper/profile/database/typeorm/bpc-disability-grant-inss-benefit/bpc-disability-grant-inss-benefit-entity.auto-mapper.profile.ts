import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-inss-benefit.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity';
import { BpcDisabilityGrantInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/value-object/bpc-disability-grant-inss-benefit-id/bpc-disability-grant-inss-benefit-id.value-object';

@Injectable()
export class BpcDisabilityGrantInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityGrantInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityGrantInssBenefitTypeormEntity,
    ): BpcDisabilityGrantInssBenefitEntity => {
      if (!source.BpcDisabilityGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityGrantInssBenefitEntity.name,
          sourceClass: BpcDisabilityGrantInssBenefitTypeormEntity.name,
        });
      }

      return new BpcDisabilityGrantInssBenefitEntity({
        id: new BpcDisabilityGrantInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcDisabilityGrantInssBenefitTypeormEntity,
      BpcDisabilityGrantInssBenefitEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityGrantInssBenefitEntity,
    ): BpcDisabilityGrantInssBenefitTypeormEntity => {
      return BpcDisabilityGrantInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcDisabilityGrantInssBenefitEntity,
      BpcDisabilityGrantInssBenefitTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
