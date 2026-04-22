import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-inss-benefit.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity';
import { DeathBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/value-object/death-benefit-rejection-inss-benefit-id.value-object';

@Injectable()
export class DeathBenefitRejectionInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionInssBenefitEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionInssBenefitTypeormEntity,
      DeathBenefitRejectionInssBenefitEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionInssBenefitTypeormEntity,
        ): DeathBenefitRejectionInssBenefitEntity => {
          if (!source.deathBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitRejectionInssBenefitEntity.name,
              sourceClass: DeathBenefitRejectionInssBenefitTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionInssBenefitEntity({
            id: new DeathBenefitRejectionInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
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
      DeathBenefitRejectionInssBenefitEntity,
      DeathBenefitRejectionInssBenefitTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionInssBenefitEntity,
        ): DeathBenefitRejectionInssBenefitTypeormEntity =>
          DeathBenefitRejectionInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
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
