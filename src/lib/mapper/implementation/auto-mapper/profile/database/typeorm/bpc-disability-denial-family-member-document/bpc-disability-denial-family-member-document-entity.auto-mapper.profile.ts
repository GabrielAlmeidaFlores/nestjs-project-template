import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import { BpcDisabilityDenialFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity';
import { BpcDisabilityDenialFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/value-object/bpc-disability-denial-family-member-document-id/bpc-disability-denial-family-member-document-id.value-object';

@Injectable()
export class BpcDisabilityDenialFamilyMemberDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityDenialFamilyMemberDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
    ): BpcDisabilityDenialFamilyMemberDocumentEntity => {
      const bpcDisabilityDenialFamilyMember = this.mapper.map(
        source.bpcDisabilityDenialFamilyMember,
        BpcDisabilityDenialFamilyMemberTypeormEntity,
        BpcDisabilityDenialFamilyMemberEntity,
      );

      return new BpcDisabilityDenialFamilyMemberDocumentEntity({
        id: new BpcDisabilityDenialFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        bpcDisabilityDenialFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
      BpcDisabilityDenialFamilyMemberDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityDenialFamilyMemberDocumentEntity,
    ): BpcDisabilityDenialFamilyMemberDocumentTypeormEntity => {
      const bpcDisabilityDenialFamilyMember = this.mapper.map(
        source.bpcDisabilityDenialFamilyMember,
        BpcDisabilityDenialFamilyMemberEntity,
        BpcDisabilityDenialFamilyMemberTypeormEntity,
      );

      return BpcDisabilityDenialFamilyMemberDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        bpcDisabilityDenialFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialFamilyMemberDocumentEntity,
      BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
