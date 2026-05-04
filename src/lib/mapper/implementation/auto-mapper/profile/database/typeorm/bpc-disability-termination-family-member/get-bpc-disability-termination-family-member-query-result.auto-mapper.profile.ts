import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member-document.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member-document.query.result';
import { GetBpcDisabilityTerminationFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member.query.result';
import { BpcDisabilityTerminationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/value-object/bpc-disability-termination-family-member-id/bpc-disability-termination-family-member-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationFamilyMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationFamilyMemberQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationFamilyMemberTypeormEntity,
    ): GetBpcDisabilityTerminationFamilyMemberQueryResult => {
      const bpcDisabilityTerminationFamilyMemberDocument =
        source.bpcDisabilityTerminationFamilyMemberDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
            GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult,
          ),
        ) ?? [];

      return GetBpcDisabilityTerminationFamilyMemberQueryResult.build({
        id: new BpcDisabilityTerminationFamilyMemberId(source.id),
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
        bpcDisabilityTerminationFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationFamilyMemberTypeormEntity,
      GetBpcDisabilityTerminationFamilyMemberQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
