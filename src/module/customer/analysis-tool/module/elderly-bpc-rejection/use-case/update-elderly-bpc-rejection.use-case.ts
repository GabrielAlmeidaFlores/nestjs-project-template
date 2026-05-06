import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ElderlyBpcRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/command/elderly-bpc-rejection.command.repository.gateway';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { UpdateElderlyBpcRejectionRequestDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/request/update-elderly-bpc-rejection.request.dto';
import { UpdateElderlyBpcRejectionResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/update-elderly-bpc-rejection.response.dto';
import { ElderlyBpcRejectionNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateElderlyBpcRejectionUseCase {
  protected readonly _type = UpdateElderlyBpcRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionQueryRepositoryGateway)
    private readonly elderlyBpcRejectionQueryRepositoryGateway: ElderlyBpcRejectionQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionCommandRepositoryGateway)
    private readonly elderlyBpcRejectionCommandRepositoryGateway: ElderlyBpcRejectionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    dto: UpdateElderlyBpcRejectionRequestDto,
  ): Promise<UpdateElderlyBpcRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations(
        elderlyBpcRejectionId,
        ElderlyBpcRejectionNotFoundError,
      );

    const updated = new ElderlyBpcRejectionEntity({
      id: elderlyBpcRejectionId,
      analysisName: dto.analysisName ?? existing.analysisName,
      category: dto.category ?? existing.category,
      maritalStatus: dto.maritalStatus ?? existing.maritalStatus,
      applicantLivesAlone:
        dto.applicantLivesAlone ?? existing.applicantLivesAlone,
      elderlyBpcRejectionResultId:
        existing.elderlyBpcRejectionResult?.id ?? null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.elderlyBpcRejectionCommandRepositoryGateway.updateElderlyBpcRejection(
        elderlyBpcRejectionId,
        updated,
      ),
    ]);

    await transaction.commit();

    return UpdateElderlyBpcRejectionResponseDto.build({
      elderlyBpcRejectionId,
    });
  }
}
