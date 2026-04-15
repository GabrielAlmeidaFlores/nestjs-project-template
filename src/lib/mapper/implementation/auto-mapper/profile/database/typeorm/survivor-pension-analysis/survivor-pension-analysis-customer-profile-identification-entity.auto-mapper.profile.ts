import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisCustomerProfileIdentificationEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    ): SurvivorPensionAnalysisCustomerProfileIdentificationEntity => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            SurvivorPensionAnalysisCustomerProfileIdentificationEntity.name,
          sourceClass:
            SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity.name,
        });
      }

      return new SurvivorPensionAnalysisCustomerProfileIdentificationEntity({
        id: new SurvivorPensionAnalysisCustomerProfileIdentificationId(
          source.id,
        ),
        survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
          source.survivorPensionAnalysis.id,
        ),
        analysisToolClientId:
          source.analysisToolClientId !== null
            ? new AnalysisToolClientId(source.analysisToolClientId)
            : null,
        clientJobTitle: source.clientJobTitle,
        legalProceedingNumber: source.legalProceedingNumber,
        inssBenefitNumber: source.inssBenefitNumber,
        analysisName: source.analysisName,
        analysisPurpose: source.analysisPurpose,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
      SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
    ): SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity => {
      return SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity.build(
        {
          id: source.id.toString(),
          analysisToolClientId: source.analysisToolClientId?.toString() ?? null,
          clientJobTitle: source.clientJobTitle,
          legalProceedingNumber: source.legalProceedingNumber,
          inssBenefitNumber: source.inssBenefitNumber,
          analysisName: source.analysisName,
          analysisPurpose: source.analysisPurpose,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          survivorPensionAnalysis: SurvivorPensionAnalysisTypeormEntity.build({
            id: source.survivorPensionAnalysisId.toString(),
          } as SurvivorPensionAnalysisTypeormEntity),
          documents: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
      mappingFunction,
    );
  }
}
