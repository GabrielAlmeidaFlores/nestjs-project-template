import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import { BpcElderlyCessationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/value-object/bpc-elderly-cessation-family-member-id/bpc-elderly-cessation-family-member-id.value-object';
import { BpcElderlyCessationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity';

@Injectable()
export class BpcElderlyCessationFamilyMemberEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyCessationFamilyMemberEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyCessationFamilyMemberTypeormEntity,
    ): BpcElderlyCessationFamilyMemberEntity => {
      const bpcElderlyCessation = this.mapper.map(
        source.bpcElderlyCessation,
        BpcElderlyCessationTypeormEntity,
        BpcElderlyCessationEntity,
      );

      const bpcElderlyCessationFamilyMemberDocument =
        source.bpcElderlyCessationFamilyMemberDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyCessationFamilyMemberDocument,
              BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
              BpcElderlyCessationFamilyMemberDocumentEntity,
            )
          : [];

      return new BpcElderlyCessationFamilyMemberEntity({
        id: new BpcElderlyCessationFamilyMemberId(source.id),
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
        bpcElderlyCessation,
        bpcElderlyCessationFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationFamilyMemberTypeormEntity,
      BpcElderlyCessationFamilyMemberEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyCessationFamilyMemberEntity,
    ): BpcElderlyCessationFamilyMemberTypeormEntity => {
      const bpcElderlyCessation = this.mapper.map(
        source.bpcElderlyCessation,
        BpcElderlyCessationEntity,
        BpcElderlyCessationTypeormEntity,
      );

      const bpcElderlyCessationFamilyMemberDocument = this.mapper.mapArray(
        source.bpcElderlyCessationFamilyMemberDocument,
        BpcElderlyCessationFamilyMemberDocumentEntity,
        BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
      );

      return BpcElderlyCessationFamilyMemberTypeormEntity.build({
        id: source.id.toString(),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount: source.monthlyIncomeAmount?.toString() ?? null,
        incomeType: source.incomeType,
        hasExpenseProofs: source.hasExpenseProofs,
        bpcElderlyCessation,
        bpcElderlyCessationFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationFamilyMemberEntity,
      BpcElderlyCessationFamilyMemberTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
