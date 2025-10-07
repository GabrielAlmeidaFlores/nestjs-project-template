import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import { GetLegalPleadingAddressQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/query/result/get-legal-pleading-address.query.result';
import { GetLegalPleadingDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document.query.result';
import { BenefitNumber } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading/legal-pleading-id.value-object';

@Injectable()
export class GetLegalPleadingWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalPleadingWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: LegalPleadingTypeormEntity,
    ): GetLegalPleadingWithRelationsQueryResult => {
      if (source.legalPleadingDocument === undefined) {
        throw new IncompleteSourceDataForMappingError({
          sourceClass: LegalPleadingTypeormEntity.name,
          destinationClass: GetLegalPleadingWithRelationsQueryResult.name,
        });
      }

      const legalPleadingAddress =
        source.legalPleadingAddress !== undefined
          ? this.mapper.map(
              source.legalPleadingAddress,
              LegalPleadingAddressTypeormEntity,
              GetLegalPleadingAddressQueryResult,
            )
          : null;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        GetAnalysisToolClientWithRelationsQueryResult,
      );

      const legalPleadingDocument = this.mapper.mapArray(
        source.legalPleadingDocument,
        LegalPleadingDocumentTypeormEntity,
        GetLegalPleadingDocumentQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      return GetLegalPleadingWithRelationsQueryResult.build({
        ...source,
        id: new LegalPleadingId(source.id),
        benefitInitialMonthlyIncome:
          source.benefitInitialMonthlyIncome !== null
            ? new DecimalValue(source.benefitInitialMonthlyIncome)
            : null,
        benefitCurrentMonthlyIncome:
          source.benefitCurrentMonthlyIncome !== null
            ? new DecimalValue(source.benefitCurrentMonthlyIncome)
            : null,
        benefitNumber:
          source.benefitNumber !== null
            ? new BenefitNumber(source.benefitNumber)
            : null,
        createdBy,
        updatedBy,
        legalPleadingAddress,
        analysisToolClient,
        legalPleadingDocument,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingTypeormEntity,
      GetLegalPleadingWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetLegalPleadingWithRelationsQueryResult,
    ): LegalPleadingTypeormEntity => {
      const legalPleadingAddress =
        source.legalPleadingAddress !== null
          ? this.mapper.map(
              source.legalPleadingAddress,
              GetLegalPleadingAddressQueryResult,
              LegalPleadingAddressTypeormEntity,
            )
          : undefined;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        GetAnalysisToolClientWithRelationsQueryResult,
        AnalysisToolClientTypeormEntity,
      );

      const legalPleadingDocument = this.mapper.mapArray(
        source.legalPleadingDocument,
        GetLegalPleadingDocumentQueryResult,
        LegalPleadingDocumentTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      return LegalPleadingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        benefitInitialMonthlyIncome:
          source.benefitInitialMonthlyIncome !== null
            ? source.benefitInitialMonthlyIncome.toString()
            : null,
        benefitCurrentMonthlyIncome:
          source.benefitCurrentMonthlyIncome !== null
            ? source.benefitCurrentMonthlyIncome.toString()
            : null,
        benefitNumber:
          source.benefitNumber !== null
            ? source.benefitNumber.toString()
            : null,
        createdBy,
        updatedBy,
        legalPleadingAddress,
        analysisToolClient,
        legalPleadingDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetLegalPleadingWithRelationsQueryResult,
      LegalPleadingTypeormEntity,
      mappingFunction,
    );
  }
}
