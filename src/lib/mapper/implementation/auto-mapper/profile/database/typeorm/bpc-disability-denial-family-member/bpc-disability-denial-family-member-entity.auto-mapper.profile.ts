import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import { BpcDisabilityDenialFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/value-object/bpc-disability-denial-family-member-id/bpc-disability-denial-family-member-id.value-object';
import { BpcDisabilityDenialFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity';

@Injectable()
export class BpcDisabilityDenialFamilyMemberEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityDenialFamilyMemberEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityDenialFamilyMemberTypeormEntity,
    ): BpcDisabilityDenialFamilyMemberEntity => {
      const bpcDisabilityDenial = this.mapper.map(
        source.bpcDisabilityDenial,
        BpcDisabilityDenialTypeormEntity,
        BpcDisabilityDenialEntity,
      );

      const bpcDisabilityDenialFamilyMemberDocument =
        source.bpcDisabilityDenialFamilyMemberDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityDenialFamilyMemberDocument,
              BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
              BpcDisabilityDenialFamilyMemberDocumentEntity,
            )
          : [];

      return new BpcDisabilityDenialFamilyMemberEntity({
        id: new BpcDisabilityDenialFamilyMemberId(source.id),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount:
          source.monthlyIncomeAmount !== null &&
          source.monthlyIncomeAmount !== undefined
            ? parseFloat(source.monthlyIncomeAmount)
            : null,
        incomeType: source.incomeType,
        hasExpenseProofs: source.hasExpenseProofs ?? null,
        bpcDisabilityDenial,
        bpcDisabilityDenialFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialFamilyMemberTypeormEntity,
      BpcDisabilityDenialFamilyMemberEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityDenialFamilyMemberEntity,
    ): BpcDisabilityDenialFamilyMemberTypeormEntity => {
      const bpcDisabilityDenial = this.mapper.map(
        source.bpcDisabilityDenial,
        BpcDisabilityDenialEntity,
        BpcDisabilityDenialTypeormEntity,
      );

      const bpcDisabilityDenialFamilyMemberDocument = this.mapper.mapArray(
        source.bpcDisabilityDenialFamilyMemberDocument,
        BpcDisabilityDenialFamilyMemberDocumentEntity,
        BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
      );

      return BpcDisabilityDenialFamilyMemberTypeormEntity.build({
        id: source.id.toString(),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount: source.monthlyIncomeAmount?.toString() ?? null,
        incomeType: source.incomeType,
        hasExpenseProofs: source.hasExpenseProofs,
        bpcDisabilityDenial,
        bpcDisabilityDenialFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialFamilyMemberEntity,
      BpcDisabilityDenialFamilyMemberTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
