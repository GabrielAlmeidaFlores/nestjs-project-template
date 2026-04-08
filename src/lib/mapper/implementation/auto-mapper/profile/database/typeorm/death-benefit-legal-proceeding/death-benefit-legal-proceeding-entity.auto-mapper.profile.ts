import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-legal-proceeding.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/death-benefit-legal-proceeding.entity';
import { DeathBenefitLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/value-object/death-benefit-legal-proceeding-id.value-object';

@Injectable()
export class DeathBenefitLegalProceedingEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitLegalProceedingEntityAutoMapperProfile.name;

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
      DeathBenefitLegalProceedingTypeormEntity,
      DeathBenefitLegalProceedingEntity,
      constructUsing(
        (source: DeathBenefitLegalProceedingTypeormEntity): DeathBenefitLegalProceedingEntity => {
          if (!source.deathBenefit) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitLegalProceedingEntity.name,
              sourceClass: DeathBenefitLegalProceedingTypeormEntity.name,
            });
          }

          return new DeathBenefitLegalProceedingEntity({
            id: new DeathBenefitLegalProceedingId(source.id),
            legalProceedingNumber: source.legalProceedingNumber,
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
      DeathBenefitLegalProceedingEntity,
      DeathBenefitLegalProceedingTypeormEntity,
      constructUsing(
        (source: DeathBenefitLegalProceedingEntity): DeathBenefitLegalProceedingTypeormEntity =>
          DeathBenefitLegalProceedingTypeormEntity.build({
            id: source.id.toString(),
            legalProceedingNumber: source.legalProceedingNumber,
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
