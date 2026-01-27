import { Inject, Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { ExtractClientFromCnisAnalysisRequestDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/request/extract-client-from-cnis-analysis.request.dto';
import { ExtractClientFromCnisAnalysisResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/extract-client-from-cnis-analysis.response.dto';

@Injectable()
export class ExtractClientFromCnisAnalysisUseCase {
  protected readonly _type = ExtractClientFromCnisAnalysisUseCase.name;

  public constructor(
    @Inject(CnisProcessorGateway)
    private readonly cnisProcessorGateway: CnisProcessorGateway,
  ) {}

  public async execute(
    dto: ExtractClientFromCnisAnalysisRequestDto,
  ): Promise<ExtractClientFromCnisAnalysisResponseDto> {
    const cnisData = await this.cnisProcessorGateway.parseCnisDocument(
      dto.cnisDocument.buffer,
    );

    const federalDocument =
      cnisData.affiliateIdentification?.cpf !== undefined
        ? new FederalDocument(cnisData.affiliateIdentification.cpf)
        : undefined;

    return ExtractClientFromCnisAnalysisResponseDto.build({
      name: cnisData.affiliateIdentification?.nome ?? null,
      federalDocument: federalDocument ?? null,
      birthDate: cnisData.affiliateIdentification?.dataDeNascimento ?? null,
    });
  }
}
