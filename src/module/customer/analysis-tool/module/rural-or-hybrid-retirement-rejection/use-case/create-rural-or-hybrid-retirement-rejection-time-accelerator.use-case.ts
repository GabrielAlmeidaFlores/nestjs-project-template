import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-time-accelerator/command/rural-or-hybrid-retirement-rejection-time-accelerator.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/rural-or-hybrid-retirement-rejection-time-accelerator.entity';
import { RuralOrHybridRetirementRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/value-object/rural-or-hybrid-retirement-rejection-time-accelerator-id.value-object';
import {
  CreateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
  RuralOrHybridRetirementRejectionTimeAcceleratorItemRequestDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-time-accelerator.request.dto';
import { CreateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-time-accelerator.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway: RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    dto: CreateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
      ruralOrHybridRetirementRejectionId,
      RuralOrHybridRetirementRejectionNotFoundError,
    );

    const transactions: TransactionType[] = dto.timeAccelerators.map(
      (timeAcceleratorDto) =>
        this.ruralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway.createRuralOrHybridRetirementRejectionTimeAccelerator(
          this.buildTimeAcceleratorEntity(
            new RuralOrHybridRetirementRejectionTimeAcceleratorId(),
            ruralOrHybridRetirementRejectionId,
            timeAcceleratorDto,
          ),
        ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto.build(
      {
        ruralOrHybridRetirementRejectionId,
      },
    );
  }

  private buildTimeAcceleratorEntity(
    ruralOrHybridRetirementRejectionTimeAcceleratorId: RuralOrHybridRetirementRejectionTimeAcceleratorId,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    timeAcceleratorDto: RuralOrHybridRetirementRejectionTimeAcceleratorItemRequestDto,
  ): RuralOrHybridRetirementRejectionTimeAcceleratorEntity {
    return new RuralOrHybridRetirementRejectionTimeAcceleratorEntity({
      id: ruralOrHybridRetirementRejectionTimeAcceleratorId,
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
      ruralOrHybridRetirementRejectionId,
    });
  }
}