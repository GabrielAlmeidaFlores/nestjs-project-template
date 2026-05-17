import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { InterviewFormController } from '@module/customer/analysis-tool/module/interview-form/interview-form.controller';
import { GetInterviewFormByAnalysisToolClientIdUseCase } from '@module/customer/analysis-tool/module/interview-form/use-case/get-interview-form-by-analysis-tool-client-id.use-case';
import { UpsertInterviewFormUseCase } from '@module/customer/analysis-tool/module/interview-form/use-case/upsert-interview-form.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [AuthModule, DatabaseModule, OrganizationSessionModule],
  controllers: [InterviewFormController],
  providers: [
    UpsertInterviewFormUseCase,
    GetInterviewFormByAnalysisToolClientIdUseCase,
  ],
})
export class InterviewFormModule {
  protected readonly _type = InterviewFormModule.name;
}
