import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { CreateTeacherRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning.request.dto';
import { CreateTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning.response.dto';
import { CreateTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTeacherRetirementPlanningRppsUseCase extends CreateTeacherRetirementPlanningUseCase {
  protected override readonly _type =
    CreateTeacherRetirementPlanningRppsUseCase.name;

  public override async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateTeacherRetirementPlanningRequestDto,
  ): Promise<CreateTeacherRetirementPlanningResponseDto> {
    return super.execute(
      sessionData,
      organizationSessionData,
      dto,
      AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS,
    );
  }
}
