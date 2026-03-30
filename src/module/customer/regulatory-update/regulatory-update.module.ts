import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { EmailModule } from '@infra/email/email.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { FetchRegulatoryUpdatesCron } from '@module/customer/regulatory-update/cron/fetch-regulatory-updates.cron';
import { RegulatoryUpdateController } from '@module/customer/regulatory-update/regulatory-update.controller';
import { CreateRegulatoryUpdateMonitoredSourceUseCase } from '@module/customer/regulatory-update/use-case/create-regulatory-update-monitored-source.use-case';
import { DeleteRegulatoryUpdateMonitoredSourceUseCase } from '@module/customer/regulatory-update/use-case/delete-regulatory-update-monitored-source.use-case';
import { FetchAndSaveRegulatoryUpdatesUseCase } from '@module/customer/regulatory-update/use-case/fetch-and-save-regulatory-updates.use-case';
import { GetRegulatoryUpdateEmailPreferenceUseCase } from '@module/customer/regulatory-update/use-case/get-regulatory-update-email-preference.use-case';
import { GetRegulatoryUpdateUseCase } from '@module/customer/regulatory-update/use-case/get-regulatory-update.use-case';
import { GetRegulatoryUpdateStatsUseCase } from '@module/customer/regulatory-update/use-case/get-regulatory-update-stats.use-case';
import { ListCustomerMonitoredSourcesUseCase } from '@module/customer/regulatory-update/use-case/list-customer-monitored-sources.use-case';
import { ListRegulatoryUpdateMonitoredSourcesUseCase } from '@module/customer/regulatory-update/use-case/list-regulatory-update-monitored-sources.use-case';
import { ListRegulatoryUpdatesUseCase } from '@module/customer/regulatory-update/use-case/list-regulatory-updates.use-case';
import { SendRegulatoryUpdateEmailsUseCase } from '@module/customer/regulatory-update/use-case/send-regulatory-update-emails.use-case';
import { UpdateRegulatoryUpdateEmailPreferenceUseCase } from '@module/customer/regulatory-update/use-case/update-regulatory-update-email-preference.use-case';
import { UpdateRegulatoryUpdateMonitoredSourceUseCase } from '@module/customer/regulatory-update/use-case/update-regulatory-update-monitored-source.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    EmailModule,
    GenerativeIaModule,
    OrganizationSessionModule,
    PaymentPlanModule,
  ],
  controllers: [RegulatoryUpdateController],
  providers: [
    FetchRegulatoryUpdatesCron,
    FetchAndSaveRegulatoryUpdatesUseCase,
    GetRegulatoryUpdateUseCase,
    GetRegulatoryUpdateEmailPreferenceUseCase,
    ListRegulatoryUpdatesUseCase,
    SendRegulatoryUpdateEmailsUseCase,
    UpdateRegulatoryUpdateEmailPreferenceUseCase,
    CreateRegulatoryUpdateMonitoredSourceUseCase,
    UpdateRegulatoryUpdateMonitoredSourceUseCase,
    DeleteRegulatoryUpdateMonitoredSourceUseCase,
    ListRegulatoryUpdateMonitoredSourcesUseCase,
    GetRegulatoryUpdateStatsUseCase,
    ListCustomerMonitoredSourcesUseCase,
  ],
})
export class RegulatoryUpdateModule {
  protected readonly _type = RegulatoryUpdateModule.name;
}
