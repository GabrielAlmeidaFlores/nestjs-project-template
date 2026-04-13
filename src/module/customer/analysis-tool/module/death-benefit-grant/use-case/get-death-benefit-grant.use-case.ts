import { Inject, Injectable } from '@nestjs/common';

import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import {
  GetDeathBenefitGrantResponseDto,
  GetDeathBenefitGrantCnisDocumentResponseDto,
  GetDeathBenefitGrantInssBenefitResponseDto,
  GetDeathBenefitGrantLegalProceedingResponseDto,
  GetDeathBenefitGrantResultResponseDto,
  GetDeathBenefitGrantLegalRepresentativeResponseDto,
  GetDeathBenefitGrantInstitorResponseDto,
  GetDeathBenefitGrantDependentResponseDto,
  GetDeathBenefitGrantDependentDocumentResponseDto,
  GetDeathBenefitGrantPeriodResponseDto,
  GetDeathBenefitGrantPeriodEarningsHistoryResponseDto,
} from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/get-death-benefit-grant.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';

@Injectable()
export class GetDeathBenefitGrantUseCase {
  protected readonly _type = GetDeathBenefitGrantUseCase.name;

  public constructor(
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): Promise<GetDeathBenefitGrantResponseDto> {
    const result =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const cnisDocumentEntity = result.deathBenefitGrantDocument?.[0] ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.document)
        : null;

