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
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';
import { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';
import {
  UpdateCnisFastAnalysisJsonRequestDto,
  UpdateCnisFastAnalysisRequestDto,
} from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis.request.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/error/cnis-document-is-not-valid.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DocumentAnalysisGateway } from '@module/customer/analysis-tool/lib/document-analysis/document-analysis.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import type { GetCnisFastAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/query/result/get-cnis-fast-analysis-inss-benefit.query.result';
import type { GetCnisFastAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/query/result/get-cnis-fast-analysis-legal-proceeding.query.result';
import type { FileModel } from '@shared/system/model/generic/file.model';

describe(UpdateCnisFastAnalysisUseCase.name, () => {
  let useCase: UpdateCnisFastAnalysisUseCase;

  const NEW_BENEFIT_1 = 111;
  const NEW_BENEFIT_2 = 222;
  const NEW_PROCEEDING_1 = 333;
  const NEW_PROCEEDING_2 = 444;
  const SINGLE_NEW_BENEFIT = 123;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    uploadDocument: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const cnisFastAnalysisCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisCommandRepositoryGateway> =
    {
      updateCnisFastAnalysis: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisCommandRepositoryGateway>;

  const cnisFastAnalysisInssBenefitCommandRepositoryGateway: jest.Mocked<AnalysisToolClientInssBenefitCommandRepositoryGateway> =
    {
      createAnalysisToolClientInssBenefit: jest.fn(),
      deleteAnalysisToolClientInssBenefit: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientInssBenefitCommandRepositoryGateway>;

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByIdWithRelationsOrFail: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisQueryRepositoryGateway>;

  const cnisFastAnalysisLegalProceedingCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisLegalProceedingCommandRepositoryGateway> =
    {
      createCnisFastAnalysisLegalProceeding: jest.fn(),
      deleteCnisFastAnalysisLegalProceeding: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisLegalProceedingCommandRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientQueryRepositoryGateway>;

  const documentAnalysisGateway: jest.Mocked<DocumentAnalysisGateway> = {
    validateCnisDocument: jest.fn(),
  } as unknown as jest.Mocked<DocumentAnalysisGateway>;

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
      withJson?: boolean;
      clearLists?: boolean;
    } = {},
  ): UpdateCnisFastAnalysisRequestDto => {
    const jsonDto =
      options.withJson === true
        ? UpdateCnisFastAnalysisJsonRequestDto.build({
            analysisToolClientId: new AnalysisToolClientId(),
            inssBenefitNumber:
              options.clearLists === true ? [] : [NEW_BENEFIT_1, NEW_BENEFIT_2],
            legalProceedingNumber:
              options.clearLists === true
                ? []
                : [NEW_PROCEEDING_1, NEW_PROCEEDING_2],
          })
        : null;

    const file =
      options.withDocument === true
        ? ({ buffer: Buffer.from('pdf-data') } as FileModel)
        : null;

    return UpdateCnisFastAnalysisRequestDto.build({
      json: jsonDto,
      cnisDocument: file,
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
    (): GetAnalysisToolClientWithRelationsQueryResult =>
      ({
        id: new AnalysisToolClientId(),
        createdBy: { id: new OrganizationMemberId() },
        updatedBy: { id: new OrganizationMemberId() },
      }) as unknown as GetAnalysisToolClientWithRelationsQueryResult;

  const buildCnisFastAnalysisQueryResult =
    (): GetCnisFastAnalysisWithRelationsQueryResult => {
      const client = buildAnalysisToolClientQueryResult();
      const OLD_BENEFIT_NUMBER = 999;
      const OLD_PROCEEDING_NUMBER = 888;
      return {
        id: new CnisFastAnalysisId(),
        cnisDocument: 'old/path/doc.pdf',
        analysisToolClient: client,
        cnisFastAnalysisResult: null,
        cnisFastAnalysisInssBenefit: [
          {
            id: new AnalysisToolClientInssBenefitId(),
            inssBenefitNumber: OLD_BENEFIT_NUMBER,
          },
        ] as GetCnisFastAnalysisInssBenefitQueryResult[],
        cnisFastAnalysisLegalProceeding: [
          {
            id: new CnisFastAnalysisLegalProceedingId(),
            legalProceedingNumber: OLD_PROCEEDING_NUMBER,
          },
        ] as GetCnisFastAnalysisLegalProceedingQueryResult[],
        createdBy: { id: new OrganizationMemberId() },
        updatedBy: { id: new OrganizationMemberId() },
      } as unknown as GetCnisFastAnalysisWithRelationsQueryResult;
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateCnisFastAnalysisUseCase,
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
          provide: AnalysisToolClientInssBenefitCommandRepositoryGateway,
          useValue: cnisFastAnalysisInssBenefitCommandRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
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
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
        },
        { provide: DocumentAnalysisGateway, useValue: documentAnalysisGateway },
      ],
    }).compile();

    useCase = module.get(UpdateCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should update all fields and replace all related entities', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisId = new CnisFastAnalysisId();
    const dto = buildDto({ withDocument: true, withJson: true });
    const member = buildOrganizationMember();
    const initialAnalysis = buildCnisFastAnalysisQueryResult();
    const newClient = buildAnalysisToolClientQueryResult();
    const transaction = buildTransaction();
    const TOTAL_TRANSACTIONS = 7;

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      initialAnalysis,
    );
    documentAnalysisGateway.validateCnisDocument.mockResolvedValueOnce(true);
    fileProcessorGateway.uploadDocument.mockResolvedValueOnce('new/path.pdf');
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      newClient,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);
    cnisFastAnalysisInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisLegalProceedingCommandRepositoryGateway.deleteCnisFastAnalysisLegalProceeding.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisId,
      dto,
    );

    expect(result).toBeInstanceOf(UpdateCnisFastAnalysisResponseDto);
    expect(
      cnisFastAnalysisInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit,
    ).toHaveBeenCalledTimes(2);
    expect(
      cnisFastAnalysisLegalProceedingCommandRepositoryGateway.deleteCnisFastAnalysisLegalProceeding,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding,
    ).toHaveBeenCalledTimes(2);
    expect(
      cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(TOTAL_TRANSACTIONS);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should only update benefit numbers when only they are provided', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisId = new CnisFastAnalysisId();
    const dto = UpdateCnisFastAnalysisRequestDto.build({
      json: UpdateCnisFastAnalysisJsonRequestDto.build({
        inssBenefitNumber: [SINGLE_NEW_BENEFIT],
        legalProceedingNumber: null,
        analysisToolClientId: null,
      }),
      cnisDocument: null,
    });
    const member = buildOrganizationMember();
    const initialAnalysis = buildCnisFastAnalysisQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      initialAnalysis,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      initialAnalysis.analysisToolClient as unknown as GetAnalysisToolClientWithRelationsQueryResult,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);
    cnisFastAnalysisInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );

    await useCase.execute(sessionData, orgSessionData, cnisId, dto);

    expect(
      cnisFastAnalysisInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisLegalProceedingCommandRepositoryGateway.deleteCnisFastAnalysisLegalProceeding,
    ).not.toHaveBeenCalled();
    expect(
      cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding,
    ).not.toHaveBeenCalled();
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('throws OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisId = new CnisFastAnalysisId();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisId, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('throws CnisFastAnalysisNotFoundError when analysis is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisId = new CnisFastAnalysisId();
    const dto = buildDto();
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockRejectedValueOnce(
      new CnisFastAnalysisNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisId, dto),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
  });

  it('throws CnisDocumentIsNotValidError when document is invalid', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisId = new CnisFastAnalysisId();
    const dto = buildDto({ withDocument: true });
    const member = buildOrganizationMember();
    const initialAnalysis = buildCnisFastAnalysisQueryResult();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      initialAnalysis,
    );
    documentAnalysisGateway.validateCnisDocument.mockResolvedValueOnce(false);

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisId, dto),
    ).rejects.toBeInstanceOf(CnisDocumentIsNotValidError);
  });
});
