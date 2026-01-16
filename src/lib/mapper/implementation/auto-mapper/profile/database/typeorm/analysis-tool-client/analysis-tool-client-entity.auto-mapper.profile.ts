import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class AnalysisToolClientEntityAutoMapperProfile {
  protected readonly _type = AnalysisToolClientEntityAutoMapperProfile.name;

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
    ): AnalysisToolClientEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AnalysisToolClientEntity.name,
          sourceClass: AnalysisToolClientTypeormEntity.name,
        });
      }

      const federalDocument =
        source.federalDocument !== null
          ? new FederalDocument(source.federalDocument)
          : null;
      const email = source.email !== null ? new Email(source.email) : null;
      const corporateEmail =
        source.corporateEmail !== null
          ? new Email(source.corporateEmail)
          : null;
      const phoneNumber =
        source.phoneNumber !== null
          ? new PhoneNumber(source.phoneNumber)
          : null;

      return new AnalysisToolClientEntity({
        ...source,
        id: new AnalysisToolClientId(source.id),
        federalDocument,
        email,
        corporateEmail,
        phoneNumber,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientTypeormEntity,
      AnalysisToolClientEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AnalysisToolClientEntity,
    ): AnalysisToolClientTypeormEntity => {
      const federalDocument =
        source.federalDocument !== null
          ? source.federalDocument.toString()
          : null;
      const email = source.email !== null ? source.email.toString() : null;
      const corporateEmail =
        source.corporateEmail !== null
          ? source.corporateEmail.toString()
          : null;
      const phoneNumber =
        source.phoneNumber !== null ? source.phoneNumber.toString() : null;
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      return AnalysisToolClientTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        federalDocument,
        email,
        corporateEmail,
        phoneNumber,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AnalysisToolClientEntity,
      AnalysisToolClientTypeormEntity,
      mappingFunction,
    );
  }
}
