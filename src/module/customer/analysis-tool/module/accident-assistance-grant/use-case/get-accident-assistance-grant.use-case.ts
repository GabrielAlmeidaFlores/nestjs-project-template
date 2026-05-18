import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AccidentAssistanceGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/accident-assistance-grant.query.repository.gateway';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';
import {
  GetAccidentAssistanceGrantClientResponseDto,
  GetAccidentAssistanceGrantDocumentResponseDto,
  GetAccidentAssistanceGrantResponseDto,
  GetAccidentAssistanceGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/get-accident-assistance-grant.response.dto';
import { AccidentAssistanceGrantNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-grant/error/accident-assistance-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAccidentAssistanceGrantUseCase {
  protected readonly _type = GetAccidentAssistanceGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AccidentAssistanceGrantQueryRepositoryGateway)
    private readonly accidentAssistanceGrantQueryRepositoryGateway: AccidentAssistanceGrantQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
  ): Promise<GetAccidentAssistanceGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const result =
      await this.accidentAssistanceGrantQueryRepositoryGateway.findOneByAccidentAssistanceGrantIdOrFailWithRelations(
        accidentAssistanceGrantId,
        AccidentAssistanceGrantNotFoundError,
      );

    const clientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        result.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const clientDto = GetAccidentAssistanceGrantClientResponseDto.build({
      id: clientQueryResult.id,
      ...(clientQueryResult.name !== null && {
        name: clientQueryResult.name,
      }),
      ...(clientQueryResult.federalDocument !== null && {
        federalDocument: clientQueryResult.federalDocument,
      }),
      ...(clientQueryResult.email !== null && {
        email: clientQueryResult.email,
      }),
      ...(clientQueryResult.phoneNumber !== null && {
        phoneNumber: clientQueryResult.phoneNumber,
      }),
      ...(clientQueryResult.birthDate !== null && {
        birthDate: clientQueryResult.birthDate,
      }),
      ...(clientQueryResult.gender !== null && {
        gender: clientQueryResult.gender,
      }),
      ...(clientQueryResult.clientType !== null && {
        clientType: clientQueryResult.clientType,
      }),
    });

    const resultDto =
      result.accidentAssistanceGrantResult !== null
        ? GetAccidentAssistanceGrantResultResponseDto.build({
            ...(result.accidentAssistanceGrantResult.firstAnalysis !== null && {
              firstAnalysis: result.accidentAssistanceGrantResult.firstAnalysis,
            }),
            ...(result.accidentAssistanceGrantResult.simplifiedAnalysis !==
              null && {
              simplifiedAnalysis:
                result.accidentAssistanceGrantResult.simplifiedAnalysis,
            }),
            ...(result.accidentAssistanceGrantResult.completeAnalysis !==
              null && {
              completeAnalysis:
                result.accidentAssistanceGrantResult.completeAnalysis,
            }),
            createdAt: result.accidentAssistanceGrantResult.createdAt,
            updatedAt: result.accidentAssistanceGrantResult.updatedAt,
          })
        : undefined;

    const documents = this.buildDocuments(
      result.accidentAssistanceGrantDocument ?? [],
    );

    return GetAccidentAssistanceGrantResponseDto.build({
      accidentAssistanceGrantId: result.accidentAssistanceGrantId,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.category !== null && { category: result.category }),
      ...(result.accidentDate !== null && {
        accidentDate: result.accidentDate,
      }),
      ...(result.hadPreviousTemporaryDisabilityAssistance !== null && {
        hadPreviousTemporaryDisabilityAssistance:
          result.hadPreviousTemporaryDisabilityAssistance,
      }),
      ...(result.sequelDescription !== null && {
        sequelDescription: result.sequelDescription,
      }),
      ...(result.associatedCidId !== null && {
        associatedCidId: result.associatedCidId,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      client: clientDto,
      ...(resultDto !== undefined && { result: resultDto }),
      documents,
    });
  }

  private buildDocuments(
    docs: Awaited<
      ReturnType<
        typeof this.accidentAssistanceGrantQueryRepositoryGateway.findOneByAccidentAssistanceGrantIdOrFailWithRelations
      >
    >['accidentAssistanceGrantDocument'],
  ): GetAccidentAssistanceGrantDocumentResponseDto[] {
    if (!docs || docs.length === 0) {
      return [];
    }

    return docs
      .filter((d) => d.type !== AccidentAssistanceGrantDocumentTypeEnum.CNIS)
      .map((doc) => {
        return GetAccidentAssistanceGrantDocumentResponseDto.build({
          accidentAssistanceGrantDocumentId: doc.id,
          ...(doc.type !== null && { type: doc.type }),
        });
      });
  }
}
