import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-time-accelerator/command/rural-or-hybrid-retirement-analysis-time-accelerator.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/rural-or-hybrid-retirement-analysis-time-accelerator.entity';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';
import {
  CreateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
  RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-time-accelerator.request.dto';
import { CreateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-time-accelerator.response.dto';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway: RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    dto: CreateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
  ): Promise<CreateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
      ruralOrHybridRetirementAnalysisId,
      RuralOrHybridRetirementAnalysisNotFoundError,
    );

    const transactions: TransactionType[] = dto.timeAccelerators.map(
      (timeAcceleratorDto) =>
        this.ruralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisTimeAccelerator(
          this.buildTimeAcceleratorEntity(
            new RuralOrHybridRetirementAnalysisTimeAcceleratorId(),
            ruralOrHybridRetirementAnalysisId,
            timeAcceleratorDto,
          ),
        ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto.build(
      {
        ruralOrHybridRetirementAnalysisId,
      },
    );
  }

  private buildTimeAcceleratorEntity(
    ruralOrHybridRetirementAnalysisTimeAcceleratorId: RuralOrHybridRetirementAnalysisTimeAcceleratorId,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    timeAcceleratorDto: RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto,
  ): RuralOrHybridRetirementAnalysisTimeAcceleratorEntity {
    return new RuralOrHybridRetirementAnalysisTimeAcceleratorEntity({
      id: ruralOrHybridRetirementAnalysisTimeAcceleratorId,
      timeType: timeAcceleratorDto.timeType ?? null,
      institution: timeAcceleratorDto.institution ?? null,
      recognitionInss: timeAcceleratorDto.recognitionInss ?? null,
      affectsQualifyingPeriod:
        timeAcceleratorDto.affectsQualifyingPeriod ?? null,
      technicalNote: timeAcceleratorDto.technicalNote ?? null,
      startDate: timeAcceleratorDto.startDate ?? null,
      endDate: timeAcceleratorDto.endDate ?? null,
      gracePeriod: timeAcceleratorDto.gracePeriod ?? null,
      viability: timeAcceleratorDto.viability ?? null,
      ruralOrHybridRetirementAnalysisId,
    });
  }
}
