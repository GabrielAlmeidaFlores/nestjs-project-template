import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-document.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';
import { GeneralUrbanRetirementDenialDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/value-object/general-urban-retirement-denial-document-id/general-urban-retirement-denial-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialDocumentEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialDocumentEntityAutoMapperProfile.name;

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
      GeneralUrbanRetirementDenialDocumentTypeormEntity,
      GeneralUrbanRetirementDenialDocumentEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialDocumentTypeormEntity,
        ): GeneralUrbanRetirementDenialDocumentEntity => {
          if (!source.generalUrbanRetirementDenial) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: GeneralUrbanRetirementDenialDocumentEntity.name,
              sourceClass:
                GeneralUrbanRetirementDenialDocumentTypeormEntity.name,
            });
          }

          return new GeneralUrbanRetirementDenialDocumentEntity({
            id: new GeneralUrbanRetirementDenialDocumentId(source.id),
            document: source.document,
            type: source.type,
            generalUrbanRetirementDenialId: new GeneralUrbanRetirementDenialId(
              source.generalUrbanRetirementDenial.id,
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
      GeneralUrbanRetirementDenialDocumentEntity,
      GeneralUrbanRetirementDenialDocumentTypeormEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialDocumentEntity,
        ): GeneralUrbanRetirementDenialDocumentTypeormEntity =>
          GeneralUrbanRetirementDenialDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            generalUrbanRetirementDenial:
              GeneralUrbanRetirementDenialTypeormEntity.build({
                id: source.generalUrbanRetirementDenialId.toString(),
              } as GeneralUrbanRetirementDenialTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
