import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-document.typeorm.entity';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { DeathBenefitGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/death-benefit-grant-period-document.entity';
import { DeathBenefitGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/value-object/death-benefit-grant-period-document-id.value-object';

@Injectable()
export class DeathBenefitGrantPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantPeriodDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitGrantPeriodDocumentTypeormEntity,
      DeathBenefitGrantPeriodDocumentEntity,
      constructUsing(
        (
          source: DeathBenefitGrantPeriodDocumentTypeormEntity,
        ): DeathBenefitGrantPeriodDocumentEntity => {
          if (!source.deathBenefitGrantPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantPeriodDocumentEntity.name,
              sourceClass: DeathBenefitGrantPeriodDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantPeriodDocumentEntity({
            id: new DeathBenefitGrantPeriodDocumentId(source.id),
            document: source.document,
            deathBenefitGrantPeriodId: new DeathBenefitGrantPeriodId(
              source.deathBenefitGrantPeriod.id,
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
      DeathBenefitGrantPeriodDocumentEntity,
      DeathBenefitGrantPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantPeriodDocumentEntity,
        ): DeathBenefitGrantPeriodDocumentTypeormEntity =>
          DeathBenefitGrantPeriodDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            deathBenefitGrantPeriod: DeathBenefitGrantPeriodTypeormEntity.build(
              {
                id: source.deathBenefitGrantPeriodId.toString(),
              } as DeathBenefitGrantPeriodTypeormEntity,
            ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
