import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-proceeding.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.entity';
import { DeathBenefitRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/value-object/death-benefit-rejection-legal-proceeding-id.value-object';

@Injectable()
export class DeathBenefitRejectionLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionLegalProceedingEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionLegalProceedingTypeormEntity,
      DeathBenefitRejectionLegalProceedingEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionLegalProceedingTypeormEntity,
        ): DeathBenefitRejectionLegalProceedingEntity => {
          if (!source.deathBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitRejectionLegalProceedingEntity.name,
              sourceClass:
                DeathBenefitRejectionLegalProceedingTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionLegalProceedingEntity({
            id: new DeathBenefitRejectionLegalProceedingId(source.id),
            legalProceedingNumber: source.legalProceedingNumber,
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
      DeathBenefitRejectionLegalProceedingEntity,
      DeathBenefitRejectionLegalProceedingTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionLegalProceedingEntity,
        ): DeathBenefitRejectionLegalProceedingTypeormEntity =>
          DeathBenefitRejectionLegalProceedingTypeormEntity.build({
            id: source.id.toString(),
            legalProceedingNumber: source.legalProceedingNumber,
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
