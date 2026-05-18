import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/temporary-incapacity-benefit-rejection-document.entity';
import { TemporaryIncapacityBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/value-object/temporary-incapacity-benefit-rejection-document-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDocumentEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionDocumentTypeormEntity,
      TemporaryIncapacityBenefitRejectionDocumentEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDocumentTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionDocumentEntity => {
          if (!source.temporaryIncapacityBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionDocumentEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionDocumentTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionDocumentEntity({
            id: new TemporaryIncapacityBenefitRejectionDocumentId(source.id),
            fileName: source.fileName,
            type: source.type,
            temporaryIncapacityBenefitRejectionId:
              new TemporaryIncapacityBenefitRejectionId(
                source.temporaryIncapacityBenefitRejection.id,
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
      TemporaryIncapacityBenefitRejectionDocumentEntity,
      TemporaryIncapacityBenefitRejectionDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDocumentEntity,
        ): TemporaryIncapacityBenefitRejectionDocumentTypeormEntity =>
          TemporaryIncapacityBenefitRejectionDocumentTypeormEntity.build({
            id: source.id.toString(),
            fileName: source.fileName,
            type: source.type,
            temporaryIncapacityBenefitRejection:
              TemporaryIncapacityBenefitRejectionTypeormEntity.build({
                id: source.temporaryIncapacityBenefitRejectionId.toString(),
              } as TemporaryIncapacityBenefitRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
