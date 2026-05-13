import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/command/retirement-permanent-disability-revision-concession-letter-breakdown.command.repository.gateway';
import { GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/result/get-retirement-permanent-disability-revision-concession-letter-breakdown.query.result';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/retirement-permanent-disability-revision-concession-letter-breakdown.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/retirement-permanent-disability-revision-concession-letter-breakdown.entity';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';
import { ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/resolve-retirement-permanent-disability-revision-concession-letter-breakdown-pendency.request.dto';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-concession-letter-breakdown-not-found.error';

@Injectable()
export class ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase {
  protected readonly _type =
    ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway,
    )
    private readonly concessionLetterBreakdownCommandRepositoryGateway: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryRepositoryGateway,
    )
    private readonly concessionLetterBreakdownQueryRepositoryGateway: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryRepositoryGateway,
  ) {}

  public async execute(
    retirementPermanentDisabilityRevisionConcessionLetterBreakdownId: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
    dto: ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyRequestDto,
  ): Promise<void> {
    const breakdown =
      await this.concessionLetterBreakdownQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionConcessionLetterBreakdownIdOrFail(
        retirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
        RetirementPermanentDisabilityRevisionConcessionLetterBreakdownNotFoundError,
      );

    await this.updateBreakdownAction(
      retirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
      breakdown,
      dto.action,
    );
  }

  private async updateBreakdownAction(
    id: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
    breakdown: GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult,
    action: string,
  ): Promise<void> {
    const updatedBreakdown =
      new RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity({
        id,
        competence: breakdown.competence,
        amount: breakdown.amount,
        reasonNotConsidered: breakdown.reasonNotConsidered,
        action,
        retirementPermanentDisabilityRevisionId:
          breakdown.retirementPermanentDisabilityRevisionId,
        createdAt: breakdown.createdAt,
        updatedAt: breakdown.updatedAt,
        deletedAt: breakdown.deletedAt ?? null,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.concessionLetterBreakdownCommandRepositoryGateway.updateRetirementPermanentDisabilityRevisionConcessionLetterBreakdown(
        id,
        updatedBreakdown,
      ),
    );

    await transaction.commit();
  }
}
