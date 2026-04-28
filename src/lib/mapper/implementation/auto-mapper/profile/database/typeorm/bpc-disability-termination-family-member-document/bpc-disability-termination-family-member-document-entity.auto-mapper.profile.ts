import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member-document.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import { BpcDisabilityTerminationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity';
import { BpcDisabilityTerminationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/value-object/bpc-disability-termination-family-member-document-id/bpc-disability-termination-family-member-document-id.value-object';

@Injectable()
export class BpcDisabilityTerminationFamilyMemberDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationFamilyMemberDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
    ): BpcDisabilityTerminationFamilyMemberDocumentEntity => {
      const bpcDisabilityTerminationFamilyMember = this.mapper.map(
        source.bpcDisabilityTerminationFamilyMember,
        BpcDisabilityTerminationFamilyMemberTypeormEntity,
        BpcDisabilityTerminationFamilyMemberEntity,
      );

      return new BpcDisabilityTerminationFamilyMemberDocumentEntity({
        id: new BpcDisabilityTerminationFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        bpcDisabilityTerminationFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
      BpcDisabilityTerminationFamilyMemberDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationFamilyMemberDocumentEntity,
    ): BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity => {
      const bpcDisabilityTerminationFamilyMember = this.mapper.map(
        source.bpcDisabilityTerminationFamilyMember,
        BpcDisabilityTerminationFamilyMemberEntity,
        BpcDisabilityTerminationFamilyMemberTypeormEntity,
      );

      return BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        bpcDisabilityTerminationFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationFamilyMemberDocumentEntity,
      BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
