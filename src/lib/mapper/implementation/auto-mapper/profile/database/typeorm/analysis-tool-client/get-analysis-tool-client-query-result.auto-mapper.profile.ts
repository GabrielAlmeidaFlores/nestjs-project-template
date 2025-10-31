import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { GetAnalysisToolClientQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class GetAnalysisToolClientQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolClientQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AnalysisToolClientTypeormEntity,
    ): GetAnalysisToolClientQueryResult => {
      const federalDocument =
        source.federalDocument !== null
          ? new FederalDocument(source.federalDocument)
          : null;
      const email = source.email !== null ? new Email(source.email) : null;
      const phoneNumber =
        source.phoneNumber !== null
          ? new PhoneNumber(source.phoneNumber)
          : null;

      return GetAnalysisToolClientQueryResult.build({
        ...source,
        id: new AnalysisToolClientId(source.id),
        federalDocument,
        email,
        phoneNumber,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAnalysisToolClientQueryResult,
    ): AnalysisToolClientTypeormEntity => {
      const federalDocument =
        source.federalDocument !== null
          ? source.federalDocument.toString()
          : null;
      const email = source.email !== null ? source.email.toString() : null;
      const phoneNumber =
        source.phoneNumber !== null ? source.phoneNumber.toString() : null;

      return AnalysisToolClientTypeormEntity.build({
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
      GetAnalysisToolClientQueryResult,
      AnalysisToolClientTypeormEntity,
      mappingFunction,
    );
  }
}
