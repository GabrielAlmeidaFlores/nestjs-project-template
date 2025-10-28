import { StreamableFile } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
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
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
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
import { LegalPleadingDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/error/legal-pleading-does-not-contain-simplified-analysis.error';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-simplified-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(DownloadLegalPleadingSimplifiedAnalysisUseCase.name, () => {
  let useCase: DownloadLegalPleadingSimplifiedAnalysisUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerAndOrganizationId: jest.fn(),
      findOneByCustomerAndOrganizationIdWithRelations: jest.fn(),
    };

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      findOneByLegalPleadingAndOrganizationIdOrFail: jest.fn(),
      findByAnalysisToolClientAndOrganizationId: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn(),
      countByLegalPleadingIdAndOrganizationId: jest.fn(),
    };

  const legalPleadingResultCommandRepositoryGateway: jest.Mocked<LegalPleadingResultCommandRepositoryGateway> =
    {
      updateLegalPleadingResult: jest.fn(),
      createLegalPleadingResult: jest.fn(),
    };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const exportDocumentGateway: jest.Mocked<ExportDocumentGateway> = {
    convertHtmlToMarkdown: jest.fn(),
    convertMarkdownToHtml: jest.fn(),
    downloadFile: jest.fn(),
    downloadFileAsStreamable: jest.fn(),
  };

  const analysisProcessorGateway: jest.Mocked<AnalysisProcessorGateway> = {
    getCnisSimplifiedAnalysis: jest.fn(),
    validateCnisDocument: jest.fn(),
    parseCnisDocument: jest.fn(),
    getCnisCompleteAnalysis: jest.fn(),
    getLegalPleadingCompleteAnalysis: jest.fn(),
    getLegalPleadingSimplifiedAnalysis: jest.fn(),
    getLegalPleadingQuickDocumentAnalysis: jest.fn(),
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

  const buildLegalPleadingResultQueryResult = (options: {
    complete?: string | null;
    simplified?: string | null;
  }): GetLegalPleadingResultQueryResult =>
    GetLegalPleadingResultQueryResult.build({
      id: new LegalPleadingResultId(),
      legalPleadingCompleteAnalysis: options.complete ?? null,
      legalPleadingSimplifiedAnalysis: options.simplified ?? null,
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

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DownloadLegalPleadingSimplifiedAnalysisUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingResultCommandRepositoryGateway,
          useValue: legalPleadingResultCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: ExportDocumentGateway,
          useValue: exportDocumentGateway,
        },
        {
          provide: AnalysisProcessorGateway,
          useValue: analysisProcessorGateway,
        },
      ],
    }).compile();

    useCase = module.get(DownloadLegalPleadingSimplifiedAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('deve baixar a análise simplificada quando ela já existe', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const format = ExportDocumentFormatEnum.PDF;
    const member = buildOrganizationMember();
    const analysisText = 'Análise simplificada existente.';
    const legalPleadingResult = buildLegalPleadingResultQueryResult({
      complete: 'Análise completa.',
      simplified: analysisText,
    });
    const legalPleading = buildLegalPleadingQueryResult(legalPleadingResult);
    const streamableFile = buildStreamableFile();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockResolvedValueOnce(
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
    expect(
      analysisProcessorGateway.getLegalPleadingSimplifiedAnalysis,
    ).not.toHaveBeenCalled();
    expect(
      legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
    expect(exportDocumentGateway.downloadFileAsStreamable).toHaveBeenCalledWith(
      analysisText,
      format,
      'analise_simplificada_peca_processual',
    );
  });

  it('deve gerar, salvar e baixar a análise simplificada se ela não existir', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const format = ExportDocumentFormatEnum.DOCX;
    const member = buildOrganizationMember();
    const completeAnalysis = 'Análise completa para processar.';
    const legalPleadingResult = buildLegalPleadingResultQueryResult({
      complete: completeAnalysis,
      simplified: null,
    });
    const legalPleading = buildLegalPleadingQueryResult(legalPleadingResult);
    const newSimplifiedAnalysis = 'Análise simplificada gerada agora.';
    const streamableFile = buildStreamableFile();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockResolvedValueOnce(
      legalPleading,
    );
    analysisProcessorGateway.getLegalPleadingSimplifiedAnalysis.mockResolvedValueOnce(
      newSimplifiedAnalysis,
    );
    legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);
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
    expect(
      analysisProcessorGateway.getLegalPleadingSimplifiedAnalysis,
    ).toHaveBeenCalledTimes(1);
    expect(
      legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult,
    ).toHaveBeenCalledTimes(1);
    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
    expect(exportDocumentGateway.downloadFileAsStreamable).toHaveBeenCalledWith(
      newSimplifiedAnalysis,
      format,
      'analise_simplificada_peca_processual',
    );
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        legalPleadingId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar LegalPleadingNotFoundError se a petição não for encontrada', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockRejectedValueOnce(
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

  it('deve lançar LegalPleadingDoesNotContainCompleteAnalysisError se o resultado for nulo', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();
    const legalPleading = buildLegalPleadingQueryResult(null);

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockResolvedValueOnce(
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
    const legalPleadingResult = buildLegalPleadingResultQueryResult({
      complete: null,
      simplified: null,
    });
    const legalPleading = buildLegalPleadingQueryResult(legalPleadingResult);

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockResolvedValueOnce(
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

  it('deve lançar LegalPleadingDoesNotContainSimplifiedAnalysisError se a geração da análise falhar (retornar nulo)', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();
    const completeAnalysis = 'Análise completa para processar.';
    const legalPleadingResult = buildLegalPleadingResultQueryResult({
      complete: completeAnalysis,
      simplified: null,
    });
    const legalPleading = buildLegalPleadingQueryResult(legalPleadingResult);
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockResolvedValueOnce(
      legalPleading,
    );
    analysisProcessorGateway.getLegalPleadingSimplifiedAnalysis.mockResolvedValueOnce(
      null,
    );
    legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        legalPleadingId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(
      LegalPleadingDoesNotContainSimplifiedAnalysisError,
    );
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });
});
