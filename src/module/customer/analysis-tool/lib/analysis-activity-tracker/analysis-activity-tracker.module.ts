import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityTrackerService } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: AnalysisActivityTrackerGateway,
      useClass: AnalysisActivityTrackerService,
    },
  ],
  exports: [AnalysisActivityTrackerGateway],
})
export class AnalysisActivityTrackerModule {
  protected readonly _type = AnalysisActivityTrackerModule.name;
}
