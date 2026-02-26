import { Inject, Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GetGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-period.response.dto';
import {
  GetGeneralUrbanRetirementGrantLegalProceedingResponseDto,
  GetGeneralUrbanRetirementGrantResponse,
  GetGeneralUrbanRetirementGrantInssBenefitResponseDto,
  GetGeneralUrbanRetirementGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant.response.dto';
import { GeneralUrbanRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-not-found.error';

@Injectable()
export class GetGeneralUrbanRetirementGrantUseCase {
  protected readonly _type = GetGeneralUrbanRetirementGrantUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantQueryRepositoryGateway: GeneralUrbanRetirementGrantQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
  ): Promise<GetGeneralUrbanRetirementGrantResponse> {
    const result =
      await this.generalUrbanRetirementGrantQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantIdOrFailWithRelations(
        generalUrbanRetirementGrantId,
        GeneralUrbanRetirementGrantNotFoundError,
      );

    return {
      id: result.id,
      cnisDocument: result.cnisDocument ?? undefined,
      generalUrbanRetirementGrantBenefit:
        result.generalUrbanRetirementGrantBenefit?.map((b) =>
          GetGeneralUrbanRetirementGrantInssBenefitResponseDto.build({
            id: b.id,
            inssBenefitNumber: b.inssBenefitNumber,
            createdAt: b.createdAt,
            updatedAt: b.updatedAt,
          }),
        ) ?? undefined,
      generalUrbanRetirementGrantResult:
        result.generalUrbanRetirementGrantResult != null
          ? GetGeneralUrbanRetirementGrantResultResponseDto.build({
              clientName:
                result.generalUrbanRetirementGrantResult.clientName ?? null,
              clientFederalDocument:
                result.generalUrbanRetirementGrantResult
                  .clientFederalDocument ?? null,
              clientBirthDate:
                result.generalUrbanRetirementGrantResult.clientBirthDate ??
                null,
              clientLastAffiliationDate:
                result.generalUrbanRetirementGrantResult
                  .clientLastAffiliationDate ?? null,
              compareCnisCtps:
                result.generalUrbanRetirementGrantResult.compareCnisCtps ??
                null,
              compareCnisCtpsRaw:
                result.generalUrbanRetirementGrantResult.compareCnisCtpsRaw ??
                null,
            })
          : undefined,
      generalUrbanRetirementGrantLegalProceeding:
        result.generalUrbanRetirementGrantLegalProceeding?.map((p) =>
          GetGeneralUrbanRetirementGrantLegalProceedingResponseDto.build({
            id: p.id,
            legalProceedingNumber: p.legalProceedingNumber,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          }),
        ) ?? undefined,
      generalUrbanRetirementGrantPeriod:
        result.generalUrbanRetirementGrantPeriod?.map((p) =>
          GetGeneralUrbanRetirementGrantPeriodResponseDto.build({
            id: p.id,
            periodName: p.periodName ?? null,
            periodStart: p.periodStart ?? null,
            periodEnd: p.periodEnd ?? null,
            category: p.category ?? null,
            isPendency: p.isPendency ?? null,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum ?? null,
            contributionAverage: p.contributionAverage ?? null,
            typeOfContribution: p.typeOfContribution ?? null,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            reasonPendency: p.reasonPendency?.toString() ?? null,
          }),
        ) ?? undefined,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt ?? undefined,
    } as unknown as GetGeneralUrbanRetirementGrantResponse;
  }
}
