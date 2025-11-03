import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { GetLegalPleadingDocumentWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document-with-relations.query.result';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CreateLegalPleadingResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-result.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-result.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import type { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import type { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';

describe(CreateLegalPleadingResultUseCase.name, () => {
  let useCase: CreateLegalPleadingResultUseCase;

  const analysisProcessorGateway: jest.Mocked<AnalysisProcessorGateway> = {
    validateCnisDocument: jest.fn(),
    parseCnisDocument: jest.fn(),
    getLegalPleadingCompleteAnalysis: jest.fn(),
    getCnisCompleteAnalysis: jest.fn(),
    getCnisSimplifiedAnalysis: jest.fn(),
    getLegalPleadingSimplifiedAnalysis: jest.fn(),
    getLegalPleadingQuickDocumentAnalysis: jest.fn(),
  };

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getFileBuffer: jest.fn(),
    uploadFile: jest.fn(),
    getOriginalFileName: jest.fn(),
    getFileSignedUrl: jest.fn(),
  };

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
      countByOrganizationId: jest.fn(),
      listByOrganizationAndAuthIdentityId: jest.fn(),
    };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const legalPleadingCommandRepositoryGateway: jest.Mocked<LegalPleadingCommandRepositoryGateway> =
    {
      updateLegalPleading: jest.fn(),
      createLegalPleading: jest.fn(),
    };

  const legalPleadingResultCommandRepositoryGateway: jest.Mocked<LegalPleadingResultCommandRepositoryGateway> =
    {
      createLegalPleadingResult: jest.fn(),
      updateLegalPleadingResult: jest.fn(),
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

  const buildLegalPleadingQueryResult =
    (): GetLegalPleadingWithRelationsQueryResult => {
      const docCnis = GetLegalPleadingDocumentWithRelationsQueryResult.build({
        id: new LegalPleadingDocumentId(),
        type: LegalPleadingDocumentTypeEnum.CNIS,
        document: 'path/to/cnis.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        legalPleadingDocumentAnalysis: null,
      });
      const docPersonal =
        GetLegalPleadingDocumentWithRelationsQueryResult.build({
          id: new LegalPleadingDocumentId(),
          type: LegalPleadingDocumentTypeEnum.PERSONAL_DOCUMENT,
          document: 'path/to/personal.pdf',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          legalPleadingDocumentAnalysis: null,
        });

      return {
        id: new LegalPleadingId(),
        legalPleadingDocument: [docCnis, docPersonal],
        analysisToolClient: { createdBy: {}, updatedBy: {} },
        createdBy: {},
        updatedBy: {},
      } as unknown as GetLegalPleadingWithRelationsQueryResult;
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateLegalPleadingResultUseCase,
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
          provide: LegalPleadingCommandRepositoryGateway,
          useValue: legalPleadingCommandRepositoryGateway,
        },
        {
          provide: LegalPleadingResultCommandRepositoryGateway,
          useValue: legalPleadingResultCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateLegalPleadingResultUseCase);
    jest.clearAllMocks();
  });

  it('deve criar um resultado de petição e processar um documento CNIS válido', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();
    const queryResult = buildLegalPleadingQueryResult();
    const transaction = buildTransaction();
    const finalAnalysis = 'Final legal pleading analysis.';
    const parsedCnisData = CnisOutputModel.build({
      socialSecurityRelations: [],
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockResolvedValueOnce(
      queryResult,
    );
    fileProcessorGateway.getFileBuffer.mockResolvedValue(
      Buffer.from('fake-pdf'),
    );
    analysisProcessorGateway.validateCnisDocument.mockResolvedValueOnce(true);
    analysisProcessorGateway.parseCnisDocument.mockResolvedValueOnce(
      parsedCnisData,
    );
    analysisProcessorGateway.getLegalPleadingCompleteAnalysis.mockResolvedValueOnce(
      finalAnalysis,
    );
    legalPleadingResultCommandRepositoryGateway.createLegalPleadingResult.mockReturnValue(
      {} as TransactionType,
    );
    legalPleadingCommandRepositoryGateway.updateLegalPleading.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      legalPleadingId,
    );

    expect(result).toBeInstanceOf(CreateLegalPleadingResultResponseDto);
    expect(result.legalPleadingCompleteAnalysis).toBe(finalAnalysis);

    expect(fileProcessorGateway.getFileBuffer).toHaveBeenCalledTimes(2);
    expect(analysisProcessorGateway.validateCnisDocument).toHaveBeenCalledTimes(
      1,
    );
    expect(analysisProcessorGateway.parseCnisDocument).toHaveBeenCalledTimes(1);
    expect(
      analysisProcessorGateway.getLegalPleadingCompleteAnalysis,
    ).toHaveBeenCalledTimes(1);

    const [[capturedResult]] = legalPleadingResultCommandRepositoryGateway
      .createLegalPleadingResult.mock.calls as [[LegalPleadingResultEntity]];
    expect(capturedResult.legalPleadingCompleteAnalysis).toBe(finalAnalysis);

    const [[, capturedPleading]] = legalPleadingCommandRepositoryGateway
      .updateLegalPleading.mock.calls as [
      [LegalPleadingId, LegalPleadingEntity],
    ];
    expect(capturedPleading.status).toBe(AnalysisStatusEnum.COMPLETED);
    expect(capturedPleading.updatedBy).toBe(member.id);

    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve criar uma análise mesmo que o documento CNIS seja inválido', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const member = buildOrganizationMember();
    const queryResult = buildLegalPleadingQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail.mockResolvedValueOnce(
      queryResult,
    );
    fileProcessorGateway.getFileBuffer.mockResolvedValue(
      Buffer.from('fake-pdf'),
    );
    analysisProcessorGateway.validateCnisDocument.mockResolvedValueOnce(false);
    analysisProcessorGateway.getLegalPleadingCompleteAnalysis.mockResolvedValueOnce(
      'Analysis without parsed CNIS',
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    await useCase.execute(sessionData, orgSessionData, legalPleadingId);

    expect(analysisProcessorGateway.validateCnisDocument).toHaveBeenCalledTimes(
      1,
    );
    expect(analysisProcessorGateway.parseCnisDocument).not.toHaveBeenCalled();
    expect(
      analysisProcessorGateway.getLegalPleadingCompleteAnalysis,
    ).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar LegalPleadingNotFoundError se a petição não for encontrada', async () => {
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
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(LegalPleadingNotFoundError);
  });
});
