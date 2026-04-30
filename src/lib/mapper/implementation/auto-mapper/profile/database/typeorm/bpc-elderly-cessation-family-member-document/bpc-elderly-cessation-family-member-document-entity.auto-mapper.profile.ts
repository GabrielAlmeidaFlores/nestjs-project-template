import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import { BpcElderlyCessationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity';
import { BpcElderlyCessationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/value-object/bpc-elderly-cessation-family-member-document-id/bpc-elderly-cessation-family-member-document-id.value-object';

@Injectable()
export class BpcElderlyCessationFamilyMemberDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyCessationFamilyMemberDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
    ): BpcElderlyCessationFamilyMemberDocumentEntity => {
      const bpcElderlyCessationFamilyMember = this.mapper.map(
        source.bpcElderlyCessationFamilyMember,
        BpcElderlyCessationFamilyMemberTypeormEntity,
        BpcElderlyCessationFamilyMemberEntity,
      );

      return new BpcElderlyCessationFamilyMemberDocumentEntity({
        id: new BpcElderlyCessationFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        bpcElderlyCessationFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
      BpcElderlyCessationFamilyMemberDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyCessationFamilyMemberDocumentEntity,
    ): BpcElderlyCessationFamilyMemberDocumentTypeormEntity => {
      const bpcElderlyCessationFamilyMember = this.mapper.map(
        source.bpcElderlyCessationFamilyMember,
        BpcElderlyCessationFamilyMemberEntity,
        BpcElderlyCessationFamilyMemberTypeormEntity,
      );

      return BpcElderlyCessationFamilyMemberDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        bpcElderlyCessationFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationFamilyMemberDocumentEntity,
      BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
