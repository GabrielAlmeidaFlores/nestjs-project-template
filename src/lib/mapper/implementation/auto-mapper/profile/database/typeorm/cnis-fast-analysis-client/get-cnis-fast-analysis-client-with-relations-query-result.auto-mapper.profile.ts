import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';
import { GetCnisFastAnalysisClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-client/query/result/get-cnis-fast-analysis-client-with-relations.query.result';
import { CnisFastAnalysisClientId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';

@Injectable()
export class GetCnisFastAnalysisClientWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCnisFastAnalysisClientWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisClientTypeormEntity,
    ): GetCnisFastAnalysisClientWithRelationsQueryResult => {
      const federalDocument =
        source.federalDocument !== null
          ? new FederalDocument(source.federalDocument)
          : null;
      const email = source.email !== null ? new Email(source.email) : null;
      const phoneNumber =
        source.phoneNumber !== null
          ? new PhoneNumber(source.phoneNumber)
          : null;

      return GetCnisFastAnalysisClientWithRelationsQueryResult.build({
        ...source,
        id: new CnisFastAnalysisClientId(source.id),
        federalDocument,
        email,
        phoneNumber,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisClientTypeormEntity,
      GetCnisFastAnalysisClientWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCnisFastAnalysisClientWithRelationsQueryResult,
    ): CnisFastAnalysisClientTypeormEntity => {
      const federalDocument =
        source.federalDocument !== null
          ? source.federalDocument.toString()
          : null;
      const email = source.email !== null ? source.email.toString() : null;
      const phoneNumber =
        source.phoneNumber !== null ? source.phoneNumber.toString() : null;

      return CnisFastAnalysisClientTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        federalDocument,
        email,
        phoneNumber,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCnisFastAnalysisClientWithRelationsQueryResult,
      CnisFastAnalysisClientTypeormEntity,
      mappingFunction,
    );
  }
}
