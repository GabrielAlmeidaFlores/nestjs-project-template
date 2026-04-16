import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-inss-benefit.typeorm.entity';
import { BpcElderlyAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-legal-proceeding.typeorm.entity';
import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { GetBpcElderlyAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-document.query.result';
import { GetBpcElderlyAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member.query.result';
import { GetBpcElderlyAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-with-relations.query.result';
import { GetBpcElderlyAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-inss-benefit/query/result/get-bpc-elderly-analysis-inss-benefit.query.result';
import { GetBpcElderlyAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-legal-proceeding/query/result/get-bpc-elderly-analysis-legal-proceeding.query.result';
import { GetBpcElderlyAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/query/result/get-bpc-elderly-analysis-result.query.result';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisTypeormEntity,
    ): GetBpcElderlyAnalysisWithRelationsQueryResult => {
      const bpcElderlyAnalysisResult = source.bpcElderlyAnalysisResult
        ? this.mapper.map(
            source.bpcElderlyAnalysisResult,
            BpcElderlyAnalysisResultTypeormEntity,
            GetBpcElderlyAnalysisResultQueryResult,
          )
        : null;

      const bpcElderlyAnalysisFamilyMember =
        source.bpcElderlyAnalysisFamilyMember?.map((member) =>
          this.mapper.map(
            member,
            BpcElderlyAnalysisFamilyMemberTypeormEntity,
            GetBpcElderlyAnalysisFamilyMemberQueryResult,
          ),
        ) ?? [];

      const bpcElderlyAnalysisDocument =
        source.bpcElderlyAnalysisDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcElderlyAnalysisDocumentTypeormEntity,
            GetBpcElderlyAnalysisDocumentQueryResult,
          ),
        ) ?? [];

      const bpcElderlyAnalysisInssBenefit =
        source.bpcElderlyAnalysisInssBenefit?.map((item) =>
          this.mapper.map(
            item,
            BpcElderlyAnalysisInssBenefitTypeormEntity,
            GetBpcElderlyAnalysisInssBenefitQueryResult,
          ),
        ) ?? [];

      const bpcElderlyAnalysisLegalProceeding =
        source.bpcElderlyAnalysisLegalProceeding?.map((item) =>
          this.mapper.map(
            item,
            BpcElderlyAnalysisLegalProceedingTypeormEntity,
            GetBpcElderlyAnalysisLegalProceedingQueryResult,
          ),
        ) ?? [];

      return GetBpcElderlyAnalysisWithRelationsQueryResult.build({
        id: new BpcElderlyAnalysisId(source.id),
        category: source.category ?? null,
        bpcElderlyAnalysisResult,
        bpcElderlyAnalysisFamilyMember,
        bpcElderlyAnalysisDocument,
        bpcElderlyAnalysisInssBenefit,
        bpcElderlyAnalysisLegalProceeding,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisTypeormEntity,
      GetBpcElderlyAnalysisWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
