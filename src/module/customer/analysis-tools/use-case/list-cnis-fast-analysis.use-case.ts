import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import {
  GetCnisFastAnalysisClientResponseDto,
  GetCnisFastAnalysisResponseDto,
  GetCnisFastAnalysisResponsibleResponseDto,
  GetCnisFastAnalysisResultResponseDto,
} from '@module/customer/analysis-tools/dto/response/get-cnis-fast-analysis.response.dto';
import { ListCnisFastAnalysisResponseDto } from '@module/customer/analysis-tools/dto/response/list-cnis-fast-analysis.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tools/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tools/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListCnisFastAnalysisUseCase {
  protected readonly _type = ListCnisFastAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListDataRequestDto,
  ): Promise<ListCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisFastAnalysisQueryResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId(
        organizationSessionData.organizationId,
        new ListDataInputModel({ ...dto }),
      );

    const mapResourcePromise = cnisFastAnalysisQueryResult.resource.map(
      async (item) => {
        const response = GetCnisFastAnalysisResponseDto.build({
          ...item,
          cnisFastAnalysisClient: GetCnisFastAnalysisClientResponseDto.build({
            ...item.cnisFastAnalysisClient,
          }),
          cnisFastAnalysisResult:
            item.cnisFastAnalysisResult !== null
              ? GetCnisFastAnalysisResultResponseDto.build({
                  ...item.cnisFastAnalysisResult,
                })
              : null,
          createdBy: GetCnisFastAnalysisResponsibleResponseDto.build({
            ...item.createdBy.customer,
          }),
          updatedBy: GetCnisFastAnalysisResponsibleResponseDto.build({
            ...item.updatedBy.customer,
          }),
        });

        if (item.cnisDocument !== null) {
          const cnisDocument = await this.fileProcessorGateway.getFileSignedUrl(
            item.cnisDocument,
          );

          response.cnisDocument = cnisDocument.toString();
        }

        if (item.createdBy.customer.profilePicture !== null) {
          const profilePicture =
            await this.fileProcessorGateway.getFileSignedUrl(
              item.createdBy.customer.profilePicture,
            );

          response.createdBy.profilePicture = profilePicture.toString();
        }

        if (item.updatedBy.customer.profilePicture !== null) {
          const profilePicture =
            await this.fileProcessorGateway.getFileSignedUrl(
              item.updatedBy.customer.profilePicture,
            );

          response.updatedBy.profilePicture = profilePicture.toString();
        }

        return response;
      },
    );

    const resource = await Promise.all(mapResourcePromise);

    return ListCnisFastAnalysisResponseDto.build({
      ...cnisFastAnalysisQueryResult,
      resource,
    });
  }
}
