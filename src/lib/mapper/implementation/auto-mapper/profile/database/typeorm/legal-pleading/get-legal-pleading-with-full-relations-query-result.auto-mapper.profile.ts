import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetLegalPleadingWithFullRelationsQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/result/get-legal-pleading-with-full-relations.query.result';
import { GetLegalPleadingAddressQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-address/query/result/get-legal-pleading-address.query.result';
import { GetLegalPleadingDocumentWithRelationsQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document-with-relations.query.result';
import { GetLegalPleadingResultQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-result/query/result/get-legal-pleading-result.query.result';
import { BenefitNumber } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import { LegalPleadingCode } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';

@Injectable()
export class GetLegalPleadingWithFullRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalPleadingWithFullRelationsQueryResultAutoMapperProfile.name;

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
    ): GetLegalPleadingWithFullRelationsQueryResult => {
      if (source.legalPleadingDocument === undefined) {
        throw new IncompleteSourceDataForMappingError({
          sourceClass: LegalPleadingTypeormEntity.name,
          destinationClass: GetLegalPleadingWithFullRelationsQueryResult.name,
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

      const legalPleadingResult =
        source.legalPleadingResult !== undefined
          ? this.mapper.map(
              source.legalPleadingResult,
              LegalPleadingResultTypeormEntity,
              GetLegalPleadingResultQueryResult,
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
        GetLegalPleadingDocumentWithRelationsQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
      );

      return GetLegalPleadingWithFullRelationsQueryResult.build({
        ...source,
        id: new LegalPleadingId(source.id),
        code: new LegalPleadingCode(source.code),
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
        legalPleadingResult,
        analysisToolClient,
        legalPleadingDocument,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingTypeormEntity,
      GetLegalPleadingWithFullRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetLegalPleadingWithFullRelationsQueryResult,
    ): LegalPleadingTypeormEntity => {
      const legalPleadingAddress =
        source.legalPleadingAddress !== null
          ? this.mapper.map(
              source.legalPleadingAddress,
              GetLegalPleadingAddressQueryResult,
              LegalPleadingAddressTypeormEntity,
            )
          : undefined;

      const legalPleadingResult =
        source.legalPleadingResult !== null
          ? this.mapper.map(
              source.legalPleadingResult,
              GetLegalPleadingResultQueryResult,
              LegalPleadingResultTypeormEntity,
            )
          : undefined;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        GetAnalysisToolClientWithRelationsQueryResult,
        AnalysisToolClientTypeormEntity,
      );

      const legalPleadingDocument = this.mapper.mapArray(
        source.legalPleadingDocument,
        GetLegalPleadingDocumentWithRelationsQueryResult,
        LegalPleadingDocumentTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
        OrganizationMemberTypeormEntity,
      );

      return LegalPleadingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        code: source.code.toString(),
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
        legalPleadingResult,
        analysisToolClient,
        legalPleadingDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetLegalPleadingWithFullRelationsQueryResult,
      LegalPleadingTypeormEntity,
      mappingFunction,
    );
  }
}
