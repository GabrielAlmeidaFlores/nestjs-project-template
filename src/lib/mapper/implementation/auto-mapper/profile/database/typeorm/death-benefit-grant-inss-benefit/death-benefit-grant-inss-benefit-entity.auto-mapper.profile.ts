import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-inss-benefit.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';
import { DeathBenefitGrantInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/value-object/death-benefit-grant-inss-benefit-id.value-object';

@Injectable()
export class DeathBenefitGrantInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantInssBenefitEntityAutoMapperProfile.name;

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
      DeathBenefitGrantInssBenefitTypeormEntity,
      DeathBenefitGrantInssBenefitEntity,
      constructUsing(
        (
          source: DeathBenefitGrantInssBenefitTypeormEntity,
        ): DeathBenefitGrantInssBenefitEntity => {
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantInssBenefitEntity.name,
              sourceClass: DeathBenefitGrantInssBenefitTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantInssBenefitEntity({
            id: new DeathBenefitGrantInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
            deathBenefitGrantId: new DeathBenefitGrantId(
              source.deathBenefitGrant.id,
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
      DeathBenefitGrantInssBenefitEntity,
      DeathBenefitGrantInssBenefitTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantInssBenefitEntity,
        ): DeathBenefitGrantInssBenefitTypeormEntity =>
          DeathBenefitGrantInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            deathBenefitGrant: DeathBenefitGrantTypeormEntity.build({
              id: source.deathBenefitGrantId.toString(),
            } as DeathBenefitGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
