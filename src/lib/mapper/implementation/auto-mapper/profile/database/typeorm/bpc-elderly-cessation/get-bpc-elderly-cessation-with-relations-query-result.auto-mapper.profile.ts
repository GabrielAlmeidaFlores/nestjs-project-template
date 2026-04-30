import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { BpcElderlyCessationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-inss-benefit.typeorm.entity';
import { BpcElderlyCessationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-legal-proceeding.typeorm.entity';
import { BpcElderlyCessationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-result.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { GetBpcElderlyCessationDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-document.query.result';
import { GetBpcElderlyCessationFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-family-member.query.result';
import { GetBpcElderlyCessationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-with-relations.query.result';
import { GetBpcElderlyCessationInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-inss-benefit/query/result/get-bpc-elderly-cessation-inss-benefit.query.result';
import { GetBpcElderlyCessationLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-legal-proceeding/query/result/get-bpc-elderly-cessation-legal-proceeding.query.result';
import { GetBpcElderlyCessationResultQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/query/result/get-bpc-elderly-cessation-result.query.result';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';

@Injectable()
export class GetBpcElderlyCessationWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationTypeormEntity,
    ): GetBpcElderlyCessationWithRelationsQueryResult => {
      const bpcElderlyCessationResult = source.bpcElderlyCessationResult
        ? this.mapper.map(
            source.bpcElderlyCessationResult,
            BpcElderlyCessationResultTypeormEntity,
            GetBpcElderlyCessationResultQueryResult,
          )
        : null;

      const bpcElderlyCessationFamilyMember =
        source.bpcElderlyCessationFamilyMember?.map((member) =>
          this.mapper.map(
            member,
            BpcElderlyCessationFamilyMemberTypeormEntity,
            GetBpcElderlyCessationFamilyMemberQueryResult,
          ),
        ) ?? [];

      const bpcElderlyCessationDocument =
        source.bpcElderlyCessationDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcElderlyCessationDocumentTypeormEntity,
            GetBpcElderlyCessationDocumentQueryResult,
          ),
        ) ?? [];

      const bpcElderlyCessationInssBenefit =
        source.bpcElderlyCessationInssBenefit?.map((item) =>
          this.mapper.map(
            item,
            BpcElderlyCessationInssBenefitTypeormEntity,
            GetBpcElderlyCessationInssBenefitQueryResult,
          ),
        ) ?? [];

      const bpcElderlyCessationLegalProceeding =
        source.bpcElderlyCessationLegalProceeding?.map((item) =>
          this.mapper.map(
            item,
            BpcElderlyCessationLegalProceedingTypeormEntity,
            GetBpcElderlyCessationLegalProceedingQueryResult,
          ),
        ) ?? [];

      return GetBpcElderlyCessationWithRelationsQueryResult.build({
        id: new BpcElderlyCessationId(source.id),
        analysisName: source.analysisName ?? null,
        decisionDate: source.decisionDate ?? null,
        previousInssBenefitNumber: source.previousInssBenefitNumber ?? null,
        category: source.category ?? null,
        cessationReason: source.cessationReason ?? null,
        cessationReasonDescription: source.cessationReasonDescription ?? null,
        isAppealDeadlineExpired: source.isAppealDeadlineExpired ?? null,
        myInssPassword: source.myInssPassword ?? null,
        civilStatus: source.civilStatus ?? null,
        educationLevel: source.educationLevel ?? null,
        currentAddress: source.currentAddress ?? null,
        previousAddress: source.previousAddress ?? null,
        hasAddressChangedSinceDecision:
          source.hasAddressChangedSinceDecision ?? null,
        livesAlone: source.livesAlone ?? null,
        bpcElderlyCessationResult,
        bpcElderlyCessationFamilyMember,
        bpcElderlyCessationDocument,
        bpcElderlyCessationInssBenefit,
        bpcElderlyCessationLegalProceeding,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationTypeormEntity,
      GetBpcElderlyCessationWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