    return GetDeathBenefitGrantResponseDto.build({
      id: result.id,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.deathBenefitGrantResult !== null && {
        deathBenefitGrantResult: GetDeathBenefitGrantResultResponseDto.build({
          ...(result.deathBenefitGrantResult.deathBenefitGrantFirstAnalysis !==
            null && {
            deathBenefitGrantFirstAnalysis:
              result.deathBenefitGrantResult.deathBenefitGrantFirstAnalysis,
          }),
          ...(result.deathBenefitGrantResult
            .deathBenefitGrantCompleteAnalysis !== null && {
            deathBenefitGrantCompleteAnalysis:
              result.deathBenefitGrantResult.deathBenefitGrantCompleteAnalysis,
          }),
          ...(result.deathBenefitGrantResult
            .deathBenefitGrantSimplifiedAnalysis !== null && {
            deathBenefitGrantSimplifiedAnalysis:
              result.deathBenefitGrantResult
                .deathBenefitGrantSimplifiedAnalysis,
          }),
          ...(result.deathBenefitGrantResult
            .deathBenefitGrantCompleteAnalysisDownload !== null && {
            deathBenefitGrantCompleteAnalysisDownload:
              result.deathBenefitGrantResult
                .deathBenefitGrantCompleteAnalysisDownload,
          }),
        }),
      }),
      ...(result.deathBenefitGrantInssBenefit !== null && {
        deathBenefitGrantInssBenefit: result.deathBenefitGrantInssBenefit.map(
          (b) =>
            GetDeathBenefitGrantInssBenefitResponseDto.build({
              inssBenefit: b.inssBenefit,
            }),
        ),
      }),
      ...(result.deathBenefitGrantLegalProceeding !== null && {
        deathBenefitGrantLegalProceeding:
          result.deathBenefitGrantLegalProceeding.map((p) =>
            GetDeathBenefitGrantLegalProceedingResponseDto.build({
              legalProceedingNumber: p.legalProceedingNumber,
            }),
          ),
      }),
      ...(result.deathBenefitGrantLegalRepresentative !== null && {
        deathBenefitGrantLegalRepresentative:
          GetDeathBenefitGrantLegalRepresentativeResponseDto.build({
            ...(result.deathBenefitGrantLegalRepresentative.name !== null && {
              name: result.deathBenefitGrantLegalRepresentative.name,
            }),
            ...(result.deathBenefitGrantLegalRepresentative.cpf !== null && {
              cpf: result.deathBenefitGrantLegalRepresentative.cpf.toString(),
            }),
            ...(result.deathBenefitGrantLegalRepresentative.birthDate !==
              null && {
              birthDate: result.deathBenefitGrantLegalRepresentative.birthDate,
            }),
            ...(result.deathBenefitGrantLegalRepresentative
              .legalRepresentativeRelationship !== null && {
              legalRepresentativeRelationship:
                result.deathBenefitGrantLegalRepresentative
                  .legalRepresentativeRelationship,
            }),
            ...(result.deathBenefitGrantLegalRepresentative
              .isMinorUnderGuardianship !== null && {
              isMinorUnderGuardianship:
                result.deathBenefitGrantLegalRepresentative
                  .isMinorUnderGuardianship,
            }),
          }),
      }),
      ...(result.deathBenefitGrantBenefitInstitutor !== null && {
        deathBenefitGrantBenefitInstitutor:
          GetDeathBenefitGrantInstitorResponseDto.build({
            ...(result.deathBenefitGrantBenefitInstitutor.name !== null && {
              name: result.deathBenefitGrantBenefitInstitutor.name,
            }),
            ...(result.deathBenefitGrantBenefitInstitutor.cpf !== null && {
              cpf: result.deathBenefitGrantBenefitInstitutor.cpf.toString(),
            }),
            ...(result.deathBenefitGrantBenefitInstitutor.birthDate !==
              null && {
              birthDate: result.deathBenefitGrantBenefitInstitutor.birthDate,
            }),
            ...(result.deathBenefitGrantBenefitInstitutor.gender !== null && {
              gender: result.deathBenefitGrantBenefitInstitutor.gender,
            }),
            ...(result.deathBenefitGrantBenefitInstitutor.deathDate !==
              null && {
              deathDate: result.deathBenefitGrantBenefitInstitutor.deathDate,
            }),
            ...(result.deathBenefitGrantBenefitInstitutor.wasRetired !==
              null && {
              wasRetired: result.deathBenefitGrantBenefitInstitutor.wasRetired,
            }),
            ...(result.deathBenefitGrantBenefitInstitutor
              .retirementBenefitNumber !== null && {
              retirementBenefitNumber:
                result.deathBenefitGrantBenefitInstitutor
                  .retirementBenefitNumber,
            }),
          }),
      }),
      ...(result.deathBenefitGrantDependent !== null && {
        deathBenefitGrantDependent: await Promise.all(
          result.deathBenefitGrantDependent.map((dep) =>
            this.buildDependentResponse(dep.id.toString(), result),
          ),
        ),
      }),
      ...(result.deathBenefitGrantPeriod !== null && {
        deathBenefitGrantPeriod: result.deathBenefitGrantPeriod.map((p) => {
          const periodEarningsHistory = (
            result.deathBenefitGrantPeriodEarningsHistory ?? []
          ).filter(
            (eh) => eh.deathBenefitGrantPeriodId.toString() === p.id.toString(),
          );

          return GetDeathBenefitGrantPeriodResponseDto.build({
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
            ...(periodEarningsHistory.length > 0 && {
              earningsHistory: periodEarningsHistory.map((eh) =>
                GetDeathBenefitGrantPeriodEarningsHistoryResponseDto.build({
                  ...(eh.competence !== null && { competence: eh.competence }),
                  ...(eh.remuneration !== null && {
                    remuneration: eh.remuneration,
                  }),
                  ...(eh.indicators !== null && { indicators: eh.indicators }),
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
                }),
              ),
            }),
          });
        }),
      }),
    });
  }

  private async buildCnisDocumentResponse(
    document: string,
  ): Promise<GetDeathBenefitGrantCnisDocumentResponseDto> {
    const [documentUrl, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileSignedUrl(document),
      this.fileProcessorGateway.getOriginalFileName(document),
    ]);

    return GetDeathBenefitGrantCnisDocumentResponseDto.build({
      document: documentUrl.toString(),
      originalFileName,
    });
  }

  private async buildDependentResponse(
    dependentIdString: string,
    result: Awaited<
      ReturnType<
        DeathBenefitGrantQueryRepositoryGateway['findOneByDeathBenefitGrantIdOrFailWithRelations']
      >
    >,
  ): Promise<GetDeathBenefitGrantDependentResponseDto> {
    const dep = (result.deathBenefitGrantDependent ?? []).find(
      (d) => d.id.toString() === dependentIdString,
    );

    if (!dep) {
      throw new Error('Dependent not found');
    }

    const dependentDocs = (
      result.deathBenefitGrantDependentDocument ?? []
    ).filter(
      (d) => d.deathBenefitGrantDependentId.toString() === dependentIdString,
    );

    const builtDocs =
      dependentDocs.length > 0
        ? await Promise.all(
            dependentDocs.map(async (doc) => {
              const [documentUrl, originalFileName] = await Promise.all([
                this.fileProcessorGateway.getFileSignedUrl(doc.document),
                this.fileProcessorGateway.getOriginalFileName(doc.document),
              ]);

              return GetDeathBenefitGrantDependentDocumentResponseDto.build({
                document: documentUrl.toString(),
                originalFileName,
              });
            }),
          )
        : [];

    return GetDeathBenefitGrantDependentResponseDto.build({
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
