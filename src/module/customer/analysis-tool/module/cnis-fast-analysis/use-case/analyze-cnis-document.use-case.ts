import { Inject, Injectable } from '@nestjs/common';

import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalyzeCnisDocumentRequestDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/request/analyze-cnis-document.request.dto';
import { AnalyzeCnisDocumentResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/analyze-cnis-document.response.dto';

@Injectable()
export class AnalyzeCnisDocumentUseCase {
  protected readonly _type = AnalyzeCnisDocumentUseCase.name;

  public constructor(
    @Inject(CnisProcessorGateway)
    private readonly cnisProcessorGateway: CnisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
  ) {}

  public async execute(
    dto: AnalyzeCnisDocumentRequestDto,
  ): Promise<AnalyzeCnisDocumentResponseDto> {
    const cnisData = await this.cnisProcessorGateway.parseCnisDocument(
      dto.cnisDocument.buffer,
    );

    const tempOrganizationMemberId = new OrganizationMemberId();

    const analysisToolClient = new AnalysisToolClientEntity({
      id: new AnalysisToolClientId(),
      name: dto.json.name ?? null,
      federalDocument: dto.json.federalDocument ?? null,
      email: dto.json.email ?? null,
      inssPassword: null,
      phoneNumber: dto.json.phoneNumber ?? null,
      birthDate: dto.json.birthDate ?? null,
      gender: dto.json.gender ?? null,
      clientType: dto.json.clientType ?? null,
      createdBy: tempOrganizationMemberId,
      updatedBy: tempOrganizationMemberId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    return AnalyzeCnisDocumentResponseDto.build({
      cnisAnalysis: cnisAnalysis,
      cnisData: cnisData,
    });
  }
}
