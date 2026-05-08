import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementGrantTechnicalDiagnosisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-technical-diagnosis/command/special-retirement-grant-technical-diagnosis.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantTechnicalDiagnosisEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/special-retirement-grant-technical-diagnosis.entity';
import { CreateSpecialRetirementGrantTechnicalDiagnosisRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-technical-diagnosis.request.dto';
import { CreateSpecialRetirementGrantTechnicalDiagnosisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-technical-diagnosis.response.dto';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialRetirementGrantTechnicalDiagnosisUseCase {
  protected readonly _type =
    CreateSpecialRetirementGrantTechnicalDiagnosisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantTechnicalDiagnosisCommandRepositoryGateway)
    private readonly technicalDiagnosisCommandRepositoryGateway: SpecialRetirementGrantTechnicalDiagnosisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
    dto: CreateSpecialRetirementGrantTechnicalDiagnosisRequestDto,
  ): Promise<CreateSpecialRetirementGrantTechnicalDiagnosisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const record =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    if (record.specialRetirementGrant === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const grant = new SpecialRetirementGrantEntity({
      ...record.specialRetirementGrant,
      specialRetirementGrantResult: null,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
      createdBy: record.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const technicalDiagnosis =
      new SpecialRetirementGrantTechnicalDiagnosisEntity({
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
        specialRetirementGrant: grant,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.technicalDiagnosisCommandRepositoryGateway.createSpecialRetirementGrantTechnicalDiagnosis(
        technicalDiagnosis,
      ),
    ]);

    await transaction.commit();

    return CreateSpecialRetirementGrantTechnicalDiagnosisResponseDto.build({
      specialRetirementGrantTechnicalDiagnosisId: technicalDiagnosis.id,
    });
  }
}
