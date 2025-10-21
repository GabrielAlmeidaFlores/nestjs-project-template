import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientWithAnalysisRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-analysis-relations.query.result';
import { GetLegalPleadingQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading.query.result';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record.query.result';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class GetAnalysisToolClientWithAnalysisRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolClientWithAnalysisRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AnalysisToolClientTypeormEntity,
    ): GetAnalysisToolClientWithAnalysisRelationsQueryResult => {
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

      const legalPleadings = this.mapper.mapArray(
        source.legalPleading ?? [],
        LegalPleadingTypeormEntity,
        GetLegalPleadingQueryResult,
      );

      const analysisToolRecords = this.mapper.mapArray(
        source.cnisFastAnalysis?.flatMap(
          (fast) => fast.analysisToolRecord ?? [],
        ) ?? [],
        AnalysisToolRecordTypeormEntity,
        GetAnalysisToolRecordWithRelationsQueryResult,
      );

      return GetAnalysisToolClientWithAnalysisRelationsQueryResult.build({
        ...source,
        id: new AnalysisToolClientId(source.id),
        federalDocument,
        email,
        phoneNumber,
        createdBy,
        updatedBy,
        legalPleadings,
        analysisToolRecords,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientWithAnalysisRelationsQueryResult,
      mappingFunction,
    );
  }
}
