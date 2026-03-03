import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client.query.result';
import { GetLegalPleadingWithResponsibleAndClientRelationsQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/result/get-legal-pleading-with-responsible-and-client-relations.query.result';
import { BenefitNumber } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import { LegalPleadingCode } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';

@Injectable()
export class GetLegalPleadingWithResponsibleAndClientRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalPleadingWithResponsibleAndClientRelationsQueryResultAutoMapperProfile.name;

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
    ): GetLegalPleadingWithResponsibleAndClientRelationsQueryResult => {
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

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        GetAnalysisToolClientQueryResult,
      );

      return GetLegalPleadingWithResponsibleAndClientRelationsQueryResult.build(
        {
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
          analysisToolClient,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingTypeormEntity,
      GetLegalPleadingWithResponsibleAndClientRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetLegalPleadingWithResponsibleAndClientRelationsQueryResult,
    ): LegalPleadingTypeormEntity => {
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

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        GetAnalysisToolClientQueryResult,
        AnalysisToolClientTypeormEntity,
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
        analysisToolClient,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetLegalPleadingWithResponsibleAndClientRelationsQueryResult,
      LegalPleadingTypeormEntity,
      mappingFunction,
    );
  }
}
