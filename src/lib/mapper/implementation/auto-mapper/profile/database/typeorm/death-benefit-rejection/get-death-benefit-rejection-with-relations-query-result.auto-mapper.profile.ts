import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import { DeathBenefitRejectionDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent.typeorm.entity';
import { DeathBenefitRejectionInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-institutor.typeorm.entity';
import { DeathBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-result.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { GetDeathBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/result/get-death-benefit-rejection-with-relations.query.result';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/death-benefit-rejection-dependent.entity';
import { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import { DeathBenefitRejectionDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.entity';
import { DeathBenefitRejectionDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/value-object/death-benefit-rejection-dependent-document-id.value-object';
import { DeathBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity';
import { DeathBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/value-object/death-benefit-rejection-document-id.value-object';
import { DeathBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity';
import { DeathBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/value-object/death-benefit-rejection-inss-benefit-id.value-object';
import { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';
import { DeathBenefitRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.entity';
import { DeathBenefitRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/value-object/death-benefit-rejection-legal-proceeding-id.value-object';
import { DeathBenefitRejectionLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity';
import { DeathBenefitRejectionLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/value-object/death-benefit-rejection-legal-representative-id.value-object';
import { DeathBenefitRejectionPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/death-benefit-rejection-period.entity';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeathBenefitRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/death-benefit-rejection-period-document.entity';
import { DeathBenefitRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/value-object/death-benefit-rejection-period-document-id.value-object';
import { DeathBenefitRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.entity';
import { DeathBenefitRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/value-object/death-benefit-rejection-period-earnings-history-id.value-object';
import { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import { DeathBenefitRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.entity';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

@Injectable()
export class GetDeathBenefitRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDeathBenefitRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: DeathBenefitRejectionTypeormEntity,
    ): GetDeathBenefitRejectionWithRelationsQueryResult => {
      const deathBenefitRejectionEntity = this.mapper.map(
        source,
        DeathBenefitRejectionTypeormEntity,
        DeathBenefitRejectionEntity,
      );

      const deathBenefitRejectionResult =
        source.deathBenefitRejectionResult !== null &&
        source.deathBenefitRejectionResult !== undefined
          ? this.mapper.map(
              source.deathBenefitRejectionResult,
              DeathBenefitRejectionResultTypeormEntity,
              DeathBenefitRejectionResultEntity,
            )
          : null;

      const deathBenefitRejectionInssBenefit = (
        source.deathBenefitRejectionInssBenefit ?? []
      ).map(
        (item) =>
          new DeathBenefitRejectionInssBenefitEntity({
            id: new DeathBenefitRejectionInssBenefitId(item.id),
            inssBenefit: item.inssBenefit,
            deathBenefitRejectionId: deathBenefitRejectionEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitRejectionLegalProceeding = (
        source.deathBenefitRejectionLegalProceeding ?? []
      ).map(
        (item) =>
          new DeathBenefitRejectionLegalProceedingEntity({
            id: new DeathBenefitRejectionLegalProceedingId(item.id),
            legalProceedingNumber: item.legalProceedingNumber,
            deathBenefitRejectionId: deathBenefitRejectionEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const [legalRepresentativeItem] =
        source.deathBenefitRejectionLegalRepresentative ?? [];
      const deathBenefitRejectionLegalRepresentative = legalRepresentativeItem
        ? new DeathBenefitRejectionLegalRepresentativeEntity({
            id: new DeathBenefitRejectionLegalRepresentativeId(
              legalRepresentativeItem.id,
            ),
            name: legalRepresentativeItem.name,
            cpf:
              legalRepresentativeItem.cpf !== null
                ? new PersonalDocument(legalRepresentativeItem.cpf)
                : null,
            birthDate: legalRepresentativeItem.birthDate,
            legalRepresentativeRelationship:
              legalRepresentativeItem.legalRepresentativeRelationship,
            isMinorUnderGuardianship:
              legalRepresentativeItem.isMinorUnderGuardianship,
            deathBenefitRejectionId: deathBenefitRejectionEntity.id,
            createdAt: legalRepresentativeItem.createdAt,
            updatedAt: legalRepresentativeItem.updatedAt,
            deletedAt: legalRepresentativeItem.deletedAt,
          })
        : null;

      const [benefitInstitutor] =
        source.deathBenefitRejectionBenefitInstitutor ?? [];

      const deathBenefitRejectionDocument = benefitInstitutor
        ? (benefitInstitutor.deathBenefitRejectionDocument ?? []).map(
            (item) =>
              new DeathBenefitRejectionDocumentEntity({
                id: new DeathBenefitRejectionDocumentId(item.id),
                document: item.document,
                type: item.type,
                deathBenefitRejectionInstitorId:
                  new DeathBenefitRejectionInstitorId(benefitInstitutor.id),
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                deletedAt: item.deletedAt,
              }),
          )
        : [];

      const deathBenefitRejectionBenefitInstitutor = benefitInstitutor
        ? new DeathBenefitRejectionInstitorEntity({
            id: new DeathBenefitRejectionInstitorId(benefitInstitutor.id),
            name: benefitInstitutor.name,
            cpf:
              benefitInstitutor.cpf !== null
                ? new PersonalDocument(benefitInstitutor.cpf)
                : null,
            birthDate: benefitInstitutor.birthDate,
            gender: benefitInstitutor.gender,
            deathDate: benefitInstitutor.deathDate,
            wasRetired: benefitInstitutor.wasRetired,
            retirementBenefitNumber: benefitInstitutor.retirementBenefitNumber,
            isDeathDeclarantChildOrSpouse:
              benefitInstitutor.isDeathDeclarantChildOrSpouse,
            deathDeclarantRelationshipDescription:
              benefitInstitutor.deathDeclarantRelationshipDescription,
            wantsToProveWorkPeriodNotInCnis:
              benefitInstitutor.wantsToProveWorkPeriodNotInCnis,
            wasRuralInsured: benefitInstitutor.wasRuralInsured,
            ruralPeriodStartDate: benefitInstitutor.ruralPeriodStartDate,
            ruralPeriodEndDate: benefitInstitutor.ruralPeriodEndDate,
            ruralPeriodDocumentDescription:
              benefitInstitutor.ruralPeriodDocumentDescription,
            wasUnemployedAtDeath: benefitInstitutor.wasUnemployedAtDeath,
            wantsToProveDisabilityBeforeDeath:
              benefitInstitutor.wantsToProveDisabilityBeforeDeath,
            wantsToProveUnemploymentByWitness:
              benefitInstitutor.wantsToProveUnemploymentByWitness,
            deathBenefitRejectionId: deathBenefitRejectionEntity.id,
            createdAt: benefitInstitutor.createdAt,
            updatedAt: benefitInstitutor.updatedAt,
            deletedAt: benefitInstitutor.deletedAt,
            deathBenefitRejectionDocument,
          })
        : null;

      const deathBenefitRejectionDependent = (
        source.deathBenefitRejectionDependent ?? []
      ).map(
        (item) =>
          new DeathBenefitRejectionDependentEntity({
            id: new DeathBenefitRejectionDependentId(item.id),
            name: item.name,
            dependentClass: item.dependentClass,
            dependentType: item.dependentType,
            gender: item.gender,
            birthDate: item.birthDate,
            hasDisabilityOrInvalidism: item.hasDisabilityOrInvalidism,
            isMinorUnder16: item.isMinorUnder16,
            stableUnionOrMarriageStartDate: item.stableUnionOrMarriageStartDate,
            deathBenefitRejectionId: deathBenefitRejectionEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitRejectionDependentDocument = (
        source.deathBenefitRejectionDependent ?? []
      ).flatMap((dependent) =>
        (dependent.deathBenefitRejectionDependentDocument ?? []).map(
          (doc) =>
            new DeathBenefitRejectionDependentDocumentEntity({
              id: new DeathBenefitRejectionDependentDocumentId(doc.id),
              document: doc.document,
              deathBenefitRejectionDependentId:
                new DeathBenefitRejectionDependentId(dependent.id),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const deathBenefitRejectionPeriod = (
        source.deathBenefitRejectionPeriod ?? []
      ).map(
        (item) =>
          new DeathBenefitRejectionPeriodEntity({
            id: new DeathBenefitRejectionPeriodId(item.id),
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
            deathBenefitRejectionId: deathBenefitRejectionEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitRejectionPeriodDocument = (
        source.deathBenefitRejectionPeriod ?? []
      ).flatMap((period) =>
        (period.deathBenefitRejectionPeriodDocument ?? []).map(
          (doc) =>
            new DeathBenefitRejectionPeriodDocumentEntity({
              id: new DeathBenefitRejectionPeriodDocumentId(doc.id),
              document: doc.document,
              deathBenefitRejectionPeriodId: new DeathBenefitRejectionPeriodId(
                period.id,
              ),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const deathBenefitRejectionPeriodEarningsHistory = (
        source.deathBenefitRejectionPeriod ?? []
      ).flatMap((period) =>
        (period.deathBenefitRejectionPeriodEarningsHistory ?? []).map(
          (item) =>
            new DeathBenefitRejectionPeriodEarningsHistoryEntity({
              id: new DeathBenefitRejectionPeriodEarningsHistoryId(item.id),
              competence: item.competence,
              remuneration: item.remuneration,
              indicators: item.indicators,
              paymentDate: item.paymentDate,
              contribution: item.contribution,
              contributionSalary: item.contributionSalary,
              analysis: item.analysis,
              competenceBelowTheMinimum: item.competenceBelowTheMinimum,
              deathBenefitRejectionPeriodId: new DeathBenefitRejectionPeriodId(
                period.id,
              ),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      return GetDeathBenefitRejectionWithRelationsQueryResult.build({
        id: new DeathBenefitRejectionId(source.id),
        analysisName: source.analysisName,
        category: source.category,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        deathBenefitRejectionResult,
        deathBenefitRejectionInssBenefit,
        deathBenefitRejectionLegalProceeding,
        deathBenefitRejectionLegalRepresentative,
        deathBenefitRejectionBenefitInstitutor,
        deathBenefitRejectionDependent,
        deathBenefitRejectionDependentDocument,
        deathBenefitRejectionPeriod,
        deathBenefitRejectionPeriodDocument,
        deathBenefitRejectionPeriodEarningsHistory,
        deathBenefitRejectionTimeAccelerator: (
          source.deathBenefitRejectionTimeAccelerator ?? []
        ).map(
          (item) =>
            new DeathBenefitRejectionTimeAcceleratorEntity({
              id: new DeathBenefitRejectionTimeAcceleratorId(item.id),
              type: item.type,
              recognitionInss: item.recognitionInss,
              recognitionJudicial: item.recognitionJudicial,
              viability: item.viability,
              technicalNote: item.technicalNote,
              startDate: item.startDate,
              endDate: item.endDate,
              institution: item.institution,
              affectsQualifyingPeriod: item.affectsQualifyingPeriod,
              deathBenefitRejectionId: deathBenefitRejectionEntity.id,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      });
    };

    createMap(
      this.mapper,
      DeathBenefitRejectionTypeormEntity,
      GetDeathBenefitRejectionWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetDeathBenefitRejectionWithRelationsQueryResult,
    ): DeathBenefitRejectionTypeormEntity => {
      const deathBenefitRejectionResult =
        source.deathBenefitRejectionResult !== null
          ? this.mapper.map(
              source.deathBenefitRejectionResult,
              DeathBenefitRejectionResultEntity,
              DeathBenefitRejectionResultTypeormEntity,
            )
          : undefined;

      const deathBenefitRejectionBenefitInstitutor =
        source.deathBenefitRejectionBenefitInstitutor !== null
          ? [
              this.mapper.map(
                source.deathBenefitRejectionBenefitInstitutor,
                DeathBenefitRejectionInstitorEntity,
                DeathBenefitRejectionInstitorTypeormEntity,
              ),
            ]
          : undefined;

      const deathBenefitRejectionDependent = (
        source.deathBenefitRejectionDependent ?? []
      ).map((item) =>
        this.mapper.map(
          item,
          DeathBenefitRejectionDependentEntity,
          DeathBenefitRejectionDependentTypeormEntity,
        ),
      );

      return DeathBenefitRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category: source.category,
        deathBenefitRejectionResult,
        deathBenefitRejectionBenefitInstitutor,
        deathBenefitRejectionDependent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GetDeathBenefitRejectionWithRelationsQueryResult,
      DeathBenefitRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
