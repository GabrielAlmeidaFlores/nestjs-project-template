import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import { DeathBenefitGrantDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent.typeorm.entity';
import { DeathBenefitGrantInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-institutor.typeorm.entity';
import { DeathBenefitGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-result.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { GetDeathBenefitGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/result/get-death-benefit-grant-with-relations.query.result';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/death-benefit-grant-dependent.entity';
import { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import { DeathBenefitGrantDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.entity';
import { DeathBenefitGrantDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/value-object/death-benefit-grant-dependent-document-id.value-object';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';
import { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';
import { DeathBenefitGrantInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/value-object/death-benefit-grant-inss-benefit-id.value-object';
import { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';
import { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';
import { DeathBenefitGrantLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/value-object/death-benefit-grant-legal-proceeding-id.value-object';
import { DeathBenefitGrantLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity';
import { DeathBenefitGrantLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/value-object/death-benefit-grant-legal-representative-id.value-object';
import { DeathBenefitGrantPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { DeathBenefitGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/death-benefit-grant-period-document.entity';
import { DeathBenefitGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/value-object/death-benefit-grant-period-document-id.value-object';
import { DeathBenefitGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.entity';
import { DeathBenefitGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/value-object/death-benefit-grant-period-earnings-history-id.value-object';
import { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';
import { DeathBenefitGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.entity';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

@Injectable()
export class GetDeathBenefitGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDeathBenefitGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: DeathBenefitGrantTypeormEntity,
    ): GetDeathBenefitGrantWithRelationsQueryResult => {
      const deathBenefitGrantEntity = this.mapper.map(
        source,
        DeathBenefitGrantTypeormEntity,
        DeathBenefitGrantEntity,
      );

      const deathBenefitGrantResult =
        source.deathBenefitGrantResult !== null &&
        source.deathBenefitGrantResult !== undefined
          ? this.mapper.map(
              source.deathBenefitGrantResult,
              DeathBenefitGrantResultTypeormEntity,
              DeathBenefitGrantResultEntity,
            )
          : null;

      const deathBenefitGrantInssBenefit = (
        source.deathBenefitGrantInssBenefit ?? []
      ).map(
        (item) =>
          new DeathBenefitGrantInssBenefitEntity({
            id: new DeathBenefitGrantInssBenefitId(item.id),
            inssBenefit: item.inssBenefit,
            deathBenefitGrantId: deathBenefitGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitGrantLegalProceeding = (
        source.deathBenefitGrantLegalProceeding ?? []
      ).map(
        (item) =>
          new DeathBenefitGrantLegalProceedingEntity({
            id: new DeathBenefitGrantLegalProceedingId(item.id),
            legalProceedingNumber: item.legalProceedingNumber,
            deathBenefitGrantId: deathBenefitGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const [legalRepresentativeItem] =
        source.deathBenefitGrantLegalRepresentative ?? [];
      const deathBenefitGrantLegalRepresentative = legalRepresentativeItem
        ? new DeathBenefitGrantLegalRepresentativeEntity({
            id: new DeathBenefitGrantLegalRepresentativeId(
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
            deathBenefitGrantId: deathBenefitGrantEntity.id,
            createdAt: legalRepresentativeItem.createdAt,
            updatedAt: legalRepresentativeItem.updatedAt,
            deletedAt: legalRepresentativeItem.deletedAt,
          })
        : null;

      const [benefitInstitutor] =
        source.deathBenefitGrantBenefitInstitutor ?? [];

      const deathBenefitGrantDocument = benefitInstitutor
        ? (benefitInstitutor.deathBenefitGrantDocument ?? []).map(
            (item) =>
              new DeathBenefitGrantDocumentEntity({
                id: new DeathBenefitGrantDocumentId(item.id),
                document: item.document,
                type: item.type,
                deathBenefitGrantInstitorId: new DeathBenefitGrantInstitorId(
                  benefitInstitutor.id,
                ),
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                deletedAt: item.deletedAt,
              }),
          )
        : [];

      const deathBenefitGrantBenefitInstitutor = benefitInstitutor
        ? new DeathBenefitGrantInstitorEntity({
            id: new DeathBenefitGrantInstitorId(benefitInstitutor.id),
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
            deathBenefitGrantId: deathBenefitGrantEntity.id,
            createdAt: benefitInstitutor.createdAt,
            updatedAt: benefitInstitutor.updatedAt,
            deletedAt: benefitInstitutor.deletedAt,
            deathBenefitGrantDocument,
          })
        : null;

      const deathBenefitGrantDependent = (
        source.deathBenefitGrantDependent ?? []
      ).map(
        (item) =>
          new DeathBenefitGrantDependentEntity({
            id: new DeathBenefitGrantDependentId(item.id),
            name: item.name,
            dependentClass: item.dependentClass,
            dependentType: item.dependentType,
            gender: item.gender,
            birthDate: item.birthDate,
            hasDisabilityOrInvalidism: item.hasDisabilityOrInvalidism,
            isMinorUnder16: item.isMinorUnder16,
            stableUnionOrMarriageStartDate: item.stableUnionOrMarriageStartDate,
            deathBenefitGrantId: deathBenefitGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitGrantDependentDocument = (
        source.deathBenefitGrantDependent ?? []
      ).flatMap((dependent) =>
        (dependent.deathBenefitGrantDependentDocument ?? []).map(
          (doc) =>
            new DeathBenefitGrantDependentDocumentEntity({
              id: new DeathBenefitGrantDependentDocumentId(doc.id),
              document: doc.document,
              deathBenefitGrantDependentId: new DeathBenefitGrantDependentId(
                dependent.id,
              ),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const deathBenefitGrantPeriod = (
        source.deathBenefitGrantPeriod ?? []
      ).map(
        (item) =>
          new DeathBenefitGrantPeriodEntity({
            id: new DeathBenefitGrantPeriodId(item.id),
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
            deathBenefitGrantId: deathBenefitGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const deathBenefitGrantPeriodDocument = (
        source.deathBenefitGrantPeriod ?? []
      ).flatMap((period) =>
        (period.deathBenefitGrantPeriodDocument ?? []).map(
          (doc) =>
            new DeathBenefitGrantPeriodDocumentEntity({
              id: new DeathBenefitGrantPeriodDocumentId(doc.id),
              document: doc.document,
              deathBenefitGrantPeriodId: new DeathBenefitGrantPeriodId(
                period.id,
              ),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const deathBenefitGrantPeriodEarningsHistory = (
        source.deathBenefitGrantPeriod ?? []
      ).flatMap((period) =>
        (period.deathBenefitGrantPeriodEarningsHistory ?? []).map(
          (item) =>
            new DeathBenefitGrantPeriodEarningsHistoryEntity({
              id: new DeathBenefitGrantPeriodEarningsHistoryId(item.id),
              competence: item.competence,
              remuneration: item.remuneration,
              indicators: item.indicators,
              paymentDate: item.paymentDate,
              contribution: item.contribution,
              contributionSalary: item.contributionSalary,
              analysis: item.analysis,
              competenceBelowTheMinimum: item.competenceBelowTheMinimum,
              deathBenefitGrantPeriodId: new DeathBenefitGrantPeriodId(
                period.id,
              ),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      return GetDeathBenefitGrantWithRelationsQueryResult.build({
        id: new DeathBenefitGrantId(source.id),
        analysisName: source.analysisName,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        deathBenefitGrantResult,
        deathBenefitGrantInssBenefit,
        deathBenefitGrantLegalProceeding,
        deathBenefitGrantLegalRepresentative,
        deathBenefitGrantBenefitInstitutor,
        deathBenefitGrantDependent,
        deathBenefitGrantDependentDocument,
        deathBenefitGrantPeriod,
        deathBenefitGrantPeriodDocument,
        deathBenefitGrantPeriodEarningsHistory,
        deathBenefitGrantTimeAccelerator: (
          source.deathBenefitGrantTimeAccelerator ?? []
        ).map(
          (item) =>
            new DeathBenefitGrantTimeAcceleratorEntity({
              id: new DeathBenefitGrantTimeAcceleratorId(item.id),
              type: item.type,
              recognitionInss: item.recognitionInss,
              recognitionJudicial: item.recognitionJudicial,
              viability: item.viability,
              technicalNote: item.technicalNote,
              startDate: item.startDate,
              endDate: item.endDate,
              institution: item.institution,
              affectsQualifyingPeriod: item.affectsQualifyingPeriod,
              deathBenefitGrantId: deathBenefitGrantEntity.id,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      });
    };

    createMap(
      this.mapper,
      DeathBenefitGrantTypeormEntity,
      GetDeathBenefitGrantWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetDeathBenefitGrantWithRelationsQueryResult,
    ): DeathBenefitGrantTypeormEntity => {
      const deathBenefitGrantResult =
        source.deathBenefitGrantResult !== null
          ? this.mapper.map(
              source.deathBenefitGrantResult,
              DeathBenefitGrantResultEntity,
              DeathBenefitGrantResultTypeormEntity,
            )
          : undefined;

      const deathBenefitGrantBenefitInstitutor =
        source.deathBenefitGrantBenefitInstitutor !== null
          ? [
              this.mapper.map(
                source.deathBenefitGrantBenefitInstitutor,
                DeathBenefitGrantInstitorEntity,
                DeathBenefitGrantInstitorTypeormEntity,
              ),
            ]
          : undefined;

      const deathBenefitGrantDependent = (
        source.deathBenefitGrantDependent ?? []
      ).map((item) =>
        this.mapper.map(
          item,
          DeathBenefitGrantDependentEntity,
          DeathBenefitGrantDependentTypeormEntity,
        ),
      );

      return DeathBenefitGrantTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        deathBenefitGrantResult,
        deathBenefitGrantBenefitInstitutor,
        deathBenefitGrantDependent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GetDeathBenefitGrantWithRelationsQueryResult,
      DeathBenefitGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
