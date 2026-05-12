import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member-document.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member.typeorm.entity';
import { GetBpcDisabilityGrantFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-family-member-document.query.result';
import { GetBpcDisabilityGrantFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-family-member.query.result';
import { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantFamilyMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantFamilyMemberQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantFamilyMemberTypeormEntity,
    ): GetBpcDisabilityGrantFamilyMemberQueryResult => {
      const BpcDisabilityGrantFamilyMemberDocument =
        source.BpcDisabilityGrantFamilyMemberDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
            GetBpcDisabilityGrantFamilyMemberDocumentQueryResult,
          ),
        ) ?? [];

      return GetBpcDisabilityGrantFamilyMemberQueryResult.build({
        id: new BpcDisabilityGrantFamilyMemberId(source.id),
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
        BpcDisabilityGrantFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantFamilyMemberTypeormEntity,
      GetBpcDisabilityGrantFamilyMemberQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
