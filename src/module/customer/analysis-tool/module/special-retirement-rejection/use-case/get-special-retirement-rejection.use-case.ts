import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementRejectionCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-category.enum';
import { SpecialRetirementRejectionHarmfulAgentEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-harmful-agent.enum';
import { SpecialRetirementRejectionRejectionReasonEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-rejection-reason.enum';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/enum/special-retirement-rejection-document-type.enum';
import { SpecialRetirementRejectionWorkPeriodActivityTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-activity-type.enum';
import { SpecialRetirementRejectionWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-category.enum';
import { SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-period-consideration.enum';
import { SpecialRetirementRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/enum/special-retirement-rejection-work-period-document-type.enum';
import {
  GetSpecialRetirementRejectionClientResponseDto,
  GetSpecialRetirementRejectionDocumentResponseDto,
  GetSpecialRetirementRejectionInssBenefitResponseDto,
  GetSpecialRetirementRejectionLegalProceedingResponseDto,
  GetSpecialRetirementRejectionResponseDto,
  GetSpecialRetirementRejectionResultResponseDto,
  GetSpecialRetirementRejectionWorkPeriodDocumentResponseDto,
  GetSpecialRetirementRejectionWorkPeriodEarningsHistoryResponseDto,
  GetSpecialRetirementRejectionWorkPeriodResponseDto,
  GetSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkResponseDto,
  GetSpecialRetirementRejectionWorkSpecialPeriodResponseDto,
} from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/get-special-retirement-rejection.response.dto';
import { InvalidSpecialRetirementRejectionCompleteAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/invalid-special-retirement-rejection-complete-analysis-json.error';
import { InvalidSpecialRetirementRejectionFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/invalid-special-retirement-rejection-first-analysis-json.error';
import { SpecialRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-not-found.error';
import {
  SpecialRetirementRejectionCompleteAnalysisModel,
  SpecialRetirementRejectionRetirementRuleModel,
} from '@module/customer/analysis-tool/module/special-retirement-rejection/model/special-retirement-rejection-complete-analysis.model';
import {
  SpecialRetirementRejectionFirstAnalysisModel,
  SpecialRetirementRejectionFirstAnalysisWorkPeriodModel,
} from '@module/customer/analysis-tool/module/special-retirement-rejection/model/special-retirement-rejection-first-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetSpecialRetirementRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/query/result/get-special-retirement-rejection-with-relations.query.result';
import type { SpecialRetirementRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/interface/special-retirement-rejection-complete-analysis.interface';
import type { SpecialRetirementRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/interface/special-retirement-rejection-first-analysis.interface';

@Injectable()
export class GetSpecialRetirementRejectionUseCase {
  protected readonly _type = GetSpecialRetirementRejectionUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): Promise<GetSpecialRetirementRejectionResponseDto> {
    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementRejectionNotFoundError,
      );

    const specialRetirementRejection =
      analysisToolRecordQueryResult.specialRetirementRejection;

    if (specialRetirementRejection === null) {
      throw new SpecialRetirementRejectionNotFoundError();
    }

    const documents = (
      await Promise.all(
        (
          specialRetirementRejection.specialRetirementRejectionDocument ?? []
        ).map(async (document) => {
          const fileName = document.fileName;
          const type = document.type;

          if (fileName === null || type === null) {
            return null;
          }

          const [buffer, originalFileName] = await Promise.all([
            this.fileProcessorGateway.getFileBuffer(fileName),
            this.fileProcessorGateway.getOriginalFileName(fileName),
          ]);

          return GetSpecialRetirementRejectionDocumentResponseDto.build({
            document: new Base64(buffer.toString('base64')),
            originalFileName,
            type: type as SpecialRetirementRejectionDocumentTypeEnum,
          });
        }),
      )
    ).flatMap((document) => (document !== null ? [document] : []));

    const earningsHistoryByWorkPeriodId = this.groupBy(
      specialRetirementRejection.specialRetirementRejectionWorkPeriodEarningsHistory ??
        [],
      (item) => item.specialRetirementRejectionWorkPeriodId?.toString() ?? '',
    );

    const specialPeriodsByWorkPeriodId = this.groupBy(
      specialRetirementRejection.specialRetirementRejectionWorkSpecialPeriod ??
        [],
      (item) => item.specialRetirementRejectionWorkPeriodId?.toString() ?? '',
    );

    const legalFrameworksBySpecialPeriodId = this.groupBy(
      specialRetirementRejection.specialRetirementRejectionWorkSpecialPeriodLegalFramework ??
        [],
      (item) =>
        item.specialRetirementRejectionWorkSpecialPeriodId?.toString() ?? '',
    );

    const workPeriods = await Promise.all(
      (
        specialRetirementRejection.specialRetirementRejectionWorkPeriod ?? []
      ).map(async (workPeriod) => {
        const documentsForWorkPeriod = (
          specialRetirementRejection.specialRetirementRejectionWorkPeriodDocument ??
          []
        ).filter(
          (document) =>
            document.specialRetirementRejectionWorkPeriodId?.toString() ===
            workPeriod.id.toString(),
        );

        const documentResponses = (
          await Promise.all(
            documentsForWorkPeriod.map(async (document) => {
              const fileName = document.fileName;
              const type = document.type;

              if (fileName === null || type === null) {
                return null;
              }

              const [buffer, originalFileName] = await Promise.all([
                this.fileProcessorGateway.getFileBuffer(fileName),
                this.fileProcessorGateway.getOriginalFileName(fileName),
              ]);

              return GetSpecialRetirementRejectionWorkPeriodDocumentResponseDto.build(
                {
                  document: new Base64(buffer.toString('base64')),
                  originalFileName,
                  type: type as SpecialRetirementRejectionWorkPeriodDocumentTypeEnum,
                },
              );
            }),
          )
        ).flatMap((document) => (document !== null ? [document] : []));

        const earningsHistory = (
          earningsHistoryByWorkPeriodId.get(workPeriod.id.toString()) ?? []
        ).map((item) =>
          GetSpecialRetirementRejectionWorkPeriodEarningsHistoryResponseDto.build(
            {
              specialRetirementRejectionWorkPeriodEarningsHistoryId: item.id,
              ...(item.competence !== null && { competence: item.competence }),
              ...(item.remuneration !== null && {
                remuneration: item.remuneration,
              }),
              ...(item.indicators !== null && { indicators: item.indicators }),
              ...(item.paymentDate !== null && {
                paymentDate: item.paymentDate,
              }),
              ...(item.contribution !== null && {
                contribution: item.contribution,
              }),
              ...(item.contributionSalary !== null && {
                contributionSalary: item.contributionSalary,
              }),
              ...(item.competenceBelowTheMinimum !== null && {
                competenceBelowTheMinimum: item.competenceBelowTheMinimum,
              }),
              updatedAt: item.updatedAt,
            },
          ),
        );

        const specialPeriods = (
          specialPeriodsByWorkPeriodId.get(workPeriod.id.toString()) ?? []
        ).map((specialPeriod) => {
          const legalFrameworks = (
            legalFrameworksBySpecialPeriodId.get(specialPeriod.id.toString()) ??
            []
          ).map((legalFramework) =>
            GetSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkResponseDto.build(
              {
                ...(legalFramework.code !== null && {
                  code: legalFramework.code,
                }),
                ...(legalFramework.description !== null && {
                  description: legalFramework.description,
                }),
                updatedAt: legalFramework.updatedAt,
              },
            ),
          );

          return GetSpecialRetirementRejectionWorkSpecialPeriodResponseDto.build(
            {
              specialRetirementRejectionWorkSpecialPeriodId: specialPeriod.id,
              ...(specialPeriod.startDate !== null && {
                startDate: specialPeriod.startDate,
              }),
              ...(specialPeriod.endDate !== null && {
                endDate: specialPeriod.endDate,
              }),
              ...(specialPeriod.harmfulAgents !== null && {
                harmfulAgents:
                  specialPeriod.harmfulAgents as SpecialRetirementRejectionHarmfulAgentEnum[],
              }),
              ...(specialPeriod.otherAgents !== null && {
                otherAgents: specialPeriod.otherAgents,
              }),
              ...(specialPeriod.companyName !== null && {
                companyName: specialPeriod.companyName,
              }),
              ...(specialPeriod.companyDocument !== null && {
                companyDocument: specialPeriod.companyDocument,
              }),
              ...(legalFrameworks.length > 0 && { legalFrameworks }),
              updatedAt: specialPeriod.updatedAt,
            },
          );
        });

        return GetSpecialRetirementRejectionWorkPeriodResponseDto.build({
          specialRetirementRejectionWorkPeriodId: workPeriod.id,
          ...(workPeriod.bondOrigin !== null && {
            bondOrigin: workPeriod.bondOrigin,
          }),
          ...(workPeriod.startDate !== null && {
            startDate: workPeriod.startDate,
          }),
          ...(workPeriod.endDate !== null && { endDate: workPeriod.endDate }),
          ...(workPeriod.category !== null && {
            category:
              workPeriod.category as SpecialRetirementRejectionWorkPeriodCategoryEnum,
          }),
          ...(workPeriod.pendencyReason !== null && {
            pendencyReason: workPeriod.pendencyReason,
          }),
          ...(workPeriod.periodConsideration !== null && {
            periodConsideration:
              workPeriod.periodConsideration as SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum,
          }),
          ...(workPeriod.contributionAverage !== null && {
            contributionAverage: workPeriod.contributionAverage,
          }),
          ...(workPeriod.status !== null && {
            status: workPeriod.status,
          }),
          ...(workPeriod.gracePeriod !== null && {
            gracePeriod: workPeriod.gracePeriod,
          }),
          ...(workPeriod.activityType !== null && {
            activityType:
              workPeriod.activityType as SpecialRetirementRejectionWorkPeriodActivityTypeEnum,
          }),
          ...(documentResponses.length > 0 && { documents: documentResponses }),
          ...(earningsHistory.length > 0 && { earningsHistory }),
          ...(specialPeriods.length > 0 && { specialPeriods }),
          updatedAt: workPeriod.updatedAt,
        });
      }),
    );

    const inssBenefits = (
      specialRetirementRejection.specialRetirementRejectionInssBenefit ?? []
    ).flatMap((benefit) =>
      benefit.benefitNumber !== null
        ? [
            GetSpecialRetirementRejectionInssBenefitResponseDto.build({
              benefitNumber: benefit.benefitNumber,
            }),
          ]
        : [],
    );

    const legalProceedings = (
      specialRetirementRejection.specialRetirementRejectionLegalProceeding ?? []
    ).flatMap((legalProceeding) =>
      legalProceeding.number !== null
        ? [
            GetSpecialRetirementRejectionLegalProceedingResponseDto.build({
              number: legalProceeding.number,
            }),
          ]
        : [],
    );

    const specialRetirementRejectionResult = await this.buildResultResponse(
      specialRetirementRejection,
    );

    return GetSpecialRetirementRejectionResponseDto.build({
      specialRetirementRejectionId:
        specialRetirementRejection.specialRetirementRejectionId,
      ...(specialRetirementRejection.analysisName !== null && {
        analysisName: specialRetirementRejection.analysisName,
      }),
      ...(specialRetirementRejection.category !== null && {
        category:
          specialRetirementRejection.category as SpecialRetirementRejectionCategoryEnum,
      }),
      ...(specialRetirementRejection.requirementStartDate !== null && {
        requirementStartDate: specialRetirementRejection.requirementStartDate,
      }),
      ...(specialRetirementRejection.rejectionDate !== null && {
        rejectionDate: specialRetirementRejection.rejectionDate,
      }),
      ...(specialRetirementRejection.harmfulAgents !== null && {
        harmfulAgents:
          specialRetirementRejection.harmfulAgents as SpecialRetirementRejectionHarmfulAgentEnum[],
      }),
      ...(specialRetirementRejection.otherAgents !== null && {
        otherAgents: specialRetirementRejection.otherAgents,
      }),
      ...(specialRetirementRejection.rejectionReason !== null && {
        rejectionReason:
          specialRetirementRejection.rejectionReason as SpecialRetirementRejectionRejectionReasonEnum,
      }),
      ...(specialRetirementRejection.otherRejectionReason !== null && {
        otherRejectionReason: specialRetirementRejection.otherRejectionReason,
      }),
      ...(inssBenefits.length > 0 && { inssBenefits }),
      ...(legalProceedings.length > 0 && { legalProceedings }),
      ...(documents.length > 0 && { documents }),
      ...(workPeriods.length > 0 && { workPeriods }),
      ...(specialRetirementRejectionResult !== null && {
        specialRetirementRejectionResult,
      }),
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetSpecialRetirementRejectionClientResponseDto.build({
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        ...(analysisToolRecordQueryResult.analysisToolClient.name !== null && {
          name: analysisToolRecordQueryResult.analysisToolClient.name,
        }),
        ...(analysisToolRecordQueryResult.analysisToolClient.federalDocument !==
          null && {
          federalDocument:
            analysisToolRecordQueryResult.analysisToolClient.federalDocument,
        }),
        ...(analysisToolRecordQueryResult.analysisToolClient.email !== null && {
          email: analysisToolRecordQueryResult.analysisToolClient.email,
        }),
        ...(analysisToolRecordQueryResult.analysisToolClient.phoneNumber !==
          null && {
          phoneNumber:
            analysisToolRecordQueryResult.analysisToolClient.phoneNumber,
        }),
        ...(analysisToolRecordQueryResult.analysisToolClient.birthDate !==
          null && {
          birthDate: analysisToolRecordQueryResult.analysisToolClient.birthDate,
        }),
        ...(analysisToolRecordQueryResult.analysisToolClient.gender !==
          null && {
          gender: analysisToolRecordQueryResult.analysisToolClient.gender,
        }),
        ...(analysisToolRecordQueryResult.analysisToolClient.clientType !==
          null && {
          clientType:
            analysisToolRecordQueryResult.analysisToolClient.clientType,
        }),
      }),
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });
  }

  private async buildResultResponse(
    specialRetirementRejection: GetSpecialRetirementRejectionWithRelationsQueryResult,
  ): Promise<GetSpecialRetirementRejectionResultResponseDto | null> {
    const result = specialRetirementRejection.specialRetirementRejectionResult;

    if (result === null) {
      return null;
    }

    const firstAnalysis =
      result.firstAnalysis !== null
        ? this.parseFirstAnalysis(result.firstAnalysis)
        : null;

    const completeAnalysis =
      result.completeAnalysis !== null
        ? this.parseCompleteAnalysis(result.completeAnalysis)
        : null;

    return GetSpecialRetirementRejectionResultResponseDto.build({
      ...(firstAnalysis !== null && {
        specialRetirementRejectionFirstAnalysis: firstAnalysis,
      }),
      ...(completeAnalysis !== null && {
        specialRetirementRejectionCompleteAnalysis: completeAnalysis,
      }),
      ...(result.simplifiedAnalysis !== null && {
        specialRetirementRejectionSimplifiedAnalysis: result.simplifiedAnalysis,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private groupBy<T>(
    items: T[],
    getKey: (item: T) => string,
  ): Map<string, T[]> {
    const grouped = new Map<string, T[]>();

    for (const item of items) {
      const key = getKey(item);
      const currentItems = grouped.get(key) ?? [];

      currentItems.push(item);
      grouped.set(key, currentItems);
    }

    return grouped;
  }

  private parseFirstAnalysis(
    raw: string,
  ): SpecialRetirementRejectionFirstAnalysisModel {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(
        cleanedJson,
      ) as SpecialRetirementRejectionFirstAnalysisInterface;

      return SpecialRetirementRejectionFirstAnalysisModel.build({
        decisionAnalysis: parsed.decisionAnalysis,
        specialTimeWithoutResolvingPendencies:
          parsed.specialTimeWithoutResolvingPendencies,
        specialTimeResolvingPendencies: parsed.specialTimeResolvingPendencies,
        specialTimeWithAccelerators: parsed.specialTimeWithAccelerators,
        commonTimeWithoutResolvingPendencies:
          parsed.commonTimeWithoutResolvingPendencies,
        commonTimeResolvingPendencies: parsed.commonTimeResolvingPendencies,
        commonTimeWithAccelerators: parsed.commonTimeWithAccelerators,
        totalTimeWithoutResolvingPendencies:
          parsed.totalTimeWithoutResolvingPendencies,
        totalTimeResolvingPendencies: parsed.totalTimeResolvingPendencies,
        totalTimeWithAccelerators: parsed.totalTimeWithAccelerators,
        specialGracePeriodWithoutResolvingPendencies:
          parsed.specialGracePeriodWithoutResolvingPendencies,
        specialGracePeriodResolvingPendencies:
          parsed.specialGracePeriodResolvingPendencies,
        specialGracePeriodWithAccelerators:
          parsed.specialGracePeriodWithAccelerators,
        commonGracePeriodWithoutResolvingPendencies:
          parsed.commonGracePeriodWithoutResolvingPendencies,
        commonGracePeriodResolvingPendencies:
          parsed.commonGracePeriodResolvingPendencies,
        commonGracePeriodWithAccelerators:
          parsed.commonGracePeriodWithAccelerators,
        totalGracePeriodWithoutResolvingPendencies:
          parsed.totalGracePeriodWithoutResolvingPendencies,
        totalGracePeriodResolvingPendencies:
          parsed.totalGracePeriodResolvingPendencies,
        totalGracePeriodWithAccelerators:
          parsed.totalGracePeriodWithAccelerators,
        workPeriods: parsed.workPeriods.map((workPeriod) =>
          SpecialRetirementRejectionFirstAnalysisWorkPeriodModel.build({
            bondOrigin: workPeriod.bondOrigin,
            startDate: workPeriod.startDate,
            endDate: workPeriod.endDate,
            category: workPeriod.category,
            pendencyReason: workPeriod.pendencyReason,
            periodConsideration: workPeriod.periodConsideration,
            contributionAverage: workPeriod.contributionAverage,
            status: workPeriod.status,
            gracePeriod: workPeriod.gracePeriod,
            activityType: workPeriod.activityType,
          }),
        ),
      });
    } catch {
      throw new InvalidSpecialRetirementRejectionFirstAnalysisJsonError();
    }
  }

  private parseCompleteAnalysis(
    raw: string,
  ): SpecialRetirementRejectionCompleteAnalysisModel {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(
        cleanedJson,
      ) as SpecialRetirementRejectionCompleteAnalysisInterface;

      return SpecialRetirementRejectionCompleteAnalysisModel.build({
        retirementRules: parsed.retirementRules.map((rule) =>
          SpecialRetirementRejectionRetirementRuleModel.build({
            ruleName: rule.ruleName,
            fulfilled: rule.fulfilled,
            grantDate: rule.grantDate,
            expectedRmi: rule.expectedRmi,
            causeValue: rule.causeValue,
            bestRmi: rule.bestRmi,
            biggestCauseValue: rule.biggestCauseValue,
            detaildAnalysis: rule.detaildAnalysis,
          }),
        ),
        analysisResult: parsed.analysisResult,
      });
    } catch {
      throw new InvalidSpecialRetirementRejectionCompleteAnalysisJsonError();
    }
  }
}
