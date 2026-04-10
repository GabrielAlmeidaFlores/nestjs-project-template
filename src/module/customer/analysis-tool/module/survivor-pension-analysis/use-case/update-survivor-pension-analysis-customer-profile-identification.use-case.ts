import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/command/survivor-pension-analysis-customer-profile-identification.command.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/survivor-pension-analysis-customer-profile-identification.query.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { UpdateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-customer-profile-identification.request.dto';
import { UpdateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-customer-profile-identification.response.dto';
import { SurvivorPensionAnalysisCpiNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-customer-profile-identification-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase {
  protected readonly _type =
    UpdateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway: SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
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
    survivorPensionAnalysisCpiId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
    dto: UpdateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cpiQueryResult =
      await this.survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisCpiId,
        SurvivorPensionAnalysisCpiNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      cpiQueryResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const updatedCpi =
      new SurvivorPensionAnalysisCustomerProfileIdentificationEntity({
        id: survivorPensionAnalysisCpiId,
        survivorPensionAnalysisId: cpiQueryResult.survivorPensionAnalysisId,
        analysisToolClientId:
          dto.analysisToolClientId ?? cpiQueryResult.analysisToolClientId,
        clientJobTitle: dto.clientJobTitle ?? cpiQueryResult.clientJobTitle,
        legalProceedingNumber:
          dto.legalProceedingNumber ?? cpiQueryResult.legalProceedingNumber,
        inssBenefitNumber:
          dto.inssBenefitNumber ?? cpiQueryResult.inssBenefitNumber,
        analysisName: dto.analysisName ?? cpiQueryResult.analysisName,
        analysisPurpose: dto.analysisPurpose ?? cpiQueryResult.analysisPurpose,
      });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway.updateSurvivorPensionAnalysisCustomerProfileIdentification(
        survivorPensionAnalysisCpiId,
        updatedCpi,
      ),
    ]);

    await txn.commit();

    return UpdateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto.build(
      { survivorPensionAnalysisCpiId },
    );
  }
}
