import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member-document.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity';
import { BpcDisabilityGrantFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity';
import { BpcDisabilityGrantFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/value-object/bpc-disability-grant-family-member-document-id/bpc-disability-grant-family-member-document-id.value-object';

@Injectable()
export class BpcDisabilityGrantFamilyMemberDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityGrantFamilyMemberDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
    ): BpcDisabilityGrantFamilyMemberDocumentEntity => {
      const BpcDisabilityGrantFamilyMember = this.mapper.map(
        source.BpcDisabilityGrantFamilyMember,
        BpcDisabilityGrantFamilyMemberTypeormEntity,
        BpcDisabilityGrantFamilyMemberEntity,
      );

      return new BpcDisabilityGrantFamilyMemberDocumentEntity({
        id: new BpcDisabilityGrantFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        BpcDisabilityGrantFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
      BpcDisabilityGrantFamilyMemberDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityGrantFamilyMemberDocumentEntity,
    ): BpcDisabilityGrantFamilyMemberDocumentTypeormEntity => {
      const BpcDisabilityGrantFamilyMember = this.mapper.map(
        source.BpcDisabilityGrantFamilyMember,
        BpcDisabilityGrantFamilyMemberEntity,
        BpcDisabilityGrantFamilyMemberTypeormEntity,
      );

      return BpcDisabilityGrantFamilyMemberDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        BpcDisabilityGrantFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantFamilyMemberDocumentEntity,
      BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
