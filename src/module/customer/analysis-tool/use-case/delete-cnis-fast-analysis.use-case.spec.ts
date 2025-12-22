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
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import {
  CreateCnisFastAnalysisJsonRequestDto,
  CreateCnisFastAnalysisRequestDto,
} from '@module/customer/analysis-tool/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/error/cnis-document-is-not-valid.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { FileModel } from '@shared/system/model/generic/file.model';

describe(CreateCnisFastAnalysisUseCase.name, () => {
  let useCase: CreateCnisFastAnalysisUseCase;

  const fileProcessorGateway = {
    uploadFile: jest.fn(),
  };

  const organizationMemberQueryRepositoryGateway = {
    findOneByCustomerIdAndAuthIdentityId: jest.fn(),
  };

  const cnisFastAnalysisCommandRepositoryGateway = {
    createCnisFastAnalysis: jest.fn(),
  };

  const analysisToolClientQueryRepositoryGateway = {
    findOneByAnalysisToolClientIdAndOrganizationIdOrFail: jest.fn(),
  };

  const cnisFastAnalysisInssBenefitCommandRepositoryGateway = {
    createAnalysisToolClientInssBenefit: jest.fn(),
  };

  const cnisFastAnalysisLegalProceedingCommandRepositoryGateway = {
    createCnisFastAnalysisLegalProceeding: jest.fn(),
  };

  const baseTransactionRepositoryGateway = {
    execute: jest.fn(),
  };

  const analysisProcessorGateway = {
    validateCnisDocument: jest.fn(),
  };

  const analysisToolRecordQueryRepositoryGateway = {
    countByOrganizationIdAndAuthIdentityId: jest.fn(),
  };

  const analysisToolRecordCommandRepositoryGateway = {
    createAnalysisToolRecord: jest.fn(),
  };

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      owner: true,
      organizationId: new OrganizationId(),
    });

  const buildDto = (
    options: { withDocument?: boolean; withRelations?: boolean } = {},
  ): CreateCnisFastAnalysisRequestDto => {
    const jsonDto = CreateCnisFastAnalysisJsonRequestDto.build({
      analysisToolClientId: new AnalysisToolClientId(),
      inssBenefitNumber: options.withRelations === true ? ['1234567890'] : null,
      legalProceedingNumber:
        options.withRelations === true ? ['0987654321'] : null,
    });

    const file =
      options.withDocument === true
        ? ({ buffer: Buffer.from('pdf') } as FileModel)
        : null;

    return CreateCnisFastAnalysisRequestDto.build({
      json: jsonDto,
      cnisDocument: file,
    });
  };

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildAnalysisToolClientQueryResult =
    (): GetAnalysisToolClientWithRelationsQueryResult => {
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

      return GetAnalysisToolClientWithRelationsQueryResult.build({
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
        createdBy: responsible,
        updatedBy: responsible,
        analysisToolClientInssBenefit: [],
        analysisToolClientLegalProceeding: [],
      });
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateCnisFastAnalysisUseCase,
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisCommandRepositoryGateway,
          useValue: cnisFastAnalysisCommandRepositoryGateway,
        },
        {
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisInssBenefitCommandRepositoryGateway,
          useValue: cnisFastAnalysisInssBenefitCommandRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisLegalProceedingCommandRepositoryGateway,
          useValue: cnisFastAnalysisLegalProceedingCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: AnalysisProcessorGateway,
          useValue: analysisProcessorGateway,
        },
        {
          provide: AnalysisToolRecordQueryRepositoryGateway,
          useValue: analysisToolRecordQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolRecordCommandRepositoryGateway,
          useValue: analysisToolRecordCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should create a cnis fast analysis and a corresponding analysis record', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withDocument: true, withRelations: true });
    const member = buildOrganizationMember();
    const client = buildAnalysisToolClientQueryResult();
    const transaction = buildTransaction();
    const existingRecordCount = 5;
    const newRecordCode = existingRecordCount + 1;
    const EXPECTED_TRANSACTION_COUNT = 4;

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisProcessorGateway.validateCnisDocument.mockResolvedValueOnce(true);
    fileProcessorGateway.uploadFile.mockResolvedValueOnce('path/to/doc.pdf');
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      existingRecordCount,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding.mockReturnValue(
      {} as TransactionType,
    );
    analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord.mockReturnValue(
      {} as TransactionType,
    );

    const result = await useCase.execute(sessionData, orgSessionData, dto);

    expect(result).toBeInstanceOf(CreateCnisFastAnalysisResponseDto);
    expect(result.cnisFastAnalysisId).toBeDefined();

    expect(
      analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      orgSessionData.organizationId,
      sessionData.authIdentityId,
    );

    expect(
      analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord,
    ).toHaveBeenCalledTimes(1);
    const [[capturedRecord]] = analysisToolRecordCommandRepositoryGateway
      .createAnalysisToolRecord.mock.calls as [[AnalysisToolRecordEntity]];
    expect(capturedRecord).toBeInstanceOf(AnalysisToolRecordEntity);
    expect(capturedRecord.code.toString()).toBe(`AN00${newRecordCode}`);
    expect(capturedRecord.type).toBe(
      AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS,
    );

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(EXPECTED_TRANSACTION_COUNT);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('throws OrganizationMemberNotFoundError when organization member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('throws CnisDocumentIsNotValidError when cnis document is invalid', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withDocument: true });
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisProcessorGateway.validateCnisDocument.mockResolvedValueOnce(false);

    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(CnisDocumentIsNotValidError);
  });

  it('throws AnalysisToolClientNotFoundError when client is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail.mockRejectedValueOnce(
      new AnalysisToolClientNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(AnalysisToolClientNotFoundError);
  });
});
