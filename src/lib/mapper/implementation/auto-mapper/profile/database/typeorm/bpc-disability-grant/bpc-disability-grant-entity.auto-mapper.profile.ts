import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';

@Injectable()
export class BpcDisabilityGrantEntityAutoMapperProfile {
  protected readonly _type = BpcDisabilityGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityGrantTypeormEntity,
    ): BpcDisabilityGrantEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityGrantEntity.name,
          sourceClass: BpcDisabilityGrantTypeormEntity.name,
        });
      }

      return new BpcDisabilityGrantEntity({
        id: new BpcDisabilityGrantId(source.id),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        disabilityType: source.disabilityType,
        disabilityDegree: source.disabilityDegree,
        estimatedDisabilityStartDate: source.estimatedDisabilityStartDate,
        attendsSchoolOrTechnicalCourse: source.attendsSchoolOrTechnicalCourse,
        performsLaborActivity: source.performsLaborActivity,
        needsThirdPartyHelp: source.needsThirdPartyHelp,
        hasAccessToBasicServices: source.hasAccessToBasicServices,
        otherBarriersDescription: source.otherBarriersDescription,
        BpcDisabilityGrantResult: null,
        BpcDisabilityGrantFamilyMember: [],
        BpcDisabilityGrantDocument: [],
        BpcDisabilityGrantInssBenefit: [],
        BpcDisabilityGrantLegalProceeding: [],
        analysisToolRecordId: null,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantTypeormEntity,
      BpcDisabilityGrantEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityGrantEntity,
    ): BpcDisabilityGrantTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const analysisToolRecord =
        source.analysisToolRecordId !== null
          ? ({
              id: source.analysisToolRecordId.toString(),
            } as AnalysisToolRecordTypeormEntity)
          : undefined;

      return BpcDisabilityGrantTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        disabilityType: source.disabilityType,
        disabilityDegree: source.disabilityDegree,
        estimatedDisabilityStartDate: source.estimatedDisabilityStartDate,
        attendsSchoolOrTechnicalCourse: source.attendsSchoolOrTechnicalCourse,
        performsLaborActivity: source.performsLaborActivity,
        needsThirdPartyHelp: source.needsThirdPartyHelp,
        hasAccessToBasicServices: source.hasAccessToBasicServices,
        otherBarriersDescription: source.otherBarriersDescription,
        createdBy,
        updatedBy,
        analysisToolRecord,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantEntity,
      BpcDisabilityGrantTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
