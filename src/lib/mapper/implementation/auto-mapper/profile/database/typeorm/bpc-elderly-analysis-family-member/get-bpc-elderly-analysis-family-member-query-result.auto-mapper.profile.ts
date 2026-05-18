import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member-document.query.result';
import { GetBpcElderlyAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member.query.result';
import { BpcElderlyAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/value-object/bpc-elderly-analysis-family-member-id/bpc-elderly-analysis-family-member-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisFamilyMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisFamilyMemberQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisFamilyMemberTypeormEntity,
    ): GetBpcElderlyAnalysisFamilyMemberQueryResult => {
      const bpcElderlyAnalysisFamilyMemberDocument =
        source.bpcElderlyAnalysisFamilyMemberDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
            GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult,
          ),
        ) ?? [];

      return GetBpcElderlyAnalysisFamilyMemberQueryResult.build({
        id: new BpcElderlyAnalysisFamilyMemberId(source.id),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount:
          source.monthlyIncomeAmount !== null &&
          source.monthlyIncomeAmount !== undefined
            ? Number(source.monthlyIncomeAmount)
            : null,
        incomeType: source.incomeType,
        bpcElderlyAnalysisFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisFamilyMemberTypeormEntity,
      GetBpcElderlyAnalysisFamilyMemberQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
