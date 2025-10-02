import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisClientCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client/command/cnis-fast-analysis-client.command.repository.gateway';
import { CnisFastAnalysisClientInssBenefitCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client-inss-benefit/command/cnis-fast-analysis-client-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client-legal-proceeding/command/cnis-fast-analysis-client-legal-proceeding.command.repository.gateway';
import {
  CreateCnisFastAnalysisClientRequestDto,
  CreateCnisFastAnalysisJsonRequestDto,
  CreateCnisFastAnalysisRequestDto,
} from '@module/customer/cnis-fast-analysis/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis.response.dto';
import { CnisDocumentIsNotValidError } from '@module/customer/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { OrganizationMemberNotFoundError } from '@module/customer/cnis-fast-analysis/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.gateway';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';

describe(CreateCnisFastAnalysisUseCase.name, () => {
  let useCase: CreateCnisFastAnalysisUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    validateCnisDocument: jest.fn(),
    processAndUploadCnisDocument: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const cnisFastAnalysisCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisCommandRepositoryGateway> =
    {
      createCnisFastAnalysis: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisCommandRepositoryGateway>;

  const cnisFastAnalysisClientCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisClientCommandRepositoryGateway> =
    {
      createCnisFastAnalysisClient: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisClientCommandRepositoryGateway>;

  const cnisFastAnalysisClientInssBenefitCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisClientInssBenefitCommandRepositoryGateway> =
    {
      createCnisFastAnalysisClientInssBenefit: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisClientInssBenefitCommandRepositoryGateway>;

  const cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway> =
    {
      createCnisFastAnalysisClientLegalProceeding: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrgSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    GetOrganizationMemberQueryResult.build({
      id: new OrganizationMemberId(),
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildDto = (
    overrides?: Partial<CreateCnisFastAnalysisRequestDto>,
  ): CreateCnisFastAnalysisRequestDto => {
    const file = new FileModel();
    file.buffer = Buffer.from('pdf-content');

    const clientDto = CreateCnisFastAnalysisClientRequestDto.build({
      name: 'Test Client',
      birthDate: new Date('1980-01-01'),
      inssBenefitNumber: [1],
      legalProceedingNumber: [1],
    });

    const jsonDto = CreateCnisFastAnalysisJsonRequestDto.build({
      cnisFastAnalysisClient: clientDto,
    });

    return CreateCnisFastAnalysisRequestDto.build({
      cnisDocument: file,
      json: jsonDto,
      ...overrides,
    });
  };

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
          provide: CnisFastAnalysisClientCommandRepositoryGateway,
          useValue: cnisFastAnalysisClientCommandRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisClientInssBenefitCommandRepositoryGateway,
          useValue: cnisFastAnalysisClientInssBenefitCommandRepositoryGateway,
        },
        {
          provide:
            CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway,
          useValue:
            cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should create a full cnis analysis with document, benefits, and legal proceedings', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const dto = buildDto();
    const organizationMember = buildOrganizationMember();
    const uploadedDocumentPath = 'uploads/cnis/document.pdf';

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    fileProcessorGateway.validateCnisDocument.mockResolvedValueOnce(true);
    fileProcessorGateway.processAndUploadCnisDocument.mockResolvedValueOnce(
      uploadedDocumentPath,
    );

    const clientTx: TransactionType = jest.fn();
    const benefitTx: TransactionType = jest.fn();
    const legalTx: TransactionType = jest.fn();
    const analysisTx: TransactionType = jest.fn();
    cnisFastAnalysisClientCommandRepositoryGateway.createCnisFastAnalysisClient.mockReturnValueOnce(
      clientTx,
    );
    cnisFastAnalysisClientInssBenefitCommandRepositoryGateway.createCnisFastAnalysisClientInssBenefit.mockReturnValueOnce(
      benefitTx,
    );
    cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisClientLegalProceeding.mockReturnValueOnce(
      legalTx,
    );
    cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis.mockReturnValueOnce(
      analysisTx,
    );

    const commit = jest.fn().mockResolvedValue(undefined);
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(
      new TransactionOutputModel(commit, jest.fn()),
    );

    // Act
    const result = await useCase.execute(sessionData, orgSessionData, dto);

    // Assert
    expect(fileProcessorGateway.validateCnisDocument).toHaveBeenCalledWith(
      dto.cnisDocument?.buffer,
    );
    expect(
      fileProcessorGateway.processAndUploadCnisDocument,
    ).toHaveBeenCalledWith(dto.cnisDocument?.buffer);

    const [[clientEntityArg]] = cnisFastAnalysisClientCommandRepositoryGateway
      .createCnisFastAnalysisClient.mock.calls as [
      [CnisFastAnalysisClientEntity],
    ];
    expect(clientEntityArg.name).toBe(dto.json.cnisFastAnalysisClient.name);

    expect(
      cnisFastAnalysisClientInssBenefitCommandRepositoryGateway.createCnisFastAnalysisClientInssBenefit,
    ).toHaveBeenCalledTimes(1);
    const [[benefitEntityArg]] =
      cnisFastAnalysisClientInssBenefitCommandRepositoryGateway
        .createCnisFastAnalysisClientInssBenefit.mock.calls as [
        [CnisFastAnalysisClientInssBenefitEntity],
      ];
    expect(benefitEntityArg.inssBenefitNumber).toBe(
      dto.json.cnisFastAnalysisClient.inssBenefitNumber?.[0],
    );
    expect(benefitEntityArg.cnisFastAnalysisClient).toBe(clientEntityArg);

    expect(
      cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisClientLegalProceeding,
    ).toHaveBeenCalledTimes(1);

    const [[analysisEntityArg]] = cnisFastAnalysisCommandRepositoryGateway
      .createCnisFastAnalysis.mock.calls as [[CnisFastAnalysisEntity]];
    expect(analysisEntityArg.cnisDocument).toBe(uploadedDocumentPath);
    expect(analysisEntityArg.cnisFastAnalysisClient).toBe(clientEntityArg);
    expect(analysisEntityArg.createdBy).toBe(organizationMember.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledWith([
      clientTx,
      benefitTx,
      legalTx,
      analysisTx,
    ]);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(CreateCnisFastAnalysisResponseDto);
    expect(result.cnisFastAnalysisId).toBe(analysisEntityArg.id);
  });

  it('should create an analysis without a cnis document', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const dto = buildDto();
    delete dto.cnisDocument; // Omit the optional property
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(
      new TransactionOutputModel(jest.fn(), jest.fn()),
    );

    // Act
    await useCase.execute(sessionData, orgSessionData, dto);

    // Assert
    expect(fileProcessorGateway.validateCnisDocument).not.toHaveBeenCalled();
    expect(
      fileProcessorGateway.processAndUploadCnisDocument,
    ).not.toHaveBeenCalled();

    const [[analysisEntityArg]] = cnisFastAnalysisCommandRepositoryGateway
      .createCnisFastAnalysis.mock.calls as [[CnisFastAnalysisEntity]];
    expect(analysisEntityArg.cnisDocument).toBeNull();
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const dto = buildDto();
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });

  it('should throw CnisDocumentIsNotValidError for an invalid document', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const dto = buildDto();
    const organizationMember = buildOrganizationMember();
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    fileProcessorGateway.validateCnisDocument.mockResolvedValueOnce(false);

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(CnisDocumentIsNotValidError);
    expect(
      fileProcessorGateway.processAndUploadCnisDocument,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });
});
