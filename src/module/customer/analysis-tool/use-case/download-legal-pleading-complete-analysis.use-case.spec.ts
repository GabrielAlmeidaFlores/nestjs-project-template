import { StreamableFile } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import { GetLegalPleadingResultQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/query/result/get-legal-pleading-result.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import { LegalPleadingCode } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { LegalPleadingDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/error/legal-pleading-does-not-contain-complete-analysis.error';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-complete-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(DownloadLegalPleadingCompleteAnalysisUseCase.name, () => {
  let useCase: DownloadLegalPleadingCompleteAnalysisUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
    };

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail:
        jest.fn(),
      findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
      countByOrganizationIdAndAuthIdentityId: jest.fn(),
      listByOrganizationIdAndAuthIdentityId: jest.fn(),
      countByLegalPleadingIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
    };

  const exportDocumentGateway: jest.Mocked<ExportDocumentGateway> = {
    convertHtmlToMarkdown: jest.fn(),
    convertMarkdownToHtml: jest.fn(),
    downloadFile: jest.fn(),
    downloadFileAsStreamable: jest.fn(),
  };

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildLegalPleadingResultQueryResult = (
    analysis: string | null,
  ): GetLegalPleadingResultQueryResult =>
    GetLegalPleadingResultQueryResult.build({
      id: new LegalPleadingResultId(),
      legalPleadingCompleteAnalysis: analysis,
      legalPleadingSimplifiedAnalysis: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildLegalPleadingQueryResult = (
    result: GetLegalPleadingResultQueryResult | null,
  ): GetLegalPleadingWithRelationsQueryResult => {
    const responsible =
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        id: new OrganizationMemberId(),
        owner: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        customer: GetCustomerQueryResult.build({
          id: new CustomerId(),
          name: 'Test Customer',
          profilePicture: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      });

    const client = GetAnalysisToolClientWithRelationsQueryResult.build({
      id: new AnalysisToolClientId(),
      name: 'Test Client',
      federalDocument: null,
      email: null,
      inssPassword: null,
      phoneNumber: null,
      birthDate: null,
      gender: null,
      clientType: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      analysisToolClientInssBenefit: [],
      analysisToolClientLegalProceeding: [],
      createdBy: responsible,
      updatedBy: responsible,
    });

    return GetLegalPleadingWithRelationsQueryResult.build({
      id: new LegalPleadingId(),
      code: new LegalPleadingCode(1),
      status: AnalysisStatusEnum.IN_PROGRESS,
      statementOfFacts: null,
      additionalComments: null,
      securitySystem: LegalPleadingSocialSecuritySystemEnum.RGPS,
      benefitType: LegalPleadingBenefitTypeEnum.ACCIDENT_BENEFIT,
      petitionType: LegalPleadingPetitionTypeEnum.INITIAL_COMPLAINT,
      benefitNumber: null,
      applicationSubmissionDate: null,
      benefitTerminationDate: null,
      benefitInitialMonthlyIncome: null,
      benefitCurrentMonthlyIncome: null,
      socialSecurityObjective: null,
      legalPleadingWritOfMandamusObjective: null,
      analysisToolClient: client,
      legalPleadingDocument: [],
      legalPleadingAddress: null,
      legalPleadingResult: result,
      createdBy: responsible,
      updatedBy: responsible,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  };

  const buildStreamableFile = (): StreamableFile =>
    new StreamableFile(Buffer.from('fake-file-data'));

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DownloadLegalPleadingCompleteAnalysisUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: ExportDocumentGateway,
          useValue: exportDocumentGateway,
        },
      ],
    }).compile();

    useCase = module.get(DownloadLegalPleadingCompleteAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('deve baixar a análise completa com sucesso', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const format = ExportDocumentFormatEnum.PDF;
    const member = buildOrganizationMember();
    const analysisText = 'Texto da análise completa.';
    const legalPleadingResult =
      buildLegalPleadingResultQueryResult(analysisText);
    const legalPleading = buildLegalPleadingQueryResult(legalPleadingResult);
    const streamableFile = buildStreamableFile();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      legalPleading,
    );
    exportDocumentGateway.downloadFileAsStreamable.mockResolvedValueOnce(
      streamableFile,
    );

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      legalPleadingId,
      format,
    );

    expect(result).toBe(streamableFile);
    expect(exportDocumentGateway.downloadFileAsStreamable).toHaveBeenCalledWith(
      analysisText,
      format,
      'analise_completa_peca_processual',
    );
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        legalPleadingId,
        ExportDocumentFormatEnum.DOCX,
      ),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar LegalPleadingNotFoundError se a petição não for encontrada', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockRejectedValueOnce(
      new LegalPleadingNotFoundError(),
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        legalPleadingId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(LegalPleadingNotFoundError);
  });

  it('deve lançar LegalPleadingDoesNotContainCompleteAnalysisError se o resultado da petição for nulo', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();
    const legalPleading = buildLegalPleadingQueryResult(null);

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      legalPleading,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        legalPleadingId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(LegalPleadingDoesNotContainCompleteAnalysisError);
  });

  it('deve lançar LegalPleadingDoesNotContainCompleteAnalysisError se a análise completa for nula', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();
    const legalPleadingResult = buildLegalPleadingResultQueryResult(null);
    const legalPleading = buildLegalPleadingQueryResult(legalPleadingResult);

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      legalPleading,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        legalPleadingId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(LegalPleadingDoesNotContainCompleteAnalysisError);
  });
});
