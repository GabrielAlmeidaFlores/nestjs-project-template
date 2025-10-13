import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { BenefitNumber } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import { LegalPleadingCode } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';

@Injectable()
export class LegalPleadingEntityAutoMapperProfile {
  protected readonly _type = LegalPleadingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: LegalPleadingTypeormEntity,
    ): LegalPleadingEntity => {
      const legalPleadingAddress = this.mapper.map(
        source.legalPleadingAddress,
        LegalPleadingAddressTypeormEntity,
        LegalPleadingAddressEntity,
      );

      const legalPleadingResult = this.mapper.map(
        source.legalPleadingResult,
        LegalPleadingResultTypeormEntity,
        LegalPleadingResultEntity,
      );

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        AnalysisToolClientEntity,
      );

      return new LegalPleadingEntity({
        ...source,
        id: new LegalPleadingId(source.id),
        code: new LegalPleadingCode(source.code),
        benefitInitialMonthlyIncome:
          source.benefitInitialMonthlyIncome !== null
            ? new DecimalValue(source.benefitInitialMonthlyIncome)
            : null,
        benefitCurrentMonthlyIncome:
          source.benefitCurrentMonthlyIncome !== null
            ? new DecimalValue(source.benefitCurrentMonthlyIncome)
            : null,
        benefitNumber:
          source.benefitNumber !== null
            ? new BenefitNumber(source.benefitNumber)
            : null,
        createdBy: new OrganizationMemberId(source.createdBy?.id),
        updatedBy: new OrganizationMemberId(source.updatedBy?.id),
        legalPleadingAddress,
        legalPleadingResult,
        analysisToolClient,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingTypeormEntity,
      LegalPleadingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: LegalPleadingEntity,
    ): LegalPleadingTypeormEntity => {
      const legalPleadingAddress = this.mapper.map(
        source.legalPleadingAddress,
        LegalPleadingAddressEntity,
        LegalPleadingAddressTypeormEntity,
      );

      const legalPleadingResult = this.mapper.map(
        source.legalPleadingResult,
        LegalPleadingResultEntity,
        LegalPleadingResultTypeormEntity,
      );

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      return LegalPleadingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        code: source.code.toString(),
        benefitInitialMonthlyIncome:
          source.benefitInitialMonthlyIncome?.toString() ?? null,
        benefitCurrentMonthlyIncome:
          source.benefitCurrentMonthlyIncome?.toString() ?? null,
        benefitNumber: source.benefitNumber?.toString() ?? null,
        createdBy,
        updatedBy,
        legalPleadingAddress,
        legalPleadingResult,
        analysisToolClient,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      LegalPleadingEntity,
      LegalPleadingTypeormEntity,
      mappingFunction,
    );
  }
}
