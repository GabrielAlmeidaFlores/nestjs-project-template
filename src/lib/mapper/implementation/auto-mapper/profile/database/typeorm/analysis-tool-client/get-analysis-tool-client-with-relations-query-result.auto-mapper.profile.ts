import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/query/result/get-analysis-tool-client-inss-benefit.query.result';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class GetAnalysisToolClientWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolClientWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AnalysisToolClientTypeormEntity,
    ): GetAnalysisToolClientWithRelationsQueryResult => {
      if (
        !source.analysisToolClientInssBenefit ||
        !source.analysisToolClientLegalProceeding
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetAnalysisToolClientWithRelationsQueryResult.name,
          sourceClass: AnalysisToolClientTypeormEntity.name,
        });
      }

      const federalDocument =
        source.federalDocument !== null
          ? new FederalDocument(source.federalDocument)
          : null;
      const email = source.email !== null ? new Email(source.email) : null;
      const phoneNumber =
        source.phoneNumber !== null
          ? new PhoneNumber(source.phoneNumber)
          : null;

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

      const analysisToolClientInssBenefit = this.mapper.mapArray(
        source.analysisToolClientInssBenefit,
        AnalysisToolClientInssBenefitTypeormEntity,
        GetAnalysisToolClientInssBenefitQueryResult,
      );

      const analysisToolClientLegalProceeding = this.mapper.mapArray(
        source.analysisToolClientLegalProceeding,
        AnalysisToolClientLegalProceedingTypeormEntity,
        GetAnalysisToolClientLegalProceedingQueryResult,
      );

      return GetAnalysisToolClientWithRelationsQueryResult.build({
        ...source,
        id: new AnalysisToolClientId(source.id),
        federalDocument,
        email,
        phoneNumber,
        createdBy,
        updatedBy,
        analysisToolClientLegalProceeding,
        analysisToolClientInssBenefit,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAnalysisToolClientWithRelationsQueryResult,
    ): AnalysisToolClientTypeormEntity => {
      const federalDocument =
        source.federalDocument !== null
          ? source.federalDocument.toString()
          : null;
      const email = source.email !== null ? source.email.toString() : null;
      const phoneNumber =
        source.phoneNumber !== null ? source.phoneNumber.toString() : null;
      const inssPassword =
        source.inssPassword !== null ? source.inssPassword.toString() : null;

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

      const analysisToolClientInssBenefit = this.mapper.mapArray(
        source.analysisToolClientInssBenefit,
        GetAnalysisToolClientInssBenefitQueryResult,
        AnalysisToolClientInssBenefitTypeormEntity,
      );

      const analysisToolClientLegalProceeding = this.mapper.mapArray(
        source.analysisToolClientLegalProceeding,
        GetAnalysisToolClientLegalProceedingQueryResult,
        AnalysisToolClientLegalProceedingTypeormEntity,
      );

      return AnalysisToolClientTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        federalDocument,
        email,
        inssPassword,
        phoneNumber,
        updatedBy,
        createdBy,
        analysisToolClientInssBenefit,
        analysisToolClientLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolClientWithRelationsQueryResult,
      AnalysisToolClientTypeormEntity,
      mappingFunction,
    );
  }
}
