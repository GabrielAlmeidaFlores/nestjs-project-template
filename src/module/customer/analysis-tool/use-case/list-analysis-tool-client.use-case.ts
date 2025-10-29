import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import {
  GetAnalysisToolClientResponseDto,
  GetAnalysisToolClientResponsibleResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { ListAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client.response.dto';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListAnalysisToolClientUseCase {
  protected readonly _type = ListAnalysisToolClientUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientResponseDto> {
    const listData =
      await this.analysisToolClientQueryRepositoryGateway.listByOrganizationId(
        organizationSessionData.organizationId,
        new ListDataInputModel(dto),
      );

    const resource = await Promise.all(
      listData.resource.map(async (listItem) => {
        const analysisCount =
          await this.analysisToolRecordQueryRepositoryGateway.countAnalysisByAnalysisToolClientId(
            organizationSessionData.organizationId,
            listItem.id,
          );

        const legalPleadingCount =
          await this.legalPleadingQueryRepositoryGateway.countByLegalPleadingIdAndOrganizationId(
            organizationSessionData.organizationId,
            listItem.id,
          );

        const mappedData = GetAnalysisToolClientResponseDto.build({
          ...listItem,
          analysisCount: analysisCount + legalPleadingCount,
          createdBy: GetAnalysisToolClientResponsibleResponseDto.build({
            ...listItem.createdBy.customer,
          }),
          updatedBy: GetAnalysisToolClientResponsibleResponseDto.build({
            ...listItem.updatedBy.customer,
          }),
          legalProceedingNumber: listItem.analysisToolClientLegalProceeding.map(
            (legalProceeding) => legalProceeding.legalProceedingNumber,
          ),
          inssBenefitNumber: listItem.analysisToolClientInssBenefit.map(
            (inssBenefit) => inssBenefit.inssBenefitNumber,
          ),
        });

        if (mappedData.createdBy.profilePicture !== undefined) {
          const profilePicture =
            await this.fileProcessorGateway.getFileSignedUrl(
              mappedData.createdBy.profilePicture,
            );

          mappedData.createdBy.profilePicture = profilePicture.toString();
        }

        if (mappedData.updatedBy.profilePicture !== undefined) {
          const profilePicture =
            await this.fileProcessorGateway.getFileSignedUrl(
              mappedData.updatedBy.profilePicture,
            );

          mappedData.updatedBy.profilePicture = profilePicture.toString();
        }

        return mappedData;
      }),
    );

    return ListAnalysisToolClientResponseDto.build({
      ...listData,
      resource,
    });
  }
}
