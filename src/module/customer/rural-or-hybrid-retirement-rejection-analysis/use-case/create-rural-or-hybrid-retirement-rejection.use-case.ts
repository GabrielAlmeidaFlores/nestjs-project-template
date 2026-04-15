import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { CreateRuralOrHybridRetirementRejectionRequestDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/request/create-rural-or-hybrid-retirement-rejection.request.dto';
import { CreateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/response/rural-or-hybrid-retirement-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = CreateRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
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
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejectionEntity = new RuralOrHybridRetirementRejectionEntity({
      id: new RuralOrHybridRetirementRejectionId(),
      analysisName: dto.analysisName ?? null,
      activityType: dto.activityType ?? null,
      requestedBenefit: dto.requestedBenefit ?? null,
      applicationSubmissionDate: dto.applicationSubmissionDate ?? null,
      dateOfRejection: dto.dateOfRejection ?? null,
      ruralOrHybridRetirementRejectionResultId: null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.commandRepositoryGateway.createRuralOrHybridRetirementRejection(
        rejectionEntity,
      ),
    ]);

    await transaction.commit();

    return CreateRuralOrHybridRetirementRejectionResponseDto.build({
      ruralOrHybridRetirementRejectionId: rejectionEntity.id,
      ...(rejectionEntity.analysisName !== null && {
        analysisName: rejectionEntity.analysisName,
      }),
    });
  }
}
