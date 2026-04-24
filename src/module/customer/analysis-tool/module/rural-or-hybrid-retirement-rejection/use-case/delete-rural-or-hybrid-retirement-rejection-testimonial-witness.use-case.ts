import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-testimonial-witness/command/rural-or-hybrid-retirement-rejection-testimonial-witness.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';
import { DeleteRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/delete-rural-or-hybrid-retirement-rejection-testimonial-witness.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionTestimonialWitnessUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementRejectionTestimonialWitnessUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway: RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    ruralOrHybridRetirementRejectionTestimonialWitnessId: RuralOrHybridRetirementRejectionTestimonialWitnessId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionTestimonialWitness(
        ruralOrHybridRetirementRejectionTestimonialWitnessId,
      ),
    );

    await transaction.commit();

    return DeleteRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto.build(
      {
        ruralOrHybridRetirementRejectionId,
      },
    );
  }
}
