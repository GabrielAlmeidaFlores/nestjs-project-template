import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitDependentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/death-benefit-dependent.entity';
import { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';

@Injectable()
export class DeathBenefitDependentEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitDependentEntityAutoMapperProfile.name;

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
      DeathBenefitDependentTypeormEntity,
      DeathBenefitDependentEntity,
      constructUsing(
        (source: DeathBenefitDependentTypeormEntity): DeathBenefitDependentEntity => {
          if (!source.deathBenefit) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitDependentEntity.name,
              sourceClass: DeathBenefitDependentTypeormEntity.name,
            });
          }

          return new DeathBenefitDependentEntity({
            id: new DeathBenefitDependentId(source.id),
            name: source.name,
            dependentClass: source.dependentClass,
            dependentType: source.dependentType,
            sex: source.sex,
            birthDate: source.birthDate,
            hasDisabilityOrInvalidism: source.hasDisabilityOrInvalidism,
            isMinorUnder16: source.isMinorUnder16,
            stableUnionOrMarriageStartDate: source.stableUnionOrMarriageStartDate,
            deathBenefitId: new DeathBenefitId(source.deathBenefit.id),
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
      DeathBenefitDependentEntity,
      DeathBenefitDependentTypeormEntity,
      constructUsing(
        (source: DeathBenefitDependentEntity): DeathBenefitDependentTypeormEntity =>
          DeathBenefitDependentTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            dependentClass: source.dependentClass,
            dependentType: source.dependentType,
            sex: source.sex,
            birthDate: source.birthDate,
            hasDisabilityOrInvalidism: source.hasDisabilityOrInvalidism,
            isMinorUnder16: source.isMinorUnder16,
            stableUnionOrMarriageStartDate: source.stableUnionOrMarriageStartDate,
            deathBenefit: DeathBenefitTypeormEntity.build({
              id: source.deathBenefitId.toString(),
            } as DeathBenefitTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
