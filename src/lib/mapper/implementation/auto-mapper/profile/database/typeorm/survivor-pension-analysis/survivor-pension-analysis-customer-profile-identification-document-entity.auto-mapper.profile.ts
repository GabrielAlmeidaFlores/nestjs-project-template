import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/survivor-pension-analysis-customer-profile-identification-document.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/value-object/survivor-pension-analysis-customer-profile-identification-document-id/survivor-pension-analysis-customer-profile-identification-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntityAutoMapperProfile.name;

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
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
        ): SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity => {
          if (!source.customerProfileIdentification) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity.name,
              sourceClass:
                SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity(
            {
              id: new SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId(
                source.id,
              ),
              documentType: source.documentType,
              documentName: source.documentName,
              survivorPensionAnalysisCustomerProfileIdentificationId:
                new SurvivorPensionAnalysisCustomerProfileIdentificationId(
                  source.customerProfileIdentification.id,
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
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity,
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity,
        ): SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity =>
          SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              documentType: source.documentType,
              documentName: source.documentName,
              customerProfileIdentification:
                SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity.build(
                  {
                    id: source.survivorPensionAnalysisCustomerProfileIdentificationId.toString(),
                  } as SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
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
