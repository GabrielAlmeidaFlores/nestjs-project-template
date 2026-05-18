import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementRejectionTechnicalDiagnosisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-technical-diagnosis/command/special-retirement-rejection-technical-diagnosis.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionTechnicalDiagnosisEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/special-retirement-rejection-technical-diagnosis.entity';
import { CreateSpecialRetirementRejectionTechnicalDiagnosisRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/create-special-retirement-rejection-technical-diagnosis.request.dto';
import { CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/create-special-retirement-rejection-technical-diagnosis.response.dto';
import { SpecialRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialRetirementRejectionTechnicalDiagnosisUseCase {
  protected readonly _type =
    CreateSpecialRetirementRejectionTechnicalDiagnosisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SpecialRetirementRejectionTechnicalDiagnosisCommandRepositoryGateway,
    )
    private readonly technicalDiagnosisCommandRepositoryGateway: SpecialRetirementRejectionTechnicalDiagnosisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    dto: CreateSpecialRetirementRejectionTechnicalDiagnosisRequestDto,
  ): Promise<CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const record =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementRejectionNotFoundError,
      );

    if (record.specialRetirementRejection === null) {
      throw new SpecialRetirementRejectionNotFoundError();
    }

    const technicalDiagnosis =
      new SpecialRetirementRejectionTechnicalDiagnosisEntity({
        periodStartDate: dto.periodStartDate,
        periodEndDate: dto.periodEndDate,
        recognized: dto.recognized,
        justification: dto.justification,
        company: dto.company,
        cnpj: dto.cnpj,
        role: dto.role,
        supportingDocument: dto.supportingDocument,
        recordedInCnis: dto.recordedInCnis,
        remunerationRecordedInCnis: dto.remunerationRecordedInCnis,
        hazardousAgents: dto.hazardousAgents,
        informationSource: dto.informationSource,
        legalFramework: dto.legalFramework,
        epiEficaz: dto.epiEficaz ?? null,
        observations: dto.observations ?? null,
        specialRetirementRejectionId,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.technicalDiagnosisCommandRepositoryGateway.createSpecialRetirementRejectionTechnicalDiagnosis(
        technicalDiagnosis,
      ),
    ]);

    await transaction.commit();

    return CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto.build({
      specialRetirementRejectionTechnicalDiagnosisId: technicalDiagnosis.id,
    });
  }
}
