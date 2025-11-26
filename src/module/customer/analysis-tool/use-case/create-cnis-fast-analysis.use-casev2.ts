import { Inject, Injectable } from '@nestjs/common';

import { CnisAnalysisService } from '@lib/cnis-analysis/cnis-analysis.service';
import { CnisOutputCompleteModel } from '@lib/cnis-analysis/model/output/cnis-output-complete.model';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/create-cnis-fast-analysis.request.dto';

@Injectable()
export class CreateCnisFastAnalysisUseCaseV2 {
  protected readonly _type = CreateCnisFastAnalysisUseCaseV2.name;

  public constructor(
    @Inject(CnisAnalysisService)
    private readonly cnisAnalysisService: CnisAnalysisService,
  ) {}

  public async execute(
    dto: CreateCnisFastAnalysisRequestDto,
  ): Promise<CnisOutputCompleteModel> {
    if (dto.cnisDocument?.buffer !== undefined) {
      return await this.cnisAnalysisService.parseCnisDocumentComplete(
        dto.cnisDocument.buffer,
      );
    }
    throw new Error('CNIS document buffer is undefined.');
  }
}
