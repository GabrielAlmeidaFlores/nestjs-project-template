import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPermanentDisabilityRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/command/retirement-permanent-disability-rejection.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.entity';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { UpdateRetirementPermanentDisabilityRejectionRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/update-retirement-permanent-disability-rejection.request.dto';
import { UpdateRetirementPermanentDisabilityRejectionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/update-retirement-permanent-disability-rejection.response.dto';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRetirementPermanentDisabilityRejectionUseCase {
  protected readonly _type =
    UpdateRetirementPermanentDisabilityRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionCommandRepositoryGateway: RetirementPermanentDisabilityRejectionCommandRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    dto: UpdateRetirementPermanentDisabilityRejectionRequestDto,
  ): Promise<UpdateRetirementPermanentDisabilityRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
        retirementPermanentDisabilityRejectionId,
        RetirementPermanentDisabilityRejectionNotFoundError,
      );

    const updated = new RetirementPermanentDisabilityRejectionEntity({
      id: retirementPermanentDisabilityRejectionId,
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
      deletedAt: existing.deletedAt,
      analysisName: dto.analysisName ?? existing.analysisName,
      requestEntryDate: dto.requestEntryDate ?? existing.requestEntryDate,
      denialDate: dto.denialDate ?? existing.denialDate,
      category: dto.category ?? existing.category,
      retirementPermanentDisabilityRejectionResultId:
        existing.retirementPermanentDisabilityRejectionResult?.id ?? null,
      retirementPermanentDisabilityRejectionIncapacityId:
        existing.retirementPermanentDisabilityRejectionIncapacity?.id ?? null,
      retirementPermanentDisabilityRejectionInsuredQualityId:
        existing.retirementPermanentDisabilityRejectionInsuredQuality?.id ??
        null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.retirementPermanentDisabilityRejectionCommandRepositoryGateway.updateRetirementPermanentDisabilityRejection(
        retirementPermanentDisabilityRejectionId,
        updated,
      ),
    ]);

    await transaction.commit();

    return UpdateRetirementPermanentDisabilityRejectionResponseDto.build({
      retirementPermanentDisabilityRejectionId,
    });
  }
}
