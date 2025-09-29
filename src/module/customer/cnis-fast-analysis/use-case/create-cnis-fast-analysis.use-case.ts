import { Injectable } from '@nestjs/common';

import { CreateCnisFastAnalysisRequestDto } from '@module/customer/cnis-fast-analysis/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateCnisFastAnalysisUseCase {
  protected readonly _type = CreateCnisFastAnalysisUseCase.name;

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateCnisFastAnalysisRequestDto,
  ): Promise<CreateCnisFastAnalysisResponseDto> {
    await new Promise((res) => {
      res({ sessionData, organizationSessionData, dto });
    });
    return {} as CreateCnisFastAnalysisResponseDto;
  }
}
