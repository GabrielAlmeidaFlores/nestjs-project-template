import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/temporary-incapacity-benefit-rejection-insured-status-document.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/value-object/temporary-incapacity-benefit-rejection-insured-status-document-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity => {
          if (!source.temporaryIncapacityBenefitRejectionInsuredStatus) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity(
            {
              id: new TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryIncapacityBenefitRejectionInsuredStatusId:
                new TemporaryIncapacityBenefitRejectionInsuredStatusId(
                  source.temporaryIncapacityBenefitRejectionInsuredStatus.id,
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
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity,
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity,
        ): TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity =>
          TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryIncapacityBenefitRejectionInsuredStatus:
                TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitRejectionInsuredStatusId.toString(),
                  } as TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
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
