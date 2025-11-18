import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/legal-pleading-document.query.repository.gateway';
import { GetLegalPleadingDocumentWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document-with-relations.query.result';
import { LegalPleadingDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/command/legal-pleading-document-analysis.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import { CreateLegalPleadingDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-document-analysis.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-document-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';

describe(CreateLegalPleadingDocumentAnalysisUseCase.name, () => {
  let useCase: CreateLegalPleadingDocumentAnalysisUseCase;

  const analysisProcessorGateway = {
    getLegalPleadingQuickDocumentAnalysis: jest.fn(),
  };

  const fileProcessorGateway = {
    getFileBuffer: jest.fn(),
  };

  const organizationMemberQueryRepositoryGateway = {
    findOneByCustomerIdAndAuthIdentityId: jest.fn(),
  };

  const legalPleadingQueryRepositoryGateway = {
    findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail: jest.fn(),
  };

  const baseTransactionRepositoryGateway = {
    execute: jest.fn(),
  };

  const legalPleadingDocumentCommandRepositoryGateway = {
    updateLegalPleadingDocument: jest.fn(),
  };

  const legalPleadingDocumentAnalysisCommandRepositoryGateway = {
    createLegalPleadingDocumentAnalysis: jest.fn(),
  };

  const legalPleadingDocumentQueryRepositoryGateway = {
    findByDocumentTypeAndOrganizationIdAndLegalPleadingId: jest.fn(),
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

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateLegalPleadingDocumentAnalysisUseCase,
        {
          provide: AnalysisProcessorGateway,
          useValue: analysisProcessorGateway,
        },
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: LegalPleadingDocumentCommandRepositoryGateway,
          useValue: legalPleadingDocumentCommandRepositoryGateway,
        },
        {
          provide: LegalPleadingDocumentAnalysisCommandRepositoryGateway,
          useValue: legalPleadingDocumentAnalysisCommandRepositoryGateway,
        },
        {
          provide: LegalPleadingDocumentQueryRepositoryGateway,
          useValue: legalPleadingDocumentQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateLegalPleadingDocumentAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should analyze multiple document types and create transactions correctly', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();
    const transaction = buildTransaction();

    const docPersonal = GetLegalPleadingDocumentWithRelationsQueryResult.build({
      id: new LegalPleadingDocumentId(),
      type: LegalPleadingDocumentTypeEnum.PERSONAL_DOCUMENT,
      document: 'path/to/personal.pdf',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      legalPleadingDocumentAnalysis: null,
    });
    const docCnis1 = GetLegalPleadingDocumentWithRelationsQueryResult.build({
      id: new LegalPleadingDocumentId(),
      type: LegalPleadingDocumentTypeEnum.CNIS,
      document: 'path/to/cnis1.pdf',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      legalPleadingDocumentAnalysis: null,
    });
    const docCnis2 = GetLegalPleadingDocumentWithRelationsQueryResult.build({
      id: new LegalPleadingDocumentId(),
      type: LegalPleadingDocumentTypeEnum.CNIS,
      document: 'path/to/cnis2.pdf',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      legalPleadingDocumentAnalysis: null,
    });

    const queryResult = {
      legalPleadingDocument: [docPersonal, docCnis1, docCnis2],
      analysisToolClient: { createdBy: {}, updatedBy: {} },
      createdBy: {},
      updatedBy: {},
      legalPleadingAddress: null,
      legalPleadingResult: null,
    } as unknown as GetLegalPleadingWithRelationsQueryResult;

    const TOTAL_DOCUMENTS = 3;
    const TOTAL_DOCUMENT_TYPES = 2;
    const TOTAL_TRANSACTIONS = 5;

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      queryResult,
    );
    fileProcessorGateway.getFileBuffer.mockResolvedValue(
      Buffer.from('fake-pdf'),
    );
    analysisProcessorGateway.getLegalPleadingQuickDocumentAnalysis
      .mockResolvedValueOnce('Personal Doc Analysis')
      .mockResolvedValueOnce('CNIS Docs Analysis');

    legalPleadingDocumentQueryRepositoryGateway.findByDocumentTypeAndOrganizationIdAndLegalPleadingId
      .mockResolvedValueOnce([docPersonal])
      .mockResolvedValueOnce([docCnis1, docCnis2]);

    legalPleadingDocumentAnalysisCommandRepositoryGateway.createLegalPleadingDocumentAnalysis.mockReturnValue(
      {} as TransactionType,
    );
    legalPleadingDocumentCommandRepositoryGateway.updateLegalPleadingDocument.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      legalPleadingId,
    );

    expect(result).toBeInstanceOf(
      CreateLegalPleadingDocumentAnalysisResponseDto,
    );
    expect(result.data).toHaveLength(TOTAL_DOCUMENT_TYPES);

    expect(fileProcessorGateway.getFileBuffer).toHaveBeenCalledTimes(
      TOTAL_DOCUMENTS,
    );
    expect(
      analysisProcessorGateway.getLegalPleadingQuickDocumentAnalysis,
    ).toHaveBeenCalledTimes(TOTAL_DOCUMENT_TYPES);
    expect(
      legalPleadingDocumentQueryRepositoryGateway.findByDocumentTypeAndOrganizationIdAndLegalPleadingId,
    ).toHaveBeenCalledTimes(TOTAL_DOCUMENT_TYPES);
    expect(
      legalPleadingDocumentAnalysisCommandRepositoryGateway.createLegalPleadingDocumentAnalysis,
    ).toHaveBeenCalledTimes(TOTAL_DOCUMENT_TYPES);
    expect(
      legalPleadingDocumentCommandRepositoryGateway.updateLegalPleadingDocument,
    ).toHaveBeenCalledTimes(TOTAL_DOCUMENTS);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(TOTAL_TRANSACTIONS);

    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('should throw LegalPleadingNotFoundError when legal pleading is not found', async () => {
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
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(LegalPleadingNotFoundError);

    expect(
      legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail,
    ).toHaveBeenCalledWith(
      legalPleadingId,
      orgSessionData.organizationId,
      sessionData.authIdentityId,
      LegalPleadingNotFoundError,
    );
  });
});
