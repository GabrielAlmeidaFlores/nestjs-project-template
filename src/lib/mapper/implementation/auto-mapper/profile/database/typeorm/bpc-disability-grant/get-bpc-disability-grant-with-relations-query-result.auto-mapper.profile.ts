import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-document.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member.typeorm.entity';
import { BpcDisabilityGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-inss-benefit.typeorm.entity';
import { BpcDisabilityGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-proceeding.typeorm.entity';
import { BpcDisabilityGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-result.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { GetBpcDisabilityGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-document.query.result';
import { GetBpcDisabilityGrantFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-family-member.query.result';
import { GetBpcDisabilityGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-with-relations.query.result';
import { GetBpcDisabilityGrantInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-inss-benefit/query/result/get-bpc-disability-grant-inss-benefit.query.result';
import { GetBpcDisabilityGrantLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-legal-proceeding/query/result/get-bpc-disability-grant-legal-proceeding.query.result';
import { GetBpcDisabilityGrantResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-result/query/result/get-bpc-disability-grant-result.query.result';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantTypeormEntity,
    ): GetBpcDisabilityGrantWithRelationsQueryResult => {
      const bpcDisabilityGrantResult = source.BpcDisabilityGrantResult
        ? this.mapper.map(
            source.BpcDisabilityGrantResult,
            BpcDisabilityGrantResultTypeormEntity,
            GetBpcDisabilityGrantResultQueryResult,
          )
        : null;

      const bpcDisabilityGrantFamilyMember =
        source.BpcDisabilityGrantFamilyMember?.map((member) =>
          this.mapper.map(
            member,
            BpcDisabilityGrantFamilyMemberTypeormEntity,
            GetBpcDisabilityGrantFamilyMemberQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityGrantDocument =
        source.BpcDisabilityGrantDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcDisabilityGrantDocumentTypeormEntity,
            GetBpcDisabilityGrantDocumentQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityGrantInssBenefit =
        source.BpcDisabilityGrantInssBenefit?.map((item) =>
          this.mapper.map(
            item,
            BpcDisabilityGrantInssBenefitTypeormEntity,
            GetBpcDisabilityGrantInssBenefitQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityGrantLegalProceeding =
        source.BpcDisabilityGrantLegalProceeding?.map((item) =>
          this.mapper.map(
            item,
            BpcDisabilityGrantLegalProceedingTypeormEntity,
            GetBpcDisabilityGrantLegalProceedingQueryResult,
          ),
        ) ?? [];

      return GetBpcDisabilityGrantWithRelationsQueryResult.build({
        id: new BpcDisabilityGrantId(source.id),
        analysisName: source.analysisName ?? null,
        requestEntryDate: source.requestEntryDate ?? null,
        denialDate: source.denialDate ?? null,
        requestedBenefitType: source.requestedBenefitType ?? null,
        category: source.category ?? null,
        denialReason: null,
        denialReasonDescription: null,
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
        livesAlone: null,
        BpcDisabilityGrantResult: bpcDisabilityGrantResult,
        BpcDisabilityGrantFamilyMember: bpcDisabilityGrantFamilyMember,
        BpcDisabilityGrantDocument: bpcDisabilityGrantDocument,
        BpcDisabilityGrantInssBenefit: bpcDisabilityGrantInssBenefit,
        BpcDisabilityGrantLegalProceeding: bpcDisabilityGrantLegalProceeding,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantTypeormEntity,
      GetBpcDisabilityGrantWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
