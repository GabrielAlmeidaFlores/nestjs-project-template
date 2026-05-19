import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantPeriodEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.entity';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPeriodEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
      TemporaryDisabilityBenefitsGrantPeriodEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantPeriodEntity => {
          if (!source.temporaryDisabilityBenefitsGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantPeriodEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantPeriodTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantPeriodEntity({
            id: new TemporaryDisabilityBenefitsGrantPeriodId(source.id),
            startDate: source.startDate,
            cidTenId: source.cidTenId,
            description: source.description,
            jobDerivatedDisability: source.jobDerivatedDisability,
            disablingConditionDescription: source.disablingConditionDescription,
            disabilityFromSevereDisease: source.disabilityFromSevereDisease,
            severeDisease: source.severeDisease,
            diseaseStartDate: source.diseaseStartDate,
            needsConstantAssistanceFromAnotherPerson:
              source.needsConstantAssistanceFromAnotherPerson,
            temporaryDisabilityBenefitsGrantId:
              new TemporaryDisabilityBenefitsGrantId(
                source.temporaryDisabilityBenefitsGrant.id,
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
      TemporaryDisabilityBenefitsGrantPeriodEntity,
      TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPeriodEntity,
        ): TemporaryDisabilityBenefitsGrantPeriodTypeormEntity =>
          TemporaryDisabilityBenefitsGrantPeriodTypeormEntity.build({
            id: source.id.toString(),
            startDate: source.startDate,
            cidTenId: source.cidTenId,
            description: source.description,
            jobDerivatedDisability: source.jobDerivatedDisability,
            disablingConditionDescription: source.disablingConditionDescription,
            disabilityFromSevereDisease: source.disabilityFromSevereDisease,
            severeDisease: source.severeDisease,
            diseaseStartDate: source.diseaseStartDate,
            needsConstantAssistanceFromAnotherPerson:
              source.needsConstantAssistanceFromAnotherPerson,
            temporaryDisabilityBenefitsGrant:
              TemporaryDisabilityBenefitsGrantTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsGrantId.toString(),
              } as TemporaryDisabilityBenefitsGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
