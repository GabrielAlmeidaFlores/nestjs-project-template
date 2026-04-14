import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-time-accelerator.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.entity';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

@Injectable()
export class DeathBenefitGrantTimeAcceleratorEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantTimeAcceleratorEntityAutoMapperProfile.name;

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
      DeathBenefitGrantTimeAcceleratorTypeormEntity,
      DeathBenefitGrantTimeAcceleratorEntity,
      constructUsing(
        (
          source: DeathBenefitGrantTimeAcceleratorTypeormEntity,
        ): DeathBenefitGrantTimeAcceleratorEntity => {
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantTimeAcceleratorEntity.name,
              sourceClass: DeathBenefitGrantTimeAcceleratorTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantTimeAcceleratorEntity({
            id: new DeathBenefitGrantTimeAcceleratorId(source.id),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
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
      DeathBenefitGrantTimeAcceleratorEntity,
      DeathBenefitGrantTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantTimeAcceleratorEntity,
        ): DeathBenefitGrantTimeAcceleratorTypeormEntity =>
          DeathBenefitGrantTimeAcceleratorTypeormEntity.build({
            id: source.id.toString(),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
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
