import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
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
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { FileModel } from '@shared/system/model/generic/file.model';

describe(CreateCnisFastAnalysisUseCase.name, () => {
  let useCase: CreateCnisFastAnalysisUseCase;

  const BENEFIT_NUMBER_1 = 123456;
  const BENEFIT_NUMBER_2 = 789012;
  const PROCEEDING_NUMBER_1 = 987654;
  const PROCEEDING_NUMBER_2 = 321098;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    uploadDocument: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const cnisFastAnalysisCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisCommandRepositoryGateway> =
    {
      createCnisFastAnalysis: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisCommandRepositoryGateway>;

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientQueryRepositoryGateway>;

  const cnisFastAnalysisInssBenefitCommandRepositoryGateway: jest.Mocked<AnalysisToolClientInssBenefitCommandRepositoryGateway> =
    {
      createAnalysisToolClientInssBenefit: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientInssBenefitCommandRepositoryGateway>;

  const cnisFastAnalysisLegalProceedingCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisLegalProceedingCommandRepositoryGateway> =
    {
      createCnisFastAnalysisLegalProceeding: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisLegalProceedingCommandRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const documentAnalysisGateway: jest.Mocked<AnalysisProcessorGateway> = {
    validateCnisDocument: jest.fn(),
  } as unknown as jest.Mocked<AnalysisProcessorGateway>;

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

  const buildDto = (
    options: {
      withDocument?: boolean;
      withBenefits?: boolean;
      withProceedings?: boolean;
    } = {},
  ): CreateCnisFastAnalysisRequestDto => {
    const jsonDto = CreateCnisFastAnalysisJsonRequestDto.build({
      analysisToolClientId: new AnalysisToolClientId(),
      inssBenefitNumber:
        options.withBenefits === true
          ? [BENEFIT_NUMBER_1, BENEFIT_NUMBER_2]
          : null,
      legalProceedingNumber:
        options.withProceedings === true
          ? [PROCEEDING_NUMBER_1, PROCEEDING_NUMBER_2]
          : null,
    });

    const file =
      options.withDocument === true
        ? ({
            buffer: Buffer.from('fake-pdf'),
          } as FileModel)
        : undefined;

    return CreateCnisFastAnalysisRequestDto.build({
      json: jsonDto,
      cnisDocument: file ?? null,
    });
  };

  const buildOrganizationMember = (): OrganizationMemberEntity =>
    new OrganizationMemberEntity({
      id: new OrganizationMemberId(),
      organization: {} as OrganizationEntity,
      customer: {} as CustomerEntity,
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildAnalysisToolClientQueryResult =
    (): GetAnalysisToolClientWithRelationsQueryResult => {
      const member = buildOrganizationMember();
      return {
        id: new AnalysisToolClientId(),
        name: 'Client Name',
        createdBy: member,
        updatedBy: member,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as unknown as GetAnalysisToolClientWithRelationsQueryResult;
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
          provide: AnalysisToolClientInssBenefitCommandRepositoryGateway,
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
        { provide: AnalysisProcessorGateway, useValue: documentAnalysisGateway },
      ],
    }).compile();

    useCase = module.get(CreateCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should create a cnis fast analysis with all related entities when all data is provided', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto({
      withDocument: true,
      withBenefits: true,
      withProceedings: true,
    });
    const organizationMember = buildOrganizationMember();
    const clientQueryResult = buildAnalysisToolClientQueryResult();
    const mockTransaction = buildTransaction();
    const uploadedDocumentPath = 'path/to/uploaded/doc.pdf';

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    documentAnalysisGateway.validateCnisDocument.mockResolvedValueOnce(true);
    fileProcessorGateway.uploadDocument.mockResolvedValueOnce(
      uploadedDocumentPath,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      clientQueryResult,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(
      mockTransaction,
    );
    cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis.mockReturnValue(
      {} as unknown as TransactionType,
    );
    cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit.mockReturnValue(
      {} as unknown as TransactionType,
    );
    cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding.mockReturnValue(
      {} as unknown as TransactionType,
    );

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );

    expect(result).toBeInstanceOf(CreateCnisFastAnalysisResponseDto);
    expect(result.cnisFastAnalysisId).toBeDefined();

    expect(documentAnalysisGateway.validateCnisDocument).toHaveBeenCalledTimes(
      1,
    );
    expect(fileProcessorGateway.uploadDocument).toHaveBeenCalledTimes(1);

    expect(
      cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    const [[capturedAnalysis]] = cnisFastAnalysisCommandRepositoryGateway
      .createCnisFastAnalysis.mock.calls as [[CnisFastAnalysisEntity]];
    expect(capturedAnalysis.cnisDocument).toBe(uploadedDocumentPath);
    expect(capturedAnalysis.createdBy).toBe(organizationMember.id);

    expect(
      cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit,
    ).toHaveBeenCalledTimes(2);
    expect(
      cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding,
    ).toHaveBeenCalledTimes(2);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(
      1 +
        (dto.json.inssBenefitNumber?.length ?? 0) +
        (dto.json.legalProceedingNumber?.length ?? 0),
    );

    expect(mockTransaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should create a cnis fast analysis without a document if it is not provided', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withDocument: false });
    const organizationMember = buildOrganizationMember();
    const clientQueryResult = buildAnalysisToolClientQueryResult();
    const mockTransaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      clientQueryResult,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(
      mockTransaction,
    );
    cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis.mockReturnValue(
      {} as unknown as TransactionType,
    );

    await useCase.execute(sessionData, organizationSessionData, dto);

    expect(documentAnalysisGateway.validateCnisDocument).not.toHaveBeenCalled();
    expect(fileProcessorGateway.uploadDocument).not.toHaveBeenCalled();

    expect(
      cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    const [[capturedAnalysis]] = cnisFastAnalysisCommandRepositoryGateway
      .createCnisFastAnalysis.mock.calls as [[CnisFastAnalysisEntity]];
    expect(capturedAnalysis.cnisDocument).toBeNull();
  });

  it('throws OrganizationMemberNotFoundError when organization member is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('throws CnisDocumentIsNotValidError when cnis document is invalid', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withDocument: true });
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    documentAnalysisGateway.validateCnisDocument.mockResolvedValueOnce(false);

    await expect(
      useCase.execute(sessionData, organizationSessionData, dto),
    ).rejects.toBeInstanceOf(CnisDocumentIsNotValidError);
    expect(fileProcessorGateway.uploadDocument).not.toHaveBeenCalled();
  });

  it('throws AnalysisToolClientNotFoundError when client is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockRejectedValueOnce(
      new AnalysisToolClientNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, dto),
    ).rejects.toBeInstanceOf(AnalysisToolClientNotFoundError);
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });
});
