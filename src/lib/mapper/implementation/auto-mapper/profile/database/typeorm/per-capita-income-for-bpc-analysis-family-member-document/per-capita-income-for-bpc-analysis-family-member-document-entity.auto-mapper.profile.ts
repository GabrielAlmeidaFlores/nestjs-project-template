import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/value-object/per-capita-income-for-bpc-analysis-family-member-document-id/per-capita-income-for-bpc-analysis-family-member-document-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntityAutoMapperProfile {
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
    ): PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity => {
      const perCapitaIncomeForBpcAnalysisFamilyMember = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysisFamilyMember,
        PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
        PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
      );

      return new PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId(source.id),
        perCapitaIncomeForBpcAnalysisFamilyMember,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity,
    ): PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity => {
      const perCapitaIncomeForBpcAnalysisFamilyMember = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysisFamilyMember,
        PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
        PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      );

      return PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcAnalysisFamilyMember,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity,
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
