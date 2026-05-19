import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { GetBpcDisabilityDenialFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member-document.query.result';
import { GetBpcDisabilityDenialFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member.query.result';
import { BpcDisabilityDenialFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/value-object/bpc-disability-denial-family-member-id/bpc-disability-denial-family-member-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialFamilyMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialFamilyMemberQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialFamilyMemberTypeormEntity,
    ): GetBpcDisabilityDenialFamilyMemberQueryResult => {
      const bpcDisabilityDenialFamilyMemberDocument =
        source.bpcDisabilityDenialFamilyMemberDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
            GetBpcDisabilityDenialFamilyMemberDocumentQueryResult,
          ),
        ) ?? [];

      return GetBpcDisabilityDenialFamilyMemberQueryResult.build({
        id: new BpcDisabilityDenialFamilyMemberId(source.id),
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
        bpcDisabilityDenialFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialFamilyMemberTypeormEntity,
      GetBpcDisabilityDenialFamilyMemberQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
