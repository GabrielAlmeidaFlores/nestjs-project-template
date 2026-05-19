import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/command/general-urban-retirement-denial-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/query/general-urban-retirement-denial-time-accelerator.query.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.entity';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';
import { DeleteGeneralUrbanRetirementDenialTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/delete-general-urban-retirement-denial-time-accelerator.response.dto';
import { GeneralUrbanRetirementDenialTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-time-accelerator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway: GeneralUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway: GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    generalUrbanRetirementDenialTimeAcceleratorId: GeneralUrbanRetirementDenialTimeAcceleratorId,
  ): Promise<DeleteGeneralUrbanRetirementDenialTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingTimeAccelerator =
      await this.generalUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialTimeAcceleratorIdOrFail(
        generalUrbanRetirementDenialTimeAcceleratorId,
        GeneralUrbanRetirementDenialTimeAcceleratorNotFoundError,
      );

    const deletedTimeAccelerator =
      new GeneralUrbanRetirementDenialTimeAcceleratorEntity({
        id: generalUrbanRetirementDenialTimeAcceleratorId,
        type: existingTimeAccelerator.type,
        recognitionInss: existingTimeAccelerator.recognitionInss,
        recognitionJudicial: existingTimeAccelerator.recognitionJudicial,
        viability: existingTimeAccelerator.viability,
        technicalNote: existingTimeAccelerator.technicalNote,
        startDate: existingTimeAccelerator.startDate,
        endDate: existingTimeAccelerator.endDate,
        institution: existingTimeAccelerator.institution,
        affectsQualifyingPeriod:
          existingTimeAccelerator.affectsQualifyingPeriod,
        generalUrbanRetirementDenialId,
        deletedAt: new Date(),
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.generalUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway.updateGeneralUrbanRetirementDenialTimeAccelerator(
        generalUrbanRetirementDenialTimeAcceleratorId,
        deletedTimeAccelerator,
      ),
    );

    await transaction.commit();

    return DeleteGeneralUrbanRetirementDenialTimeAcceleratorResponseDto.build({
      generalUrbanRetirementDenialId,
    });
  }
}
