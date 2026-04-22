import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-document.typeorm.entity';
import { DeathBenefitRejectionInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-institutor.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity';
import { DeathBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/value-object/death-benefit-rejection-document-id.value-object';
import { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

@Injectable()
export class DeathBenefitRejectionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionDocumentTypeormEntity,
      DeathBenefitRejectionDocumentEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionDocumentTypeormEntity,
        ): DeathBenefitRejectionDocumentEntity => {
          if (!source.deathBenefitRejectionInstitutor) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitRejectionDocumentEntity.name,
              sourceClass: DeathBenefitRejectionDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionDocumentEntity({
            id: new DeathBenefitRejectionDocumentId(source.id),
            document: source.document,
            type: source.type,
            deathBenefitRejectionInstitorId:
              new DeathBenefitRejectionInstitorId(
                source.deathBenefitRejectionInstitutor.id,
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
      DeathBenefitRejectionDocumentEntity,
      DeathBenefitRejectionDocumentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionDocumentEntity,
        ): DeathBenefitRejectionDocumentTypeormEntity =>
          DeathBenefitRejectionDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            deathBenefitRejectionInstitutor:
              DeathBenefitRejectionInstitorTypeormEntity.build({
                id: source.deathBenefitRejectionInstitorId.toString(),
              } as DeathBenefitRejectionInstitorTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
