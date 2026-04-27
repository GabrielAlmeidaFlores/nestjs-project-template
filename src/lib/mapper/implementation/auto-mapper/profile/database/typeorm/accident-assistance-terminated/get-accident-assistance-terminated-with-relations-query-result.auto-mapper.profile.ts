import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-legal-proceeding.entity';
import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAccidentAssistanceTerminatedBenefitQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-benefit.query.result';
import { GetAccidentAssistanceTerminatedDocumentQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-document.query.result';
import { GetAccidentAssistanceTerminatedLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-legal-proceeding.query.result';
import { GetAccidentAssistanceTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-with-relations.query.result';
import { GetAccidentAssistanceTerminatedResultQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-result/query/result/get-accident-assistance-terminated-result.query.result';
import { GetAccidentAssistanceTerminatedPeriodQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/query/result/get-accident-assistance-terminated-period.query.result';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

@Injectable()
export class GetAccidentAssistanceTerminatedWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceTerminatedWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedTypeormEntity,
    ): GetAccidentAssistanceTerminatedWithRelationsQueryResult => {
      if (
        source.accidentAssistanceTerminatedBenefit === undefined ||
        source.accidentAssistanceTerminatedLegalProceeding === undefined ||
        source.accidentAssistanceTerminatedDocument === undefined
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetAccidentAssistanceTerminatedWithRelationsQueryResult.name,
          sourceClass: AccidentAssistanceTerminatedTypeormEntity.name,
        });
      }

      const accidentAssistanceTerminatedResult = this.mapper.map(
        source.accidentAssistanceTerminatedResult,
        AccidentAssistanceTerminatedResultTypeormEntity,
        GetAccidentAssistanceTerminatedResultQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const accidentAssistanceTerminatedBenefit = this.mapper.mapArray(
        source.accidentAssistanceTerminatedBenefit,
        AccidentAssistanceTerminatedBenefitTypeormEntity,
        GetAccidentAssistanceTerminatedBenefitQueryResult,
      );

      const accidentAssistanceTerminatedLegalProceeding = this.mapper.mapArray(
        source.accidentAssistanceTerminatedLegalProceeding,
        AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
        GetAccidentAssistanceTerminatedLegalProceedingQueryResult,
      );

      const accidentAssistanceTerminatedDocument = this.mapper.mapArray(
        source.accidentAssistanceTerminatedDocument,
        AccidentAssistanceTerminatedDocumentTypeormEntity,
        GetAccidentAssistanceTerminatedDocumentQueryResult,
      );

      const accidentAssistanceTerminatedPeriod = this.mapper.mapArray(
        source.accidentAssistanceTerminatedPeriod ?? [],
        AccidentAssistanceTerminatedPeriodTypeormEntity,
        GetAccidentAssistanceTerminatedPeriodQueryResult,
      );

      return GetAccidentAssistanceTerminatedWithRelationsQueryResult.build({
        id: new AccidentAssistanceTerminatedId(source.id),
        der: source.der,
        denialDate: source.denialDate,
        category: source.category,
        inssPassword: source.inssPassword,
        analysisName: source.analysisName,
        benefitCessationReason: source.benefitCessationReason,
        hadPreviousIncapacityBenefit: source.hadPreviousIncapacityBenefit,
        previousIncapacityBenefitNumber: source.previousIncapacityBenefitNumber,
        previousIncapacityBenefitStartDate:
          source.previousIncapacityBenefitStartDate,
        previousIncapacityBenefitEndDate:
          source.previousIncapacityBenefitEndDate,
        extensionRequestStatus: source.extensionRequestStatus,
        dib: source.dib,
        dcb: source.dcb,
        inssBenefitNumber: source.inssBenefitNumber,
        accidentDate: source.accidentDate,
        accidentDescription: source.accidentDescription,
        accidentAssistanceTerminatedResult,
        createdBy,
        updatedBy,
        accidentAssistanceTerminatedLegalProceeding,
        accidentAssistanceTerminatedBenefit,
        accidentAssistanceTerminatedDocument,
        accidentAssistanceTerminatedPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedTypeormEntity,
      GetAccidentAssistanceTerminatedWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAccidentAssistanceTerminatedWithRelationsQueryResult,
    ): AccidentAssistanceTerminatedTypeormEntity => {
      const accidentAssistanceTerminatedResult = this.mapper.map(
        source.accidentAssistanceTerminatedResult,
        GetAccidentAssistanceTerminatedResultQueryResult,
        AccidentAssistanceTerminatedResultTypeormEntity,
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

      const accidentAssistanceTerminatedBenefit = this.mapper.mapArray(
        source.accidentAssistanceTerminatedBenefit,
        GetAccidentAssistanceTerminatedBenefitQueryResult,
        AccidentAssistanceTerminatedBenefitTypeormEntity,
      );

      const accidentAssistanceTerminatedLegalProceeding = this.mapper.mapArray(
        source.accidentAssistanceTerminatedLegalProceeding,
        GetAccidentAssistanceTerminatedLegalProceedingQueryResult,
        AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
      );

      const accidentAssistanceTerminatedDocument = this.mapper.mapArray(
        source.accidentAssistanceTerminatedDocument,
        GetAccidentAssistanceTerminatedDocumentQueryResult,
        AccidentAssistanceTerminatedDocumentTypeormEntity,
      );

      const accidentAssistanceTerminatedPeriod = this.mapper.mapArray(
        source.accidentAssistanceTerminatedPeriod,
        GetAccidentAssistanceTerminatedPeriodQueryResult,
        AccidentAssistanceTerminatedPeriodTypeormEntity,
      );

      return AccidentAssistanceTerminatedTypeormEntity.build({
        id: source.id.toString(),
        der: source.der,
        denialDate: source.denialDate,
        category: source.category,
        inssPassword: source.inssPassword,
        analysisName: source.analysisName,
        benefitCessationReason: source.benefitCessationReason,
        hadPreviousIncapacityBenefit: source.hadPreviousIncapacityBenefit,
        previousIncapacityBenefitNumber: source.previousIncapacityBenefitNumber,
        previousIncapacityBenefitStartDate:
          source.previousIncapacityBenefitStartDate,
        previousIncapacityBenefitEndDate:
          source.previousIncapacityBenefitEndDate,
        extensionRequestStatus: source.extensionRequestStatus,
        dib: source.dib,
        dcb: source.dcb,
        inssBenefitNumber: source.inssBenefitNumber,
        accidentDate: source.accidentDate,
        accidentDescription: source.accidentDescription,
        accidentAssistanceTerminatedResult,
        updatedBy,
        createdBy,
        accidentAssistanceTerminatedBenefit,
        accidentAssistanceTerminatedLegalProceeding,
        accidentAssistanceTerminatedDocument,
        accidentAssistanceTerminatedPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAccidentAssistanceTerminatedWithRelationsQueryResult,
      AccidentAssistanceTerminatedTypeormEntity,
      mappingFunction,
    );
  }
}
