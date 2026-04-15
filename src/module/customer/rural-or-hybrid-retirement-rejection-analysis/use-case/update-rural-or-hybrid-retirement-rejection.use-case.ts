import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { UpdateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/response/rural-or-hybrid-retirement-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface UpdateRuralOrHybridRetirementRejectionInputModel {
  analysisName?: string;
  activityType?: RuralOrHybridRetirementRejectionActivityTypeEnum;
  requestedBenefit?: RuralOrHybridRetirementRejectionRequestedBenefitEnum;
  applicationSubmissionDate?: Date;
  dateOfRejection?: Date;
}

@Injectable()
export class UpdateRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = UpdateRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionCommandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    input: UpdateRuralOrHybridRetirementRejectionInputModel,
  ): Promise<UpdateRuralOrHybridRetirementRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const updatedEntity = new RuralOrHybridRetirementRejectionEntity({
      id: ruralOrHybridRetirementRejectionId,
      analysisName: input.analysisName ?? existing.analysisName,
      activityType:
        input.activityType !== undefined
          ? input.activityType
          : existing.activityType,
      requestedBenefit:
        input.requestedBenefit !== undefined
          ? input.requestedBenefit
          : existing.requestedBenefit,
      applicationSubmissionDate:
        input.applicationSubmissionDate !== undefined
          ? input.applicationSubmissionDate
          : existing.applicationSubmissionDate,
      dateOfRejection:
        input.dateOfRejection !== undefined
          ? input.dateOfRejection
          : existing.dateOfRejection,
      ruralOrHybridRetirementRejectionResultId:
        existing.ruralOrHybridRetirementRejectionResult?.id ?? null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralOrHybridRetirementRejectionCommandRepositoryGateway.updateRuralOrHybridRetirementRejection(
        ruralOrHybridRetirementRejectionId,
        updatedEntity,
      ),
    ]);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementRejectionResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }
}
