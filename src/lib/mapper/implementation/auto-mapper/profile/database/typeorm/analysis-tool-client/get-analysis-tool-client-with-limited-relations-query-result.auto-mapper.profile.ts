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
import { GetOrganizationMemberWithOrganizationRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-organization-relation.query.result';
import { GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-limited-responsible-relations.query.result ';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/query/result/get-analysis-tool-client-inss-benefit.query.result';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResultAutoMapperProfile.name;

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
    ): GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult => {
      if (
        !source.analysisToolClientInssBenefit ||
        !source.analysisToolClientLegalProceeding ||
        !source.createdBy ||
        !source.updatedBy
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult.name,
          sourceClass: AnalysisToolClientTypeormEntity.name,
        });
      }

      const federalDocument =
        source.federalDocument !== null
          ? new FederalDocument(source.federalDocument)
          : null;
      const email = source.email !== null ? new Email(source.email) : null;
      const corporateEmail =
        source.corporateEmail !== null
          ? new Email(source.corporateEmail)
          : null;
      const phoneNumber =
        source.phoneNumber !== null
          ? new PhoneNumber(source.phoneNumber)
          : null;

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithOrganizationRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithOrganizationRelationQueryResult,
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

      return GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult.build(
        {
          ...source,
          id: new AnalysisToolClientId(source.id),
          federalDocument,
          email,
          corporateEmail,
          phoneNumber,
          createdBy,
          updatedBy,
          analysisToolClientLegalProceeding,
          analysisToolClientInssBenefit,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult,
    ): AnalysisToolClientTypeormEntity => {
      const federalDocument =
        source.federalDocument !== null
          ? source.federalDocument.toString()
          : null;
      const email = source.email !== null ? source.email.toString() : null;
      const corporateEmail =
        source.corporateEmail !== null
          ? source.corporateEmail.toString()
          : null;
      const phoneNumber =
        source.phoneNumber !== null ? source.phoneNumber.toString() : null;

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithOrganizationRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        GetOrganizationMemberWithOrganizationRelationQueryResult,
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
        corporateEmail,
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
      GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult,
      AnalysisToolClientTypeormEntity,
      mappingFunction,
    );
  }
}
