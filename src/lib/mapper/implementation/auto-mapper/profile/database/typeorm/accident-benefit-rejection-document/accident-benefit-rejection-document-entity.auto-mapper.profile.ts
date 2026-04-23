import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-document.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity';
import { AccidentBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/value-object/accident-benefit-rejection-document-id.value-object';

@Injectable()
export class AccidentBenefitRejectionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionDocumentTypeormEntity,
    ): AccidentBenefitRejectionDocumentEntity => {
      if (!source.accidentBenefitRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AccidentBenefitRejectionDocumentEntity.name,
          sourceClass: AccidentBenefitRejectionDocumentTypeormEntity.name,
        });
      }

      return new AccidentBenefitRejectionDocumentEntity({
        id: new AccidentBenefitRejectionDocumentId(source.id),
        document: source.fileName,
        type: source.type,
        accidentBenefitRejectionId: new AccidentBenefitRejectionId(
          source.accidentBenefitRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionDocumentTypeormEntity,
      AccidentBenefitRejectionDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionDocumentEntity,
    ): AccidentBenefitRejectionDocumentTypeormEntity => {
      const accidentBenefitRejection =
        source.accidentBenefitRejectionId !== null
          ? ({
              id: source.accidentBenefitRejectionId.toString(),
            } as AccidentBenefitRejectionTypeormEntity)
          : null;

      return AccidentBenefitRejectionDocumentTypeormEntity.build({
        id: source.id.toString(),
        fileName: source.document,
        type: source.type,
        accidentBenefitRejection,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionDocumentEntity,
      AccidentBenefitRejectionDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
