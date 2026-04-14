import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/value-object/bpc-elderly-analysis-family-member-document-id/bpc-elderly-analysis-family-member-document-id.value-object';
import { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';

@Injectable()
export class BpcElderlyAnalysisFamilyMemberDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyAnalysisFamilyMemberDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
    ): BpcElderlyAnalysisFamilyMemberDocumentEntity => {
      const bpcElderlyAnalysisFamilyMember = this.mapper.map(
        source.bpcElderlyAnalysisFamilyMember,
        BpcElderlyAnalysisFamilyMemberTypeormEntity,
        BpcElderlyAnalysisFamilyMemberEntity,
      );

      return new BpcElderlyAnalysisFamilyMemberDocumentEntity({
        id: new BpcElderlyAnalysisFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        bpcElderlyAnalysisFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
      BpcElderlyAnalysisFamilyMemberDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyAnalysisFamilyMemberDocumentEntity,
    ): BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity => {
      const bpcElderlyAnalysisFamilyMember = this.mapper.map(
        source.bpcElderlyAnalysisFamilyMember,
        BpcElderlyAnalysisFamilyMemberEntity,
        BpcElderlyAnalysisFamilyMemberTypeormEntity,
      );

      return BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        bpcElderlyAnalysisFamilyMember,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisFamilyMemberDocumentEntity,
      BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
