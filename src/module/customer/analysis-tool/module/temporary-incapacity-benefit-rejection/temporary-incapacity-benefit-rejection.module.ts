import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { TemporaryIncapacityBenefitRejectionController } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.controller';
import { CreateTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-complete-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-disability-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-first-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-inss-decision-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-insured-status.use-case';
import { CreateTemporaryIncapacityBenefitRejectionResultUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-result.use-case';
import { CreateTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-simplified-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-work-periods.use-case';
import { CreateTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection.use-case';
import { GetTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/get-temporary-incapacity-benefit-rejection.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-disability-analysis.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-insured-status.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-work-periods.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection.use-case';
import { UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/upload-temporary-incapacity-benefit-rejection-documents.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [TemporaryIncapacityBenefitRejectionController],
  providers: [
    CreateTemporaryIncapacityBenefitRejectionUseCase,
    GetTemporaryIncapacityBenefitRejectionUseCase,
    UpdateTemporaryIncapacityBenefitRejectionUseCase,
    UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase,
    CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase,
    CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase,
    UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase,
    CreateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase,
    UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase,
    CreateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase,
    UpdateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase,
    CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase,
    CreateTemporaryIncapacityBenefitRejectionResultUseCase,
    CreateTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase,
    CreateTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase,
  ],
})
export class TemporaryIncapacityBenefitRejectionModule {
  protected readonly _type = TemporaryIncapacityBenefitRejectionModule.name;
}
