import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { GetBpcElderlyCessationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-family-member-document.query.result';
import { GetBpcElderlyCessationFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-family-member.query.result';
import { BpcElderlyCessationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/value-object/bpc-elderly-cessation-family-member-id/bpc-elderly-cessation-family-member-id.value-object';

@Injectable()
export class GetBpcElderlyCessationFamilyMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationFamilyMemberQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationFamilyMemberTypeormEntity,
    ): GetBpcElderlyCessationFamilyMemberQueryResult => {
      const bpcElderlyCessationFamilyMemberDocument =
        source.bpcElderlyCessationFamilyMemberDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
            GetBpcElderlyCessationFamilyMemberDocumentQueryResult,
          ),
        ) ?? [];

      return GetBpcElderlyCessationFamilyMemberQueryResult.build({
        id: new BpcElderlyCessationFamilyMemberId(source.id),
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
        hasExpenseProofs: source.hasExpenseProofs ?? null,
        bpcElderlyCessationFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationFamilyMemberTypeormEntity,
      GetBpcElderlyCessationFamilyMemberQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
