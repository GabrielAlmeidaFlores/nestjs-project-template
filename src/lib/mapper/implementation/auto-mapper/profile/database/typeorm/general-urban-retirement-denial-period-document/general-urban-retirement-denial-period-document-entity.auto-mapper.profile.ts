import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-document.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/value-object/general-urban-retirement-denial-period-document-id/general-urban-retirement-denial-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodDocumentEntityAutoMapperProfile.name;

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
      GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity,
      GeneralUrbanRetirementDenialPeriodDocumentEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity,
        ): GeneralUrbanRetirementDenialPeriodDocumentEntity => {
          if (!source.generalUrbanRetirementDenialPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                GeneralUrbanRetirementDenialPeriodDocumentEntity.name,
              sourceClass:
                GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity.name,
            });
          }

          return new GeneralUrbanRetirementDenialPeriodDocumentEntity({
            id: new GeneralUrbanRetirementDenialPeriodDocumentId(source.id),
            document: source.document,
            generalUrbanRetirementDenialPeriodId:
              new GeneralUrbanRetirementDenialPeriodId(
                source.generalUrbanRetirementDenialPeriod.id,
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
      GeneralUrbanRetirementDenialPeriodDocumentEntity,
      GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialPeriodDocumentEntity,
        ): GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity =>
          GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            generalUrbanRetirementDenialPeriod:
              GeneralUrbanRetirementDenialPeriodTypeormEntity.build({
                id: source.generalUrbanRetirementDenialPeriodId.toString(),
              } as GeneralUrbanRetirementDenialPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
