import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPreviousBenefitsEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity => {
          if (!source.temporaryDisabilityBenefitsGrantPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity({
            id: new TemporaryDisabilityBenefitsGrantPreviousBenefitsId(
              source.id,
            ),
            benefitNumber: source.benefitNumber,
            temporaryDisabilityBenefitsGrantPeriodId:
              new TemporaryDisabilityBenefitsGrantPeriodId(
                source.temporaryDisabilityBenefitsGrantPeriod.id,
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
      TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity,
        ): TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity =>
          TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity.build({
            id: source.id.toString(),
            benefitNumber: source.benefitNumber,
            temporaryDisabilityBenefitsGrantPeriod:
              TemporaryDisabilityBenefitsGrantPeriodTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsGrantPeriodId.toString(),
              } as TemporaryDisabilityBenefitsGrantPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
