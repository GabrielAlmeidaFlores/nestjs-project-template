import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingAddressCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/command/legal-pleading-address.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import {
  CreateLegalPleadingAddressDataRequestDto,
  CreateLegalPleadingDataRequestDto,
  CreateLegalPleadingRequestDto,
} from '@module/customer/analysis-tool/dto/request/create-legal-pleading.request.dto';
import { CreateLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { FileModel } from '@shared/system/model/generic/file.model';

describe(CreateLegalPleadingUseCase.name, () => {
  let useCase: CreateLegalPleadingUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    uploadFile: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientQueryRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const legalPleadingDocumentCommandRepositoryGateway: jest.Mocked<LegalPleadingDocumentCommandRepositoryGateway> =
    {
      createLegalPleadingDocument: jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingDocumentCommandRepositoryGateway>;

  const legalPleadingAddressCommandRepositoryGateway: jest.Mocked<LegalPleadingAddressCommandRepositoryGateway> =
    {
      createLegalPleadingAddress: jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingAddressCommandRepositoryGateway>;

  const legalPleadingCommandRepositoryGateway: jest.Mocked<LegalPleadingCommandRepositoryGateway> =
    {
      createLegalPleading: jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingCommandRepositoryGateway>;

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      countByOrganizationAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingQueryRepositoryGateway>;

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
    options: { withAddress?: boolean; withDocuments?: boolean } = {},
  ): CreateLegalPleadingRequestDto => {
    const addressDto =
      options.withAddress === true
        ? CreateLegalPleadingAddressDataRequestDto.build({
            city: 'Cidade Teste',
            neighborhood: 'Bairro Teste',
            street: 'Rua Teste',
            stateCode: StateCodeEnum.SP,
            postalCode: new PostalCode('12345-678'),
            addressNumber: 100,
          })
        : null;

    const jsonData = CreateLegalPleadingDataRequestDto.build({
      analysisToolClientId: new AnalysisToolClientId(),
      securitySystem: LegalPleadingSocialSecuritySystemEnum.RGPS,
      benefitType: LegalPleadingBenefitTypeEnum.ACCIDENT_BENEFIT,
      petitionType: LegalPleadingPetitionTypeEnum.INITIAL_COMPLAINT,
      legalPleadingAddress: addressDto,
      statementOfFacts: null,
      additionalComments: null,
      benefitNumber: null,
      applicationSubmissionDate: null,
      benefitTerminationDate: null,
      benefitInitialMonthlyIncome: null,
      benefitCurrentMonthlyIncome: null,
      socialSecurityObjective: null,
      legalPleadingWritOfMandamusObjective: null,
    });

    const file = { buffer: Buffer.from('pdf') } as FileModel;

    return CreateLegalPleadingRequestDto.build({
      json: jsonData,
      cnis: options.withDocuments === true ? file : null,
      ctps: options.withDocuments === true ? [file, file] : null,
      ruralDocument: null,
      specialWorkPeriodRecognitionDocument: null,
      personalDocument: null,
      relevantPriorAdministrativeProceeding: null,
      relatedCourtCase: null,
      supportingDocument: null,
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
        analysisToolClientInssBenefit: [],
        analysisToolClientLegalProceeding: [],
        createdBy: responsible,
        updatedBy: responsible,
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
        CreateLegalPleadingUseCase,
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
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
          provide: LegalPleadingAddressCommandRepositoryGateway,
          useValue: legalPleadingAddressCommandRepositoryGateway,
        },
        {
          provide: LegalPleadingCommandRepositoryGateway,
          useValue: legalPleadingCommandRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateLegalPleadingUseCase);
    jest.clearAllMocks();
  });

  it('deve criar uma petição com endereço e documentos', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withAddress: true, withDocuments: true });
    const member = buildOrganizationMember();
    const client = buildAnalysisToolClientQueryResult();
    const transaction = buildTransaction();
    const initialCount = 0;
    const TOTAL_DOCUMENTS_UPLOADED = 3;
    const EXPECTED_TRANSACTIONS = 5;

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    legalPleadingQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      initialCount,
    );
    fileProcessorGateway.uploadFile.mockResolvedValue('path/to/uploaded.pdf');
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    legalPleadingAddressCommandRepositoryGateway.createLegalPleadingAddress.mockReturnValue(
      {} as TransactionType,
    );
    legalPleadingCommandRepositoryGateway.createLegalPleading.mockReturnValue(
      {} as TransactionType,
    );
    legalPleadingDocumentCommandRepositoryGateway.createLegalPleadingDocument.mockReturnValue(
      {} as TransactionType,
    );

    // Act
    const result = await useCase.execute(sessionData, orgSessionData, dto);

    expect(result).toBeInstanceOf(CreateLegalPleadingResponseDto);
    expect(result.legalPleadingId).toBeDefined();

    expect(
      legalPleadingQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      orgSessionData.organizationId,
      sessionData.authIdentityId,
    );
    expect(
      legalPleadingAddressCommandRepositoryGateway.createLegalPleadingAddress,
    ).toHaveBeenCalledTimes(1);
    expect(
      legalPleadingCommandRepositoryGateway.createLegalPleading,
    ).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.uploadFile).toHaveBeenCalledTimes(
      TOTAL_DOCUMENTS_UPLOADED,
    );
    expect(
      legalPleadingDocumentCommandRepositoryGateway.createLegalPleadingDocument,
    ).toHaveBeenCalledTimes(TOTAL_DOCUMENTS_UPLOADED);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(EXPECTED_TRANSACTIONS);

    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve criar uma petição sem endereço e sem documentos', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withAddress: false, withDocuments: false });
    const member = buildOrganizationMember();
    const client = buildAnalysisToolClientQueryResult();
    const transaction = buildTransaction();
    const initialCount = 10;
    const EXPECTED_TRANSACTIONS = 1;

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    legalPleadingQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      initialCount,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    legalPleadingCommandRepositoryGateway.createLegalPleading.mockReturnValue(
      {} as TransactionType,
    );

    await useCase.execute(sessionData, orgSessionData, dto);

    // Assert
    expect(
      legalPleadingAddressCommandRepositoryGateway.createLegalPleadingAddress,
    ).not.toHaveBeenCalled();
    expect(fileProcessorGateway.uploadFile).not.toHaveBeenCalled();
    expect(
      legalPleadingDocumentCommandRepositoryGateway.createLegalPleadingDocument,
    ).not.toHaveBeenCalled();
    expect(
      legalPleadingCommandRepositoryGateway.createLegalPleading,
    ).toHaveBeenCalledTimes(1);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(EXPECTED_TRANSACTIONS);

    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
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

  it('deve lançar AnalysisToolClientNotFoundError se o cliente não for encontrado', async () => {
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
