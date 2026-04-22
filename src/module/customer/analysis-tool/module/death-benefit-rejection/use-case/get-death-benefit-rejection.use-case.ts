import { Inject, Injectable } from '@nestjs/common';

import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-document-type.enum';
import {
  GetDeathBenefitRejectionResponseDto,
  GetDeathBenefitRejectionCnisDocumentResponseDto,
  GetDeathBenefitRejectionInssBenefitResponseDto,
  GetDeathBenefitRejectionLegalProceedingResponseDto,
  GetDeathBenefitRejectionResultResponseDto,
  GetDeathBenefitRejectionLegalRepresentativeResponseDto,
  GetDeathBenefitRejectionInstitorResponseDto,
  GetDeathBenefitRejectionDependentResponseDto,
  GetDeathBenefitRejectionDependentDocumentResponseDto,
  GetDeathBenefitRejectionPeriodResponseDto,
  GetDeathBenefitRejectionPeriodEarningsHistoryResponseDto,
} from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/get-death-benefit-rejection.response.dto';
import { DeathBenefitRejectionDependentNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-dependent-not-found.error';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';

@Injectable()
export class GetDeathBenefitRejectionUseCase {
  protected readonly _type = GetDeathBenefitRejectionUseCase.name;

  public constructor(
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<GetDeathBenefitRejectionResponseDto> {
    const result =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const cnisDocumentEntity =
      result.deathBenefitRejectionBenefitInstitutor?.deathBenefitRejectionDocument?.find(
        (document) =>
          document.type === DeathBenefitRejectionDocumentTypeEnum.CNIS,
      ) ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.document)
        : null;

    return GetDeathBenefitRejectionResponseDto.build({
      id: result.id,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.deathBenefitRejectionResult !== null && {
        deathBenefitRejectionResult:
          GetDeathBenefitRejectionResultResponseDto.build({
            ...(result.deathBenefitRejectionResult
              .deathBenefitRejectionFirstAnalysis !== null && {
              deathBenefitRejectionFirstAnalysis:
                result.deathBenefitRejectionResult
                  .deathBenefitRejectionFirstAnalysis,
            }),
            ...(result.deathBenefitRejectionResult
              .deathBenefitRejectionCompleteAnalysis !== null && {
              deathBenefitRejectionCompleteAnalysis:
                result.deathBenefitRejectionResult
                  .deathBenefitRejectionCompleteAnalysis,
            }),
            ...(result.deathBenefitRejectionResult
              .deathBenefitRejectionSimplifiedAnalysis !== null && {
              deathBenefitRejectionSimplifiedAnalysis:
                result.deathBenefitRejectionResult
                  .deathBenefitRejectionSimplifiedAnalysis,
            }),
            ...(result.deathBenefitRejectionResult
              .deathBenefitRejectionCompleteAnalysisDownload !== null && {
              deathBenefitRejectionCompleteAnalysisDownload:
                result.deathBenefitRejectionResult
                  .deathBenefitRejectionCompleteAnalysisDownload,
            }),
          }),
      }),
      ...(result.deathBenefitRejectionInssBenefit !== null && {
        deathBenefitRejectionInssBenefit:
          result.deathBenefitRejectionInssBenefit.map((b) =>
            GetDeathBenefitRejectionInssBenefitResponseDto.build({
              inssBenefit: b.inssBenefit,
            }),
          ),
      }),
      ...(result.deathBenefitRejectionLegalProceeding !== null && {
        deathBenefitRejectionLegalProceeding:
          result.deathBenefitRejectionLegalProceeding.map((p) =>
            GetDeathBenefitRejectionLegalProceedingResponseDto.build({
              legalProceedingNumber: p.legalProceedingNumber,
            }),
          ),
      }),
      ...(result.deathBenefitRejectionLegalRepresentative !== null && {
        deathBenefitRejectionLegalRepresentative:
          GetDeathBenefitRejectionLegalRepresentativeResponseDto.build({
            ...(result.deathBenefitRejectionLegalRepresentative.name !==
              null && {
              name: result.deathBenefitRejectionLegalRepresentative.name,
            }),
            ...(result.deathBenefitRejectionLegalRepresentative.cpf !==
              null && {
              cpf: result.deathBenefitRejectionLegalRepresentative.cpf.toString(),
            }),
            ...(result.deathBenefitRejectionLegalRepresentative.birthDate !==
              null && {
              birthDate:
                result.deathBenefitRejectionLegalRepresentative.birthDate,
            }),
            ...(result.deathBenefitRejectionLegalRepresentative
              .legalRepresentativeRelationship !== null && {
              legalRepresentativeRelationship:
                result.deathBenefitRejectionLegalRepresentative
                  .legalRepresentativeRelationship,
            }),
            ...(result.deathBenefitRejectionLegalRepresentative
              .isMinorUnderGuardianship !== null && {
              isMinorUnderGuardianship:
                result.deathBenefitRejectionLegalRepresentative
                  .isMinorUnderGuardianship,
            }),
          }),
      }),
      ...(result.deathBenefitRejectionBenefitInstitutor !== null && {
        deathBenefitRejectionBenefitInstitutor:
          GetDeathBenefitRejectionInstitorResponseDto.build({
            ...(result.deathBenefitRejectionBenefitInstitutor.name !== null && {
              name: result.deathBenefitRejectionBenefitInstitutor.name,
            }),
            ...(result.deathBenefitRejectionBenefitInstitutor.cpf !== null && {
              cpf: result.deathBenefitRejectionBenefitInstitutor.cpf.toString(),
            }),
            ...(result.deathBenefitRejectionBenefitInstitutor.birthDate !==
              null && {
              birthDate:
                result.deathBenefitRejectionBenefitInstitutor.birthDate,
            }),
            ...(result.deathBenefitRejectionBenefitInstitutor.gender !==
              null && {
              gender: result.deathBenefitRejectionBenefitInstitutor.gender,
            }),
            ...(result.deathBenefitRejectionBenefitInstitutor.deathDate !==
              null && {
              deathDate:
                result.deathBenefitRejectionBenefitInstitutor.deathDate,
            }),
            ...(result.deathBenefitRejectionBenefitInstitutor.wasRetired !==
              null && {
              wasRetired:
                result.deathBenefitRejectionBenefitInstitutor.wasRetired,
            }),
            ...(result.deathBenefitRejectionBenefitInstitutor
              .retirementBenefitNumber !== null && {
              retirementBenefitNumber:
                result.deathBenefitRejectionBenefitInstitutor
                  .retirementBenefitNumber,
            }),
          }),
      }),
      ...(result.deathBenefitRejectionDependent !== null && {
        deathBenefitRejectionDependent: await Promise.all(
          result.deathBenefitRejectionDependent.map((dep) =>
            this.buildDependentResponse(dep.id.toString(), result),
          ),
        ),
      }),
      ...(result.deathBenefitRejectionPeriod !== null && {
        deathBenefitRejectionPeriod: result.deathBenefitRejectionPeriod.map(
          (p) => {
            const periodEarningsHistory = (
              result.deathBenefitRejectionPeriodEarningsHistory ?? []
            ).filter(
              (eh) =>
                eh.deathBenefitRejectionPeriodId.toString() === p.id.toString(),
            );

            return GetDeathBenefitRejectionPeriodResponseDto.build({
              startDate: p.startDate,
              ...(p.endDate !== null && { endDate: p.endDate }),
              category: p.category,
              isPendency: p.isPendency,
              competenceBelowTheMinimum: p.competenceBelowTheMinimum,
              ...(p.pendencyReason !== null && {
                pendencyReason: p.pendencyReason,
              }),
              ...(p.typeOfContribution !== null && {
                typeOfContribution: p.typeOfContribution,
              }),
              status: p.status,
              ...(p.periodConsideration !== null && {
                periodConsideration: p.periodConsideration,
              }),
              ...(p.contributionAverage !== null && {
                contributionAverage: p.contributionAverage,
              }),
              ...(p.bondOrigin !== null && { bondOrigin: p.bondOrigin }),
              ...(p.impact !== null && { impact: p.impact }),
              ...(p.gracePeriod !== null && { gracePeriod: p.gracePeriod }),
              ...(p.complementViaMyInss !== null && {
                complementViaMyInss: p.complementViaMyInss,
              }),
              ...(periodEarningsHistory.length > 0 && {
                earningsHistory: periodEarningsHistory.map((eh) =>
                  GetDeathBenefitRejectionPeriodEarningsHistoryResponseDto.build(
                    {
                      ...(eh.competence !== null && {
                        competence: eh.competence,
                      }),
                      ...(eh.remuneration !== null && {
                        remuneration: eh.remuneration,
                      }),
                      ...(eh.indicators !== null && {
                        indicators: eh.indicators,
                      }),
                      ...(eh.paymentDate !== null && {
                        paymentDate: eh.paymentDate,
                      }),
                      ...(eh.contribution !== null && {
                        contribution: eh.contribution,
                      }),
                      ...(eh.contributionSalary !== null && {
                        contributionSalary: eh.contributionSalary,
                      }),
                      ...(eh.analysis !== null && { analysis: eh.analysis }),
                      ...(eh.competenceBelowTheMinimum !== null && {
                        competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                      }),
                    },
                  ),
                ),
              }),
            });
          },
        ),
      }),
    });
  }

  private async buildCnisDocumentResponse(
    document: string,
  ): Promise<GetDeathBenefitRejectionCnisDocumentResponseDto> {
    const [documentUrl, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileSignedUrl(document),
      this.fileProcessorGateway.getOriginalFileName(document),
    ]);

    return GetDeathBenefitRejectionCnisDocumentResponseDto.build({
      document: documentUrl.toString(),
      originalFileName,
    });
  }

  private async buildDependentResponse(
    dependentIdString: string,
    result: Awaited<
      ReturnType<
        DeathBenefitRejectionQueryRepositoryGateway['findOneByDeathBenefitRejectionIdOrFailWithRelations']
      >
    >,
  ): Promise<GetDeathBenefitRejectionDependentResponseDto> {
    const dep = (result.deathBenefitRejectionDependent ?? []).find(
      (d) => d.id.toString() === dependentIdString,
    );

    if (!dep) {
      throw new DeathBenefitRejectionDependentNotFoundError();
    }

    const dependentDocs = (
      result.deathBenefitRejectionDependentDocument ?? []
    ).filter(
      (d) =>
        d.deathBenefitRejectionDependentId.toString() === dependentIdString,
    );

    const builtDocs =
      dependentDocs.length > 0
        ? await Promise.all(
            dependentDocs.map(async (doc) => {
              const [documentUrl, originalFileName] = await Promise.all([
                this.fileProcessorGateway.getFileSignedUrl(doc.document),
                this.fileProcessorGateway.getOriginalFileName(doc.document),
              ]);

              return GetDeathBenefitRejectionDependentDocumentResponseDto.build(
                {
                  document: documentUrl.toString(),
                  originalFileName,
                },
              );
            }),
          )
        : [];

    return GetDeathBenefitRejectionDependentResponseDto.build({
      name: dep.name,
      dependentClass: dep.dependentClass,
      dependentType: dep.dependentType,
      gender: dep.gender,
      birthDate: dep.birthDate,
      hasDisabilityOrInvalidism: dep.hasDisabilityOrInvalidism,
      isMinorUnder16: dep.isMinorUnder16,
      ...(dep.stableUnionOrMarriageStartDate !== null && {
        stableUnionOrMarriageStartDate: dep.stableUnionOrMarriageStartDate,
      }),
      ...(builtDocs.length > 0 && { dependentDocuments: builtDocs }),
    });
  }
}
