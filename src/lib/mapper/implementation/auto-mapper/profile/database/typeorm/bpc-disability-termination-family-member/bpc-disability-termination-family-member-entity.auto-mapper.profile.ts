import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member-document.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import { BpcDisabilityTerminationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/value-object/bpc-disability-termination-family-member-id/bpc-disability-termination-family-member-id.value-object';
import { BpcDisabilityTerminationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity';

@Injectable()
export class BpcDisabilityTerminationFamilyMemberEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationFamilyMemberEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationFamilyMemberTypeormEntity,
    ): BpcDisabilityTerminationFamilyMemberEntity => {
      const bpcDisabilityTermination = this.mapper.map(
        source.bpcDisabilityTermination,
        BpcDisabilityTerminationTypeormEntity,
        BpcDisabilityTerminationEntity,
      );

      const bpcDisabilityTerminationFamilyMemberDocument =
        source.bpcDisabilityTerminationFamilyMemberDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityTerminationFamilyMemberDocument,
              BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
              BpcDisabilityTerminationFamilyMemberDocumentEntity,
            )
          : [];

      return new BpcDisabilityTerminationFamilyMemberEntity({
        id: new BpcDisabilityTerminationFamilyMemberId(source.id),
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
        bpcDisabilityTermination,
        bpcDisabilityTerminationFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationFamilyMemberTypeormEntity,
      BpcDisabilityTerminationFamilyMemberEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationFamilyMemberEntity,
    ): BpcDisabilityTerminationFamilyMemberTypeormEntity => {
      const bpcDisabilityTermination = this.mapper.map(
        source.bpcDisabilityTermination,
        BpcDisabilityTerminationEntity,
        BpcDisabilityTerminationTypeormEntity,
      );

      const bpcDisabilityTerminationFamilyMemberDocument = this.mapper.mapArray(
        source.bpcDisabilityTerminationFamilyMemberDocument,
        BpcDisabilityTerminationFamilyMemberDocumentEntity,
        BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
      );

      return BpcDisabilityTerminationFamilyMemberTypeormEntity.build({
        id: source.id.toString(),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount: source.monthlyIncomeAmount?.toString() ?? null,
        incomeType: source.incomeType,
        hasExpenseProofs: source.hasExpenseProofs,
        bpcDisabilityTermination,
        bpcDisabilityTerminationFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationFamilyMemberEntity,
      BpcDisabilityTerminationFamilyMemberTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
