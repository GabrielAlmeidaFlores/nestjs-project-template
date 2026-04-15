import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-proceeding.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';
import { DeathBenefitGrantLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/value-object/death-benefit-grant-legal-proceeding-id.value-object';

@Injectable()
export class DeathBenefitGrantLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantLegalProceedingEntityAutoMapperProfile.name;

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
      DeathBenefitGrantLegalProceedingTypeormEntity,
      DeathBenefitGrantLegalProceedingEntity,
      constructUsing(
        (
          source: DeathBenefitGrantLegalProceedingTypeormEntity,
        ): DeathBenefitGrantLegalProceedingEntity => {
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantLegalProceedingEntity.name,
              sourceClass: DeathBenefitGrantLegalProceedingTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantLegalProceedingEntity({
            id: new DeathBenefitGrantLegalProceedingId(source.id),
            legalProceedingNumber: source.legalProceedingNumber,
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
      DeathBenefitGrantLegalProceedingEntity,
      DeathBenefitGrantLegalProceedingTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantLegalProceedingEntity,
        ): DeathBenefitGrantLegalProceedingTypeormEntity =>
          DeathBenefitGrantLegalProceedingTypeormEntity.build({
            id: source.id.toString(),
            legalProceedingNumber: source.legalProceedingNumber,
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
