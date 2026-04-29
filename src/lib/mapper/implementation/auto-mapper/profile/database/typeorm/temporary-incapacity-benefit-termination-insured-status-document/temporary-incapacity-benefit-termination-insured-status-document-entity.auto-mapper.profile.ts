import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/temporary-incapacity-benefit-termination-insured-status-document.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/value-object/temporary-incapacity-benefit-termination-insured-status-document-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity => {
          if (!source.temporaryIncapacityBenefitTerminationInsuredStatus) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity(
            {
              id: new TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryIncapacityBenefitTerminationInsuredStatusId:
                new TemporaryIncapacityBenefitTerminationInsuredStatusId(
                  source.temporaryIncapacityBenefitTerminationInsuredStatus.id,
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
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity,
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity,
        ): TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity =>
          TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryIncapacityBenefitTerminationInsuredStatus:
                TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitTerminationInsuredStatusId.toString(),
                  } as TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
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
