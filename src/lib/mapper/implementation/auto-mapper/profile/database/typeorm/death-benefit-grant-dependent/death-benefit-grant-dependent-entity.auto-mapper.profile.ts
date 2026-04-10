import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/death-benefit-grant-dependent.entity';
import { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';

@Injectable()
export class DeathBenefitGrantDependentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantDependentEntityAutoMapperProfile.name;

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
      DeathBenefitGrantDependentTypeormEntity,
      DeathBenefitGrantDependentEntity,
      constructUsing(
        (
          source: DeathBenefitGrantDependentTypeormEntity,
        ): DeathBenefitGrantDependentEntity => {
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantDependentEntity.name,
              sourceClass: DeathBenefitGrantDependentTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantDependentEntity({
            id: new DeathBenefitGrantDependentId(source.id),
            name: source.name,
            dependentClass: source.dependentClass,
            dependentType: source.dependentType,
            sex: source.sex,
            birthDate: source.birthDate,
            hasDisabilityOrInvalidism: source.hasDisabilityOrInvalidism,
            isMinorUnder16: source.isMinorUnder16,
            stableUnionOrMarriageStartDate:
              source.stableUnionOrMarriageStartDate,
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
      DeathBenefitGrantDependentEntity,
      DeathBenefitGrantDependentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantDependentEntity,
        ): DeathBenefitGrantDependentTypeormEntity =>
          DeathBenefitGrantDependentTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            dependentClass: source.dependentClass,
            dependentType: source.dependentType,
            sex: source.sex,
            birthDate: source.birthDate,
            hasDisabilityOrInvalidism: source.hasDisabilityOrInvalidism,
            isMinorUnder16: source.isMinorUnder16,
            stableUnionOrMarriageStartDate:
              source.stableUnionOrMarriageStartDate,
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
