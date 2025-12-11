import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { GetLegalProceedingDetailQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail.query.result';
import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';

@Injectable()
export class GetLegalProceedingDetailEntityAutoMapperProfile {
  protected readonly _type =
    GetLegalProceedingDetailEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: LegalProceedingDetailTypeormEntity,
    ): GetLegalProceedingDetailQueryResult => {
      return GetLegalProceedingDetailQueryResult.build({
        ...source,
        id: new LegalProceedingDetailId(source.id),
        detail: source.detail,
      });
    };

    createMap(
      this.mapper,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailQueryResult,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: GetLegalProceedingDetailQueryResult,
    ): LegalProceedingDetailTypeormEntity => {
      return LegalProceedingDetailTypeormEntity.build({
        id: source.id.toString(),
        detail: source.detail.toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetLegalProceedingDetailQueryResult,
      LegalProceedingDetailTypeormEntity,
      constructUsing(convert),
    );
  }
}
