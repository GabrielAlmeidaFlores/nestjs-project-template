import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-testimonial-witness/command/rural-or-hybrid-retirement-analysis-testimonial-witness.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';
import { DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/delete-rural-or-hybrid-retirement-analysis-testimonial-witness.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway: RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    ruralOrHybridRetirementAnalysisTestimonialWitnessId: RuralOrHybridRetirementAnalysisTestimonialWitnessId,
  ): Promise<DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisTestimonialWitness(
        ruralOrHybridRetirementAnalysisTestimonialWitnessId,
      ),
    );

    await transaction.commit();

    return DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto.build(
      {
        ruralOrHybridRetirementAnalysisId,
      },
    );
  }
}
