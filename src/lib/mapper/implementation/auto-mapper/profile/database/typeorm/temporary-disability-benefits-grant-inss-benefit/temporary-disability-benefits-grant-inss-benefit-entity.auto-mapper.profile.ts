import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-inss-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit.entity';
import { TemporaryDisabilityBenefitsGrantInssBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/value-object/temporary-disability-benefits-grant-inss-benefit-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInssBenefitEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity,
      TemporaryDisabilityBenefitsGrantInssBenefitEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantInssBenefitEntity => {
          if (!source.temporaryDisabilityBenefitsGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantInssBenefitEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantInssBenefitEntity({
            id: new TemporaryDisabilityBenefitsGrantInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
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
      TemporaryDisabilityBenefitsGrantInssBenefitEntity,
      TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantInssBenefitEntity,
        ): TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity =>
          TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
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
