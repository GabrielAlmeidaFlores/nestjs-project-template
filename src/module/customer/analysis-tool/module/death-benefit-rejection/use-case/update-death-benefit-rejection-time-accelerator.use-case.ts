import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/command/death-benefit-rejection-time-accelerator.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.entity';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';
import { UpdateDeathBenefitRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-time-accelerator.request.dto';
import { UpdateDeathBenefitRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-time-accelerator.response.dto';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDeathBenefitRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    UpdateDeathBenefitRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway)
    private readonly deathBenefitRejectionTimeAcceleratorCommandRepositoryGateway: DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    dto: UpdateDeathBenefitRejectionTimeAcceleratorRequestDto,
  ): Promise<UpdateDeathBenefitRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingGrant =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const existingTimeAccelerators =
      existingGrant.deathBenefitRejectionTimeAccelerator ?? [];
    const transactions: TransactionType[] = [];

    for (const existingTimeAccelerator of existingTimeAccelerators) {
      transactions.push(
        this.deathBenefitRejectionTimeAcceleratorCommandRepositoryGateway.updateDeathBenefitRejectionTimeAccelerator(
          existingTimeAccelerator.id,
          new DeathBenefitRejectionTimeAcceleratorEntity({
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
            deathBenefitRejectionId,
            deletedAt: new Date(),
          }),
        ),
      );
    }

    for (const timeAcceleratorDto of dto.timeAccelerators) {
      const deathBenefitRejectionTimeAcceleratorId =
        new DeathBenefitRejectionTimeAcceleratorId();

      transactions.push(
        this.deathBenefitRejectionTimeAcceleratorCommandRepositoryGateway.createDeathBenefitRejectionTimeAccelerator(
          new DeathBenefitRejectionTimeAcceleratorEntity({
            id: deathBenefitRejectionTimeAcceleratorId,
            type: timeAcceleratorDto.type,
            recognitionInss: timeAcceleratorDto.recognitionInss,
            recognitionJudicial: timeAcceleratorDto.recognitionJudicial,
            viability: timeAcceleratorDto.viability,
            technicalNote: timeAcceleratorDto.technicalNote ?? null,
            startDate: timeAcceleratorDto.startDate ?? null,
            endDate: timeAcceleratorDto.endDate ?? null,
            institution: timeAcceleratorDto.institution ?? null,
            affectsQualifyingPeriod: timeAcceleratorDto.affectsQualifyingPeriod,
            deathBenefitRejectionId,
          }),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitRejectionTimeAcceleratorResponseDto.build({
      deathBenefitRejectionId,
    });
  }
}
