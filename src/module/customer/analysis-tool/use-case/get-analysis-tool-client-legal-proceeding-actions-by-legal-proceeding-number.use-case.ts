import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding-by-legal-proceeding-number.query.param.gateway';
import { GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding.-by-legal-proceeding-number.request.dto';
import {
  LegalProceedingItemDestinatarioResponseDto,
  LegalProceedingItemAdvogadoResponseDto,
  LegalProceedingItemAdvogadoDetailResponseDto,
  GetLegalProceedingItemActionResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding-client-detail-action.response.dto';
import { ListLegalProceedingItemActionResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-client-detail-action.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

@Injectable()
export class GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase {
  protected readonly _type =
    GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto,
  ): Promise<ListLegalProceedingItemActionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientLegalProceedingList =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listByLegalProceedingNumber(
        organizationSessionData.organizationId,
        new ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway(
          dto,
        ),
      );

    const resource: GetLegalProceedingItemActionResponseDto[] =
      analysisToolClientLegalProceedingList.resource.flatMap((item) => {
        const latestDetailEntity = item.legalProceedingDetail
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )[0];

        if (!latestDetailEntity) {
          return [];
        }

        const parsed = JSON.parse(latestDetailEntity.detail) as {
          ok: boolean;
          data: {
            items: PublicPropertyType<GetLegalProceedingItemActionResponseDto>[];
          };
        };

        return parsed.data.items.map((rawItem) =>
          GetLegalProceedingItemActionResponseDto.build({
            ...rawItem,

            id: String(rawItem.id),
            numeroComunicacao: String(rawItem.numeroComunicacao),
            ativo: String(rawItem.ativo),

            destinatarios: rawItem.destinatarios.map((d) =>
              LegalProceedingItemDestinatarioResponseDto.build({
                ...d,
                comunicacao_id: String(d.comunicacao_id),
              }),
            ),

            destinatarioadvogados: rawItem.destinatarioadvogados.map((a) =>
              LegalProceedingItemAdvogadoResponseDto.build({
                ...a,
                id: String(a.id),
                comunicacao_id: String(a.comunicacao_id),
                advogado_id: String(a.advogado_id),
                advogado: LegalProceedingItemAdvogadoDetailResponseDto.build({
                  ...a.advogado,
                  id: String(a.advogado.id),
                }),
              }),
            ),
          }),
        );
      });

    return ListLegalProceedingItemActionResponseDto.build({
      ...analysisToolClientLegalProceedingList,
      resource,
    });
  }
}
