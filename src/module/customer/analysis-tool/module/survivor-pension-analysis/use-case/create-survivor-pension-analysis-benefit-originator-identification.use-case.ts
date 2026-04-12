import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/command/survivor-pension-analysis-benefit-originator-identification.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.entity';
import { CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-benefit-originator-identification.request.dto';
import { CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-benefit-originator-identification.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase {
  protected readonly _type =
    CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway: SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    dto: CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto> {
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

    const boiEntity =
      new SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity({
        survivorPensionAnalysisId,
        ...(dto.analysisToolClientId !== undefined && {
          analysisToolClientId: dto.analysisToolClientId,
        }),
        ...(dto.deathDate !== undefined && {
          deathDate: dto.deathDate,
        }),
        ...(dto.federativeEntity !== undefined && {
          federativeEntity: dto.federativeEntity,
        }),
        ...(dto.stateCode !== undefined && {
          stateCode: dto.stateCode,
        }),
        ...(dto.beneficiaryWasRetired !== undefined && {
          beneficiaryWasRetired: dto.beneficiaryWasRetired,
        }),
      });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway.createSurvivorPensionAnalysisBenefitOriginatorIdentification(
        boiEntity,
      ),
    ]);

    await txn.commit();

    return CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto.build(
      { survivorPensionAnalysisBenefitOriginatorIdentificationId: boiEntity.id },
    );
  }
}
