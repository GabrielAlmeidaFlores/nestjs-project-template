import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { MaternityPayGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/command/maternity-pay-grant.command.repository.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-inss-benefit/command/maternity-pay-grant-inss-benefit.command.repository.gateway';
import { MaternityPayGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-legal-proceeding/command/maternity-pay-grant-legal-proceeding.command.repository.gateway';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity';
import { MaternityPayGrantInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/value-object/maternity-pay-grant-inss-benefit-id.value-object';
import { MaternityPayGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity';
import { MaternityPayGrantLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/value-object/maternity-pay-grant-legal-proceeding-id.value-object';
import { UpdateMaternityPayGrantRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/update-maternity-pay-grant.request.dto';
import { UpdateMaternityPayGrantResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/update-maternity-pay-grant.response.dto';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateMaternityPayGrantUseCase {
  protected readonly _type = UpdateMaternityPayGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(MaternityPayGrantCommandRepositoryGateway)
    private readonly maternityPayGrantCommandRepositoryGateway: MaternityPayGrantCommandRepositoryGateway,
    @Inject(MaternityPayGrantInssBenefitCommandRepositoryGateway)
    private readonly maternityPayGrantInssBenefitCommandRepositoryGateway: MaternityPayGrantInssBenefitCommandRepositoryGateway,
    @Inject(MaternityPayGrantLegalProceedingCommandRepositoryGateway)
    private readonly maternityPayGrantLegalProceedingCommandRepositoryGateway: MaternityPayGrantLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayGrantId: MaternityPayGrantId,
    dto: UpdateMaternityPayGrantRequestDto,
  ): Promise<UpdateMaternityPayGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingMaternityPayGrant =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const updatedMaternityPayGrant = new MaternityPayGrantEntity({
      id: maternityPayGrantId,
      analysisName: dto.analysisName ?? existingMaternityPayGrant.analysisName,
      category: dto.category ?? existingMaternityPayGrant.category,
      triggeringEvent:
        dto.triggeringEvent ?? existingMaternityPayGrant.triggeringEvent,
      triggeringEventDate:
        dto.triggeringEventDate ??
        existingMaternityPayGrant.triggeringEventDate,
      isCurrentlyUnemployed:
        dto.isCurrentlyUnemployed ??
        existingMaternityPayGrant.isCurrentlyUnemployed,
      isUnemployedAtTriggeringEventDate:
        dto.isUnemployedAtTriggeringEventDate ??
        existingMaternityPayGrant.isUnemployedAtTriggeringEventDate,
      isRuralInsured:
        dto.isRuralInsured ?? existingMaternityPayGrant.isRuralInsured,
      ruralPeriodStartDate:
        dto.ruralPeriodStartDate ??
        existingMaternityPayGrant.ruralPeriodStartDate,
      ruralPeriodEndDate:
        dto.ruralPeriodEndDate ?? existingMaternityPayGrant.ruralPeriodEndDate,
      ruralPeriodDocumentDescription:
        dto.ruralPeriodDocumentDescription ??
        existingMaternityPayGrant.ruralPeriodDocumentDescription,
      maternityPayGrantResultId:
        existingMaternityPayGrant.maternityPayGrantResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.maternityPayGrantCommandRepositoryGateway.updateMaternityPayGrant(
        maternityPayGrantId,
        updatedMaternityPayGrant,
      ),
    ];

    if (dto.inssBenefitNumber !== undefined) {
      transactions.push(
        this.maternityPayGrantInssBenefitCommandRepositoryGateway.deleteAllByMaternityPayGrantId(
          maternityPayGrantId,
        ),
      );

      dto.inssBenefitNumber.forEach((value) => {
        transactions.push(
          this.maternityPayGrantInssBenefitCommandRepositoryGateway.createMaternityPayGrantInssBenefit(
            new MaternityPayGrantInssBenefitEntity({
              id: new MaternityPayGrantInssBenefitId(),
              inssBenefitNumber: value,
              maternityPayGrantId,
            }),
          ),
        );
      });
    }

    if (dto.legalProceedingNumber !== undefined) {
      transactions.push(
        this.maternityPayGrantLegalProceedingCommandRepositoryGateway.deleteAllByMaternityPayGrantId(
          maternityPayGrantId,
        ),
      );

      dto.legalProceedingNumber.forEach((value) => {
        transactions.push(
          this.maternityPayGrantLegalProceedingCommandRepositoryGateway.createMaternityPayGrantLegalProceeding(
            new MaternityPayGrantLegalProceedingEntity({
              id: new MaternityPayGrantLegalProceedingId(),
              legalProceedingNumber: value,
              maternityPayGrantId,
            }),
          ),
        );
      });
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateMaternityPayGrantResponseDto.build({ maternityPayGrantId });
  }
}
