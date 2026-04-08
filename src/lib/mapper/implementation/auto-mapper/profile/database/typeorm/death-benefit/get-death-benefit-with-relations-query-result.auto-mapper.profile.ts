import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitBenefitInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-benefit-institutor.typeorm.entity';
import { DeathBenefitDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent.typeorm.entity';
import { DeathBenefitResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-result.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { GetDeathBenefitWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/query/result/get-death-benefit-with-relations.query.result';
import { DeathBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/death-benefit.entity';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitBenefitInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/death-benefit-benefit-institutor.entity';
import { DeathBenefitBenefitInstitorId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/value-object/death-benefit-benefit-institutor-id.value-object';
import { DeathBenefitDependentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/death-benefit-dependent.entity';
import { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';
import { DeathBenefitDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/death-benefit-dependent-document.entity';
import { DeathBenefitDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/value-object/death-benefit-dependent-document-id.value-object';
import { DeathBenefitDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity';
import { DeathBenefitDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/value-object/death-benefit-document-id.value-object';
import { DeathBenefitInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/death-benefit-inss-benefit.entity';
import { DeathBenefitInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/value-object/death-benefit-inss-benefit-id.value-object';
import { DeathBenefitLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/death-benefit-legal-proceeding.entity';
import { DeathBenefitLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/value-object/death-benefit-legal-proceeding-id.value-object';
import { DeathBenefitLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/death-benefit-legal-representative.entity';
import { DeathBenefitLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/value-object/death-benefit-legal-representative-id.value-object';
import { DeathBenefitPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/death-benefit-period.entity';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { DeathBenefitPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/death-benefit-period-document.entity';
import { DeathBenefitPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/value-object/death-benefit-period-document-id.value-object';
import { DeathBenefitPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/death-benefit-period-earnings-history.entity';
import { DeathBenefitPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/value-object/death-benefit-period-earnings-history-id.value-object';
import { DeathBenefitResultEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/death-benefit-result.entity';

@Injectable()
export class GetDeathBenefitWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDeathBenefitWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: DeathBenefitTypeormEntity,
    ): GetDeathBenefitWithRelationsQueryResult => {
      const deathBenefitEntity = this.mapper.map(
        source,
        DeathBenefitTypeormEntity,
        DeathBenefitEntity,
      );

      const deathBenefitResult =
        source.deathBenefitResult !== null &&
        source.deathBenefitResult !== undefined
          ? this.mapper.map(
              source.deathBenefitResult,
              DeathBenefitResultTypeormEntity,
              DeathBenefitResultEntity,
            )
          : null;

      const deathBenefitDocument = (source.deathBenefitDocument ?? []).map(
        (item) =>
          new DeathBenefitDocumentEntity({
            id: new DeathBenefitDocumentId(item.id),
            document: item.document,
            type: item.type,
            deathBenefitId: deathBenefitEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitInssBenefit = (source.deathBenefitInssBenefit ?? []).map(
        (item) =>
          new DeathBenefitInssBenefitEntity({
            id: new DeathBenefitInssBenefitId(item.id),
            inssBenefit: item.inssBenefit,
            deathBenefitId: deathBenefitEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitLegalProceeding = (source.deathBenefitLegalProceeding ?? []).map(
        (item) =>
          new DeathBenefitLegalProceedingEntity({
            id: new DeathBenefitLegalProceedingId(item.id),
            legalProceedingNumber: item.legalProceedingNumber,
            deathBenefitId: deathBenefitEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const [legalRepresentativeItem] = source.deathBenefitLegalRepresentative ?? [];
      const deathBenefitLegalRepresentative = legalRepresentativeItem
        ? new DeathBenefitLegalRepresentativeEntity({
            id: new DeathBenefitLegalRepresentativeId(legalRepresentativeItem.id),
            name: legalRepresentativeItem.name,
            cpf: legalRepresentativeItem.cpf,
            birthDate: legalRepresentativeItem.birthDate,
            legalRepresentativeRelationship: legalRepresentativeItem.legalRepresentativeRelationship,
            isMinorUnderGuardianship: legalRepresentativeItem.isMinorUnderGuardianship,
            deathBenefitId: deathBenefitEntity.id,
            createdAt: legalRepresentativeItem.createdAt,
            updatedAt: legalRepresentativeItem.updatedAt,
            deletedAt: legalRepresentativeItem.deletedAt,
          })
        : null;

      const [benefitInstitutor] = source.deathBenefitBenefitInstitutor ?? [];
      const deathBenefitBenefitInstitutor = benefitInstitutor
        ? new DeathBenefitBenefitInstitorEntity({
            id: new DeathBenefitBenefitInstitorId(benefitInstitutor.id),
            name: benefitInstitutor.name,
            cpf: benefitInstitutor.cpf,
            birthDate: benefitInstitutor.birthDate,
            sex: benefitInstitutor.sex,
            deathDate: benefitInstitutor.deathDate,
            wasRetired: benefitInstitutor.wasRetired,
            retirementBenefitNumber: benefitInstitutor.retirementBenefitNumber,
            deathBenefitId: deathBenefitEntity.id,
            createdAt: benefitInstitutor.createdAt,
            updatedAt: benefitInstitutor.updatedAt,
            deletedAt: benefitInstitutor.deletedAt,
          })
        : null;

      const deathBenefitDependent = (source.deathBenefitDependent ?? []).map(
        (item) =>
          new DeathBenefitDependentEntity({
            id: new DeathBenefitDependentId(item.id),
            name: item.name,
            dependentClass: item.dependentClass,
            dependentType: item.dependentType,
            sex: item.sex,
            birthDate: item.birthDate,
            hasDisabilityOrInvalidism: item.hasDisabilityOrInvalidism,
            isMinorUnder16: item.isMinorUnder16,
            stableUnionOrMarriageStartDate: item.stableUnionOrMarriageStartDate,
            deathBenefitId: deathBenefitEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitDependentDocument = (source.deathBenefitDependent ?? []).flatMap(
        (dependent) =>
          (dependent.deathBenefitDependentDocument ?? []).map(
            (doc) =>
              new DeathBenefitDependentDocumentEntity({
                id: new DeathBenefitDependentDocumentId(doc.id),
                document: doc.document,
                deathBenefitDependentId: new DeathBenefitDependentId(dependent.id),
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt,
                deletedAt: doc.deletedAt,
              }),
          ),
      );

      const deathBenefitPeriod = (source.deathBenefitPeriod ?? []).map(
        (item) =>
          new DeathBenefitPeriodEntity({
            id: new DeathBenefitPeriodId(item.id),
            startDate: item.startDate,
            endDate: item.endDate,
            category: item.category,
            isPendency: item.isPendency,
            competenceBelowTheMinimum: item.competenceBelowTheMinimum,
            pendencyReason: item.pendencyReason,
            typeOfContribution: item.typeOfContribution,
            status: item.status,
            periodConsideration: item.periodConsideration,
            contributionAverage:
              item.contributionAverage !== null
                ? new DecimalValue(item.contributionAverage)
                : null,
            bondOrigin: item.bondOrigin,
            deathBenefitId: deathBenefitEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitPeriodDocument = (source.deathBenefitPeriod ?? []).flatMap(
        (period) =>
          (period.deathBenefitPeriodDocument ?? []).map(
            (doc) =>
              new DeathBenefitPeriodDocumentEntity({
                id: new DeathBenefitPeriodDocumentId(doc.id),
                document: doc.document,
                deathBenefitPeriodId: new DeathBenefitPeriodId(period.id),
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt,
                deletedAt: doc.deletedAt,
              }),
          ),
      );

      const deathBenefitPeriodEarningsHistory = (source.deathBenefitPeriod ?? []).flatMap(
        (period) =>
          (period.deathBenefitPeriodEarningsHistory ?? []).map(
            (item) =>
              new DeathBenefitPeriodEarningsHistoryEntity({
                id: new DeathBenefitPeriodEarningsHistoryId(item.id),
                competence: item.competence,
                remuneration: item.remuneration,
                indicators: item.indicators,
                paymentDate: item.paymentDate,
                contribution: item.contribution,
                contributionSalary: item.contributionSalary,
                analysis: item.analysis,
                competenceBelowTheMinimum: item.competenceBelowTheMinimum,
                deathBenefitPeriodId: new DeathBenefitPeriodId(period.id),
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                deletedAt: item.deletedAt,
              }),
          ),
      );

      return GetDeathBenefitWithRelationsQueryResult.build({
        id: new DeathBenefitId(source.id),
        analysisName: source.analysisName,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        deathBenefitResult,
        deathBenefitDocument,
        deathBenefitInssBenefit,
        deathBenefitLegalProceeding,
        deathBenefitLegalRepresentative,
        deathBenefitBenefitInstitutor,
        deathBenefitDependent,
        deathBenefitDependentDocument,
        deathBenefitPeriod,
        deathBenefitPeriodDocument,
        deathBenefitPeriodEarningsHistory,
      });
    };

    createMap(
      this.mapper,
      DeathBenefitTypeormEntity,
      GetDeathBenefitWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetDeathBenefitWithRelationsQueryResult,
    ): DeathBenefitTypeormEntity => {
      const deathBenefitResult =
        source.deathBenefitResult !== null
          ? this.mapper.map(
              source.deathBenefitResult,
              DeathBenefitResultEntity,
              DeathBenefitResultTypeormEntity,
            )
          : undefined;

      const deathBenefitBenefitInstitutor =
        source.deathBenefitBenefitInstitutor !== null
          ? [
              this.mapper.map(
                source.deathBenefitBenefitInstitutor,
                DeathBenefitBenefitInstitorEntity,
                DeathBenefitBenefitInstitorTypeormEntity,
              ),
            ]
          : undefined;

      const deathBenefitDependent = (source.deathBenefitDependent ?? []).map(
        (item) =>
          this.mapper.map(
            item,
            DeathBenefitDependentEntity,
            DeathBenefitDependentTypeormEntity,
          ),
      );

      return DeathBenefitTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        deathBenefitResult,
        deathBenefitBenefitInstitutor,
        deathBenefitDependent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GetDeathBenefitWithRelationsQueryResult,
      DeathBenefitTypeormEntity,
      constructUsing(convert),
    );
  }
}
