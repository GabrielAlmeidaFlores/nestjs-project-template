import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-legal-proceeding.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding.entity';
import { TemporaryDisabilityBenefitsGrantLegalProceedingId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/value-object/temporary-disability-benefits-grant-legal-proceeding-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantLegalProceedingEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity,
      TemporaryDisabilityBenefitsGrantLegalProceedingEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantLegalProceedingEntity => {
          if (!source.temporaryDisabilityBenefitsGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantLegalProceedingEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantLegalProceedingEntity({
            id: new TemporaryDisabilityBenefitsGrantLegalProceedingId(
              source.id,
            ),
            legalProceedingNumber: source.legalProceedingNumber,
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
      TemporaryDisabilityBenefitsGrantLegalProceedingEntity,
      TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantLegalProceedingEntity,
        ): TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity =>
          TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity.build({
            id: source.id.toString(),
            legalProceedingNumber: source.legalProceedingNumber,
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
