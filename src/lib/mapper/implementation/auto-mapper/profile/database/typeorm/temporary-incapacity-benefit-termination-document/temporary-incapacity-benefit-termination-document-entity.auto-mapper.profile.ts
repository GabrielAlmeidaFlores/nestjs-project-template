import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/temporary-incapacity-benefit-termination-document.entity';
import { TemporaryIncapacityBenefitTerminationDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/value-object/temporary-incapacity-benefit-termination-document-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDocumentEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
      TemporaryIncapacityBenefitTerminationDocumentEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationDocumentEntity => {
          if (!source.temporaryIncapacityBenefitTermination) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationDocumentEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationDocumentTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationDocumentEntity({
            id: new TemporaryIncapacityBenefitTerminationDocumentId(source.id),
            fileName: source.fileName,
            type: source.type,
            temporaryIncapacityBenefitTerminationId:
              new TemporaryIncapacityBenefitTerminationId(
                source.temporaryIncapacityBenefitTermination.id,
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
      TemporaryIncapacityBenefitTerminationDocumentEntity,
      TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDocumentEntity,
        ): TemporaryIncapacityBenefitTerminationDocumentTypeormEntity =>
          TemporaryIncapacityBenefitTerminationDocumentTypeormEntity.build({
            id: source.id.toString(),
            fileName: source.fileName,
            type: source.type,
            temporaryIncapacityBenefitTermination:
              TemporaryIncapacityBenefitTerminationTypeormEntity.build({
                id: source.temporaryIncapacityBenefitTerminationId.toString(),
              } as TemporaryIncapacityBenefitTerminationTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
