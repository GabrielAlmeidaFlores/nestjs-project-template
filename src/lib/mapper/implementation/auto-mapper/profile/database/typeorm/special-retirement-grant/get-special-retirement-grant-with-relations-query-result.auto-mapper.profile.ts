import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';
import { SpecialRetirementGrantTechnicalDiagnosisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-technical-diagnosis.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetSpecialRetirementGrantBenefitQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-benefit.query.result';
import { GetSpecialRetirementGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-document.query.result';
import { GetSpecialRetirementGrantLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-legal-proceeding.query.result';
import { GetSpecialRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-with-relations.query.result';
import { GetSpecialRetirementGrantResultQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/query/result/get-special-retirement-grant-result.query.result';
import { GetSpecialRetirementGrantTechnicalDiagnosisQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-technical-diagnosis/query/result/get-special-retirement-grant-technical-diagnosis.query.result';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

@Injectable()
export class GetSpecialRetirementGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialRetirementGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantTypeormEntity,
    ): GetSpecialRetirementGrantWithRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSpecialRetirementGrantWithRelationsQueryResult.name,
          sourceClass: SpecialRetirementGrantTypeormEntity.name,
        });
      }

      const specialRetirementGrantResult = source.specialRetirementGrantResult
        ? this.mapper.map(
            source.specialRetirementGrantResult,
            SpecialRetirementGrantResultTypeormEntity,
            GetSpecialRetirementGrantResultQueryResult,
          )
        : null;

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const specialRetirementGrantBenefit =
        source.specialRetirementGrantBenefit?.map((item) =>
          this.mapper.map(
            item,
            SpecialRetirementGrantBenefitTypeormEntity,
            GetSpecialRetirementGrantBenefitQueryResult,
          ),
        ) ?? [];

      const specialRetirementGrantLegalProceeding =
        source.specialRetirementGrantLegalProceeding?.map((item) =>
          this.mapper.map(
            item,
            SpecialRetirementGrantLegalProceedingTypeormEntity,
            GetSpecialRetirementGrantLegalProceedingQueryResult,
          ),
        ) ?? [];

      const specialRetirementGrantDocument =
        source.specialRetirementGrantDocument?.map((item) =>
          this.mapper.map(
            item,
            SpecialRetirementGrantDocumentTypeormEntity,
            GetSpecialRetirementGrantDocumentQueryResult,
          ),
        ) ?? [];

      const technicalDiagnosisSource =
        source.specialRetirementGrantTechnicalDiagnosis?.[0] ?? null;

      const technicalDiagnosis =
        technicalDiagnosisSource !== null
          ? this.mapper.map(
              technicalDiagnosisSource,
              SpecialRetirementGrantTechnicalDiagnosisTypeormEntity,
              GetSpecialRetirementGrantTechnicalDiagnosisQueryResult,
            )
          : null;

      return GetSpecialRetirementGrantWithRelationsQueryResult.build({
        id: new SpecialRetirementGrantId(source.id),
        name: source.name,
        specialActivity: source.specialActivity,
        cnisDocument: source.cnisDocument ?? null,
        specialRetirementGrantResult,
        createdBy,
        updatedBy: updatedBy,
        specialRetirementGrantBenefit: specialRetirementGrantBenefit,
        specialRetirementGrantLegalProceeding:
          specialRetirementGrantLegalProceeding,
        specialRetirementGrantDocument,
        technicalDiagnosis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantTypeormEntity,
      GetSpecialRetirementGrantWithRelationsQueryResult,
      mappingFunction,
    );

    createMap(
      this.mapper,
      SpecialRetirementGrantTechnicalDiagnosisTypeormEntity,
      GetSpecialRetirementGrantTechnicalDiagnosisQueryResult,
      constructUsing(
        (
          source: SpecialRetirementGrantTechnicalDiagnosisTypeormEntity,
        ): GetSpecialRetirementGrantTechnicalDiagnosisQueryResult =>
          GetSpecialRetirementGrantTechnicalDiagnosisQueryResult.build({
            periodStartDate: source.periodStartDate,
            periodEndDate: source.periodEndDate,
            recognized: source.recognized,
            justification: source.justification,
            company: source.company,
            cnpj: source.cnpj,
            role: source.role,
            supportingDocument: source.supportingDocument,
            recordedInCnis: source.recordedInCnis,
            remunerationRecordedInCnis: source.remunerationRecordedInCnis,
            hazardousAgents: source.hazardousAgents,
            informationSource: source.informationSource,
            legalFramework: source.legalFramework,
            epiEficaz: source.epiEficaz,
            observations: source.observations,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
          }),
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpecialRetirementGrantWithRelationsQueryResult,
    ): SpecialRetirementGrantTypeormEntity => {
      const specialRetirementGrantResult = this.mapper.map(
        source.specialRetirementGrantResult,
        GetSpecialRetirementGrantResultQueryResult,
        SpecialRetirementGrantResultTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const specialRetirementGrantBenefit = this.mapper.mapArray(
        source.specialRetirementGrantBenefit,
        GetSpecialRetirementGrantBenefitQueryResult,
        SpecialRetirementGrantBenefitTypeormEntity,
      );

      const specialRetirementGrantLegalProceeding = this.mapper.mapArray(
        source.specialRetirementGrantLegalProceeding,
        GetSpecialRetirementGrantLegalProceedingQueryResult,
        SpecialRetirementGrantLegalProceedingTypeormEntity,
      );

      const specialRetirementGrantDocument = this.mapper.mapArray(
        source.specialRetirementGrantDocument,
        GetSpecialRetirementGrantDocumentQueryResult,
        SpecialRetirementGrantDocumentTypeormEntity,
      );

      return SpecialRetirementGrantTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrantResult,
        updatedBy,
        createdBy,
        specialRetirementGrantBenefit,
        specialRetirementGrantLegalProceeding,
        specialRetirementGrantDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpecialRetirementGrantWithRelationsQueryResult,
      SpecialRetirementGrantTypeormEntity,
      mappingFunction,
    );
  }
}
