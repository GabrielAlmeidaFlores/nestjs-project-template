import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { BpcDisabilityDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-inss-benefit.typeorm.entity';
import { BpcDisabilityDenialLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-legal-proceeding.typeorm.entity';
import { BpcDisabilityDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-result.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { GetBpcDisabilityDenialDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-document.query.result';
import { GetBpcDisabilityDenialFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member.query.result';
import { GetBpcDisabilityDenialWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-with-relations.query.result';
import { GetBpcDisabilityDenialInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-inss-benefit/query/result/get-bpc-disability-denial-inss-benefit.query.result';
import { GetBpcDisabilityDenialLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-legal-proceeding/query/result/get-bpc-disability-denial-legal-proceeding.query.result';
import { GetBpcDisabilityDenialResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/query/result/get-bpc-disability-denial-result.query.result';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialTypeormEntity,
    ): GetBpcDisabilityDenialWithRelationsQueryResult => {
      const bpcDisabilityDenialResult = source.bpcDisabilityDenialResult
        ? this.mapper.map(
            source.bpcDisabilityDenialResult,
            BpcDisabilityDenialResultTypeormEntity,
            GetBpcDisabilityDenialResultQueryResult,
          )
        : null;

      const bpcDisabilityDenialFamilyMember =
        source.bpcDisabilityDenialFamilyMember?.map((member) =>
          this.mapper.map(
            member,
            BpcDisabilityDenialFamilyMemberTypeormEntity,
            GetBpcDisabilityDenialFamilyMemberQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityDenialDocument =
        source.bpcDisabilityDenialDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcDisabilityDenialDocumentTypeormEntity,
            GetBpcDisabilityDenialDocumentQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityDenialInssBenefit =
        source.bpcDisabilityDenialInssBenefit?.map((item) =>
          this.mapper.map(
            item,
            BpcDisabilityDenialInssBenefitTypeormEntity,
            GetBpcDisabilityDenialInssBenefitQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityDenialLegalProceeding =
        source.bpcDisabilityDenialLegalProceeding?.map((item) =>
          this.mapper.map(
            item,
            BpcDisabilityDenialLegalProceedingTypeormEntity,
            GetBpcDisabilityDenialLegalProceedingQueryResult,
          ),
        ) ?? [];

      return GetBpcDisabilityDenialWithRelationsQueryResult.build({
        id: new BpcDisabilityDenialId(source.id),
        analysisName: source.analysisName ?? null,
        requestEntryDate: source.requestEntryDate ?? null,
        denialDate: source.denialDate ?? null,
        requestedBenefitType: source.requestedBenefitType ?? null,
        category: source.category ?? null,
        denialReason: source.denialReason ?? null,
        denialReasonDescription: source.denialReasonDescription ?? null,
        disabilityType: source.disabilityType ?? null,
        disabilityDegree: source.disabilityDegree ?? null,
        estimatedDisabilityStartDate:
          source.estimatedDisabilityStartDate ?? null,
        attendsSchoolOrTechnicalCourse:
          source.attendsSchoolOrTechnicalCourse ?? null,
        performsLaborActivity: source.performsLaborActivity ?? null,
        needsThirdPartyHelp: source.needsThirdPartyHelp ?? null,
        hasAccessToBasicServices: source.hasAccessToBasicServices ?? null,
        otherBarriersDescription: source.otherBarriersDescription ?? null,
        livesAlone: source.livesAlone ?? null,
        bpcDisabilityDenialResult,
        bpcDisabilityDenialFamilyMember,
        bpcDisabilityDenialDocument,
        bpcDisabilityDenialInssBenefit,
        bpcDisabilityDenialLegalProceeding,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialTypeormEntity,
      GetBpcDisabilityDenialWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
