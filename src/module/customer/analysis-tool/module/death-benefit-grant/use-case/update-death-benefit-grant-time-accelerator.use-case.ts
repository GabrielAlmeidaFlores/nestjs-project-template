import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/command/death-benefit-grant-time-accelerator.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.entity';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';
import { UpdateDeathBenefitGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant-time-accelerator.request.dto';
import { UpdateDeathBenefitGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant-time-accelerator.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDeathBenefitGrantTimeAcceleratorUseCase {
  protected readonly _type = UpdateDeathBenefitGrantTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway)
    private readonly deathBenefitGrantTimeAcceleratorCommandRepositoryGateway: DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    dto: UpdateDeathBenefitGrantTimeAcceleratorRequestDto,
  ): Promise<UpdateDeathBenefitGrantTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingGrant =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const existingTimeAccelerators =
      existingGrant.deathBenefitGrantTimeAccelerator ?? [];
    const transactions: TransactionType[] = [];

    for (const existingTimeAccelerator of existingTimeAccelerators) {
      transactions.push(
        this.deathBenefitGrantTimeAcceleratorCommandRepositoryGateway.updateDeathBenefitGrantTimeAccelerator(
          existingTimeAccelerator.id,
          new DeathBenefitGrantTimeAcceleratorEntity({
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
            deathBenefitGrantId,
            deletedAt: new Date(),
          }),
        ),
      );
    }

    for (const timeAcceleratorDto of dto.timeAccelerators) {
      const deathBenefitGrantTimeAcceleratorId =
        new DeathBenefitGrantTimeAcceleratorId();

      transactions.push(
        this.deathBenefitGrantTimeAcceleratorCommandRepositoryGateway.createDeathBenefitGrantTimeAccelerator(
          new DeathBenefitGrantTimeAcceleratorEntity({
            id: deathBenefitGrantTimeAcceleratorId,
            type: timeAcceleratorDto.type,
            recognitionInss: timeAcceleratorDto.recognitionInss,
            recognitionJudicial: timeAcceleratorDto.recognitionJudicial,
            viability: timeAcceleratorDto.viability,
            technicalNote: timeAcceleratorDto.technicalNote ?? null,
            startDate: timeAcceleratorDto.startDate ?? null,
            endDate: timeAcceleratorDto.endDate ?? null,
            institution: timeAcceleratorDto.institution ?? null,
            affectsQualifyingPeriod: timeAcceleratorDto.affectsQualifyingPeriod,
            deathBenefitGrantId,
          }),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitGrantTimeAcceleratorResponseDto.build({
      deathBenefitGrantId,
    });
  }
}
