import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-inss-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit.entity';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/value-object/temporary-disability-benefits-terminated-inss-benefit-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInssBenefitEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedInssBenefitEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedInssBenefitEntity => {
          if (!source.temporaryDisabilityBenefitsTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedInssBenefitEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedInssBenefitEntity({
            id: new TemporaryDisabilityBenefitsTerminatedInssBenefitId(
              source.id,
            ),
            inssBenefit: source.inssBenefit,
            temporaryDisabilityBenefitsTerminatedId:
              new TemporaryDisabilityBenefitsTerminatedId(
                source.temporaryDisabilityBenefitsTerminated.id,
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
      TemporaryDisabilityBenefitsTerminatedInssBenefitEntity,
      TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedInssBenefitEntity,
        ): TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            temporaryDisabilityBenefitsTerminated:
              TemporaryDisabilityBenefitsTerminatedTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsTerminatedId.toString(),
              } as TemporaryDisabilityBenefitsTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
