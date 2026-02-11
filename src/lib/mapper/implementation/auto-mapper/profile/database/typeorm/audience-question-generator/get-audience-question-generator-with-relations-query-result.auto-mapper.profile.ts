import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-benefit.typeorm.entity';
import { AudienceQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-document.typeorm.entity';
import { AudienceQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-legal-proceeding.typeorm.entity';
import { AudienceQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-result.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAudienceQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-document.query.result';
import { GetAudienceQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-with-relations.query.result';
import { GetAudienceQuestionGeneratorBenefitQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-benefit/query/result/get-audience-question-generator-benefit.query.result';
import { GetAudienceQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-legal-proceeding/query/result/get-audience-question-generator-legal-proceeding.query.result';
import { GetAudienceQuestionGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/query/result/get-audience-question-generator-result.query.result';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

@Injectable()
export class GetAudienceQuestionGeneratorWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAudienceQuestionGeneratorWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorTypeormEntity,
    ): GetAudienceQuestionGeneratorWithRelationsQueryResult => {
      if (
        !source.createdBy ||
        !source.updatedBy ||
        !source.audienceQuestionGeneratorDocument ||
        !source.audienceQuestionGeneratorBenefit ||
        !source.audienceQuestionGeneratorLegalProceeding
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetAudienceQuestionGeneratorWithRelationsQueryResult.name,
          sourceClass: AudienceQuestionGeneratorTypeormEntity.name,
        });
      }

      const audienceQuestionGeneratorResult =
        source.audienceQuestionGeneratorResult
          ? this.mapper.map(
              source.audienceQuestionGeneratorResult,
              AudienceQuestionGeneratorResultTypeormEntity,
              GetAudienceQuestionGeneratorResultQueryResult,
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

      const audienceQuestionGeneratorDocument = this.mapper.mapArray(
        source.audienceQuestionGeneratorDocument,
        AudienceQuestionGeneratorDocumentTypeormEntity,
        GetAudienceQuestionGeneratorDocumentQueryResult,
      );

      const audienceQuestionGeneratorBenefit = this.mapper.mapArray(
        source.audienceQuestionGeneratorBenefit,
        AudienceQuestionGeneratorBenefitTypeormEntity,
        GetAudienceQuestionGeneratorBenefitQueryResult,
      );

      const audienceQuestionGeneratorLegalProceeding = this.mapper.mapArray(
        source.audienceQuestionGeneratorLegalProceeding,
        AudienceQuestionGeneratorLegalProceedingTypeormEntity,
        GetAudienceQuestionGeneratorLegalProceedingQueryResult,
      );

      return GetAudienceQuestionGeneratorWithRelationsQueryResult.build({
        ...source,
        id: new AudienceQuestionGeneratorId(source.id),
        audienceQuestionGeneratorResult,
        createdBy,
        updatedBy,
        audienceQuestionGeneratorDocument,
        audienceQuestionGeneratorBenefit,
        audienceQuestionGeneratorLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorTypeormEntity,
      GetAudienceQuestionGeneratorWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAudienceQuestionGeneratorWithRelationsQueryResult,
    ): AudienceQuestionGeneratorTypeormEntity => {
      const audienceQuestionGeneratorResult =
        source.audienceQuestionGeneratorResult !== null
          ? this.mapper.map(
              source.audienceQuestionGeneratorResult,
              GetAudienceQuestionGeneratorResultQueryResult,
              AudienceQuestionGeneratorResultTypeormEntity,
            )
          : undefined;

      const createdBy =
        source.createdBy !== null
          ? this.mapper.map(
              source.createdBy,
              GetOrganizationMemberWithCustomerRelationQueryResult,
              OrganizationMemberTypeormEntity,
            )
          : undefined;

      const updatedBy =
        source.updatedBy !== null
          ? this.mapper.map(
              source.updatedBy,
              GetOrganizationMemberWithCustomerRelationQueryResult,
              OrganizationMemberTypeormEntity,
            )
          : undefined;

      const audienceQuestionGeneratorDocument =
        source.audienceQuestionGeneratorDocument !== null
          ? this.mapper.mapArray(
              source.audienceQuestionGeneratorDocument,
              GetAudienceQuestionGeneratorDocumentQueryResult,
              AudienceQuestionGeneratorDocumentTypeormEntity,
            )
          : undefined;

      const audienceQuestionGeneratorBenefit =
        source.audienceQuestionGeneratorBenefit !== null
          ? this.mapper.mapArray(
              source.audienceQuestionGeneratorBenefit,
              GetAudienceQuestionGeneratorBenefitQueryResult,
              AudienceQuestionGeneratorBenefitTypeormEntity,
            )
          : undefined;

      const audienceQuestionGeneratorLegalProceeding =
        source.audienceQuestionGeneratorLegalProceeding !== null
          ? this.mapper.mapArray(
              source.audienceQuestionGeneratorLegalProceeding,
              GetAudienceQuestionGeneratorLegalProceedingQueryResult,
              AudienceQuestionGeneratorLegalProceedingTypeormEntity,
            )
          : undefined;

      return AudienceQuestionGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        audienceQuestionGeneratorResult,
        createdBy,
        updatedBy,
        audienceQuestionGeneratorDocument,
        audienceQuestionGeneratorBenefit,
        audienceQuestionGeneratorLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAudienceQuestionGeneratorWithRelationsQueryResult,
      AudienceQuestionGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
