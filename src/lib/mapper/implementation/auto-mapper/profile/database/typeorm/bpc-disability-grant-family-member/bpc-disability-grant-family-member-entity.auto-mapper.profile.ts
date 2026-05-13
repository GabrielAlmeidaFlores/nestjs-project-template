import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member-document.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity';
import { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';
import { BpcDisabilityGrantFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity';

@Injectable()
export class BpcDisabilityGrantFamilyMemberEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityGrantFamilyMemberEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityGrantFamilyMemberTypeormEntity,
    ): BpcDisabilityGrantFamilyMemberEntity => {
      if (!source.BpcDisabilityGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityGrantFamilyMemberEntity.name,
          sourceClass: BpcDisabilityGrantFamilyMemberTypeormEntity.name,
        });
      }

      const bpcDisabilityGrantFamilyMemberDocument =
        source.BpcDisabilityGrantFamilyMemberDocument !== undefined
          ? this.mapper.mapArray(
              source.BpcDisabilityGrantFamilyMemberDocument,
              BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
              BpcDisabilityGrantFamilyMemberDocumentEntity,
            )
          : [];

      return new BpcDisabilityGrantFamilyMemberEntity({
        id: new BpcDisabilityGrantFamilyMemberId(source.id),
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
        BpcDisabilityGrantId: new BpcDisabilityGrantId(
          source.BpcDisabilityGrant.id,
        ),
        BpcDisabilityGrantFamilyMemberDocument: bpcDisabilityGrantFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantFamilyMemberTypeormEntity,
      BpcDisabilityGrantFamilyMemberEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityGrantFamilyMemberEntity,
    ): BpcDisabilityGrantFamilyMemberTypeormEntity => {
      const bpcDisabilityGrantFamilyMemberDocument = this.mapper.mapArray(
        source.BpcDisabilityGrantFamilyMemberDocument,
        BpcDisabilityGrantFamilyMemberDocumentEntity,
        BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
      );

      return BpcDisabilityGrantFamilyMemberTypeormEntity.build({
        id: source.id.toString(),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount: source.monthlyIncomeAmount?.toString() ?? null,
        incomeType: source.incomeType,
        hasExpenseProofs: source.hasExpenseProofs,
        BpcDisabilityGrant: {
          id: source.BpcDisabilityGrantId.toString(),
        } as BpcDisabilityGrantTypeormEntity,
        BpcDisabilityGrantFamilyMemberDocument: bpcDisabilityGrantFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantFamilyMemberEntity,
      BpcDisabilityGrantFamilyMemberTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
