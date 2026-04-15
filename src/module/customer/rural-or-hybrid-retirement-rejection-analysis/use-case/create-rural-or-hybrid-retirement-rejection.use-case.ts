import { Inject, Injectable } from '@nestjs/common';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { CreateRuralOrHybridRetirementRejectionRequestDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/request/create-rural-or-hybrid-retirement-rejection.request.dto';
import { CreateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/response/rural-or-hybrid-retirement-rejection.response.dto';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/gateway/base-transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/generic/organization-member/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/organization-session-data.model';

@Injectable()
export class CreateRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = CreateRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly queryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly commandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRuralOrHybridRetirementRejectionRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionResponseDto> {
    // 1. Validate organization member
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new Error('Organization member not found');
    }

    // 2. Create rejection entity
    const rejectionEntity = new RuralOrHybridRetirementRejectionEntity({
      id: new RuralOrHybridRetirementRejectionId(),
      organizationId: organizationSessionData.organizationId,
      organizationMemberId: organizationMember.id.toString(),
      analysisToolRecordId: '', // Will be set after analysis tool record is created
      federativeEntity: dto.federativeEntity,
      state: dto.state ?? null,
      municipality: dto.municipality ?? null,
      analysisName: dto.analysisName,
      currentPosition: dto.currentPosition ?? null,
      activityType: dto.activityType ?? null,
      publicServiceStartDate: dto.publicServiceStartDate ?? null,
      careerStartDate: dto.careerStartDate ?? null,
      inssBenefitIds: [],
      legalProceedingIds: [],
      periodIds: [],
      periodMemberIds: [],
      testimonialWitnessIds: [],
      workPeriodIds: [],
      timeAcceleratorIds: [],
      resultId: null,
    });

    // 3. Create transaction
    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.commandRepositoryGateway.createRuralOrHybridRetirementRejection(
        rejectionEntity,
      ),
    ]);

    // 4. Commit transaction
    await transaction.commit();

    // 5. Return response
    return CreateRuralOrHybridRetirementRejectionResponseDto.build({
      id: rejectionEntity.id,
      analysisName: rejectionEntity.analysisName,
    });
  }
}
