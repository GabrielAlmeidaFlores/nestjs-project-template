import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/permanent-incapacity-benefit-terminated-document.entity';
import { PermanentIncapacityBenefitTerminatedDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/value-object/permanent-incapacity-benefit-terminated-document-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDocumentEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDocumentEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedDocumentTypeormEntity,
      PermanentIncapacityBenefitTerminatedDocumentEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDocumentTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedDocumentEntity => {
          if (!source.permanentIncapacityBenefitTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedDocumentEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedDocumentTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedDocumentEntity({
            id: new PermanentIncapacityBenefitTerminatedDocumentId(source.id),
            fileName: source.fileName,
            type: source.type,
            permanentIncapacityBenefitTerminatedId:
              new PermanentIncapacityBenefitTerminatedId(
                source.permanentIncapacityBenefitTerminated.id,
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
      PermanentIncapacityBenefitTerminatedDocumentEntity,
      PermanentIncapacityBenefitTerminatedDocumentTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDocumentEntity,
        ): PermanentIncapacityBenefitTerminatedDocumentTypeormEntity =>
          PermanentIncapacityBenefitTerminatedDocumentTypeormEntity.build({
            id: source.id.toString(),
            fileName: source.fileName,
            type: source.type,
            permanentIncapacityBenefitTerminated:
              PermanentIncapacityBenefitTerminatedTypeormEntity.build({
                id: source.permanentIncapacityBenefitTerminatedId.toString(),
              } as PermanentIncapacityBenefitTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
