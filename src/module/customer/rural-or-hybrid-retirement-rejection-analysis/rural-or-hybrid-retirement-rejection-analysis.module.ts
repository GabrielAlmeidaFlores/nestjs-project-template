import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { CreateRuralOrHybridRetirementRejectionUseCase } from './use-case/create-rural-or-hybrid-retirement-rejection.use-case';
import { GetRuralOrHybridRetirementRejectionUseCase } from './use-case/get-rural-or-hybrid-retirement-rejection.use-case';
import { UpdateRuralOrHybridRetirementRejectionUseCase } from './use-case/update-rural-or-hybrid-retirement-rejection.use-case';
import { DeleteRuralOrHybridRetirementRejectionUseCase } from './use-case/delete-rural-or-hybrid-retirement-rejection.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateRuralOrHybridRetirementRejectionUseCase,
    GetRuralOrHybridRetirementRejectionUseCase,
    UpdateRuralOrHybridRetirementRejectionUseCase,
    DeleteRuralOrHybridRetirementRejectionUseCase,
  ],
  exports: [
    CreateRuralOrHybridRetirementRejectionUseCase,
    GetRuralOrHybridRetirementRejectionUseCase,
    UpdateRuralOrHybridRetirementRejectionUseCase,
    DeleteRuralOrHybridRetirementRejectionUseCase,
  ],
})
export class RuralOrHybridRetirementRejectionAnalysisModule {
  protected readonly _type = RuralOrHybridRetirementRejectionAnalysisModule.name;
}
