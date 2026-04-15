import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/command/survivor-pension-analysis-customer-profile-identification.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.entity';
import { CreateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-customer-profile-identification.request.dto';
import { CreateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-customer-profile-identification.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase {
  protected readonly _type =
    CreateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway: SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    dto: CreateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const cpiEntity =
      new SurvivorPensionAnalysisCustomerProfileIdentificationEntity({
        survivorPensionAnalysisId,
        ...(dto.analysisToolClientId !== undefined && {
          analysisToolClientId: dto.analysisToolClientId,
        }),
        ...(dto.clientJobTitle !== undefined && {
          clientJobTitle: dto.clientJobTitle,
        }),
        ...(dto.legalProceedingNumber !== undefined && {
          legalProceedingNumber: dto.legalProceedingNumber,
        }),
        ...(dto.inssBenefitNumber !== undefined && {
          inssBenefitNumber: dto.inssBenefitNumber,
        }),
        ...(dto.analysisName !== undefined && {
          analysisName: dto.analysisName,
        }),
        ...(dto.analysisPurpose !== undefined && {
          analysisPurpose: dto.analysisPurpose,
        }),
      });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway.createSurvivorPensionAnalysisCustomerProfileIdentification(
        cpiEntity,
      ),
    ]);

    await txn.commit();

    return CreateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto.build(
      { survivorPensionAnalysisCustomerProfileIdentificationId: cpiEntity.id },
    );
  }
}
