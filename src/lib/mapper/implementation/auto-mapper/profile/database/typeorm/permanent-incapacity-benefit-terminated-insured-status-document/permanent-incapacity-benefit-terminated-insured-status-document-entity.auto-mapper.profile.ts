import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/permanent-incapacity-benefit-terminated-insured-status-document.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/value-object/permanent-incapacity-benefit-terminated-insured-status-document-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity => {
          if (!source.permanentIncapacityBenefitTerminatedInsuredStatus) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity(
            {
              id: new PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              permanentIncapacityBenefitTerminatedInsuredStatusId:
                new PermanentIncapacityBenefitTerminatedInsuredStatusId(
                  source.permanentIncapacityBenefitTerminatedInsuredStatus.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity,
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity,
        ): PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity =>
          PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              permanentIncapacityBenefitTerminatedInsuredStatus:
                PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity.build(
                  {
                    id: source.permanentIncapacityBenefitTerminatedInsuredStatusId.toString(),
                  } as PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
