import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CnisFastAnalysisClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-inss-benefit.typeorm.entity';
import { CnisFastAnalysisClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetCnisFastAnalysisClientWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client/query/result/get-cnis-fast-analysis-client-with-relations.query.result';
import { GetCnisFastAnalysisClientInssBenefitQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client-inss-benefit/query/result/get-cnis-fast-analysis-client-inss-benefit.query.result';
import { GetCnisFastAnalysisClientLegalProceedingQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client-legal-proceeding/query/result/get-cnis-fast-analysis-client-legal-proceeding.query.result';
import { CnisFastAnalysisClientId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';

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
      if (
        source.cnisFastAnalysisClientInssBenefit === undefined ||
        source.cnisFastAnalysisClientLegalProceeding === undefined
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinyClass: GetCnisFastAnalysisClientWithRelationsQueryResult.name,
          sourceClass: CnisFastAnalysisClientTypeormEntity.name,
        });
      }

      const federalDocument =
        source.federalDocument !== null
          ? new FederalDocument(source.federalDocument)
          : null;
      const email = source.email !== null ? new Email(source.email) : null;
      const phoneNumber =
        source.phoneNumber !== null
          ? new PhoneNumber(source.phoneNumber)
          : null;

      const cnisFastAnalysisClientInssBenefit = this.mapper.mapArray(
        source.cnisFastAnalysisClientInssBenefit,
        CnisFastAnalysisClientInssBenefitTypeormEntity,
        GetCnisFastAnalysisClientInssBenefitQueryResult,
      );

      const cnisFastAnalysisClientLegalProceeding = this.mapper.mapArray(
        source.cnisFastAnalysisClientLegalProceeding,
        CnisFastAnalysisClientLegalProceedingTypeormEntity,
        GetCnisFastAnalysisClientLegalProceedingQueryResult,
      );

      return GetCnisFastAnalysisClientWithRelationsQueryResult.build({
        ...source,
        id: new CnisFastAnalysisClientId(source.id),
        federalDocument,
        email,
        phoneNumber,
        cnisFastAnalysisClientInssBenefit,
        cnisFastAnalysisClientLegalProceeding,
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

      const cnisFastAnalysisClientInssBenefit = this.mapper.mapArray(
        source.cnisFastAnalysisClientInssBenefit,
        GetCnisFastAnalysisClientInssBenefitQueryResult,
        CnisFastAnalysisClientInssBenefitTypeormEntity,
      );

      const cnisFastAnalysisClientLegalProceeding = this.mapper.mapArray(
        source.cnisFastAnalysisClientLegalProceeding,
        GetCnisFastAnalysisClientLegalProceedingQueryResult,
        CnisFastAnalysisClientLegalProceedingTypeormEntity,
      );

      return CnisFastAnalysisClientTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        federalDocument,
        email,
        phoneNumber,
        cnisFastAnalysisClientLegalProceeding,
        cnisFastAnalysisClientInssBenefit,
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
