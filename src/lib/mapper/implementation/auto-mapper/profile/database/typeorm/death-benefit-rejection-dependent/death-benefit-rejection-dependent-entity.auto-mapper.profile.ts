import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/death-benefit-rejection-dependent.entity';
import { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';

@Injectable()
export class DeathBenefitRejectionDependentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionDependentEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionDependentTypeormEntity,
      DeathBenefitRejectionDependentEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionDependentTypeormEntity,
        ): DeathBenefitRejectionDependentEntity => {
          if (!source.deathBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitRejectionDependentEntity.name,
              sourceClass: DeathBenefitRejectionDependentTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionDependentEntity({
            id: new DeathBenefitRejectionDependentId(source.id),
            name: source.name,
            dependentClass: source.dependentClass,
            dependentType: source.dependentType,
            gender: source.gender,
            birthDate: source.birthDate,
            hasDisabilityOrInvalidism: source.hasDisabilityOrInvalidism,
            isMinorUnder16: source.isMinorUnder16,
            stableUnionOrMarriageStartDate:
              source.stableUnionOrMarriageStartDate,
            deathBenefitRejectionId: new DeathBenefitRejectionId(
              source.deathBenefitRejection.id,
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
      DeathBenefitRejectionDependentEntity,
      DeathBenefitRejectionDependentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionDependentEntity,
        ): DeathBenefitRejectionDependentTypeormEntity =>
          DeathBenefitRejectionDependentTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            dependentClass: source.dependentClass,
            dependentType: source.dependentType,
            gender: source.gender,
            birthDate: source.birthDate,
            hasDisabilityOrInvalidism: source.hasDisabilityOrInvalidism,
            isMinorUnder16: source.isMinorUnder16,
            stableUnionOrMarriageStartDate:
              source.stableUnionOrMarriageStartDate,
            deathBenefitRejection: DeathBenefitRejectionTypeormEntity.build({
              id: source.deathBenefitRejectionId.toString(),
            } as DeathBenefitRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
