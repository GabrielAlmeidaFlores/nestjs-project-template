import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/command/general-urban-retirement-denial-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.entity';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';
import { UpdateGeneralUrbanRetirementDenialTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/update-general-urban-retirement-denial-time-accelerator.request.dto';
import { UpdateGeneralUrbanRetirementDenialTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/update-general-urban-retirement-denial-time-accelerator.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateGeneralUrbanRetirementDenialTimeAcceleratorUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementDenialTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway: GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    dto: UpdateGeneralUrbanRetirementDenialTimeAcceleratorRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementDenialTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingDenial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const existingTimeAccelerators =
      existingDenial.generalUrbanRetirementDenialTimeAccelerator ?? [];
    const transactions: TransactionType[] = [];

    for (const existingTimeAccelerator of existingTimeAccelerators) {
      transactions.push(
        this.generalUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway.updateGeneralUrbanRetirementDenialTimeAccelerator(
          existingTimeAccelerator.id,
          new GeneralUrbanRetirementDenialTimeAcceleratorEntity({
            id: existingTimeAccelerator.id,
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
          }),
        ),
      );
    }

    for (const timeAcceleratorDto of dto.timeAccelerators) {
      const generalUrbanRetirementDenialTimeAcceleratorId =
        new GeneralUrbanRetirementDenialTimeAcceleratorId();

      transactions.push(
        this.generalUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway.createGeneralUrbanRetirementDenialTimeAccelerator(
          new GeneralUrbanRetirementDenialTimeAcceleratorEntity({
            id: generalUrbanRetirementDenialTimeAcceleratorId,
            type: timeAcceleratorDto.type,
            recognitionInss: timeAcceleratorDto.recognitionInss,
            recognitionJudicial: timeAcceleratorDto.recognitionJudicial,
            viability: timeAcceleratorDto.viability,
            technicalNote: timeAcceleratorDto.technicalNote ?? null,
            startDate: timeAcceleratorDto.startDate ?? null,
            endDate: timeAcceleratorDto.endDate ?? null,
            institution: timeAcceleratorDto.institution ?? null,
            affectsQualifyingPeriod: timeAcceleratorDto.affectsQualifyingPeriod,
            generalUrbanRetirementDenialId,
          }),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateGeneralUrbanRetirementDenialTimeAcceleratorResponseDto.build({
      generalUrbanRetirementDenialId,
    });
  }
}
