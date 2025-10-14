import { Injectable } from '@nestjs/common';
import moment from 'moment';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import {
  RawCnisInterface,
  RawCnisSessionAffiliateIdentificationInterface,
  RawCnisSocialSecurityRelationInterface,
  RawCnisSessionSocialSecurityAffiliationEarningsHistoryInterface,
  RawCnisSessionSocialSecurityAffiliationInfoInterface,
} from '@lib/cnis-processor/implementation/pdfjs/interface/cnis/raw-cnis.interface';
import { PdfItemInterface } from '@lib/cnis-processor/implementation/pdfjs/interface/pdf-item/pdf-item.interface';
import { PdfRawItemInterface } from '@lib/cnis-processor/implementation/pdfjs/interface/pdf-item/pdf-raw-item.interface';
import { RawPdfJsonType } from '@lib/cnis-processor/implementation/pdfjs/type/raw-pdf-json.type';
import {
  CnisOutputModel,
  CnisAffiliateIdentificationOutputModel,
  CnisSocialSecurityRelationOutputModel,
  CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel,
  CnisSessionSocialSecurityAffiliationInfoOutputModel,
} from '@lib/cnis-processor/model/output/cnis.output.model';

export class PdfUtil {
  protected readonly _type = PdfUtil.name;

  protected async parsePdfToJson(pdfData: Buffer): Promise<RawPdfJsonType> {
    const data = new Uint8Array(pdfData);
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdfDocument = await loadingTask.promise;

    const allPdfItems: RawPdfJsonType = [];

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const content = await page.getTextContent();
      const items = content.items as PdfRawItemInterface[];

      const pageItems: PdfItemInterface[] = [];

      for (const item of items) {
        const top = item.transform[4];
        const left = item.transform[5];
        const height = item.height;
        const width = item.width;

        if (top !== undefined && left !== undefined) {
          pageItems.push({
            text: item.str,
            geometry: {
              width,
              height,
            },
            polygon: {
              topLeft: { x: left, y: top },
              topRight: { x: left + width, y: top },
              bottomRight: { x: left + width, y: top + height },
              bottomLeft: { x: left, y: top + height },
            },
            page: pageNum,
          });
        }
      }

      allPdfItems.push(pageItems);
    }

    return allPdfItems.map((page) => {
      return page.filter((item) => {
        if (item.text.replace(/\s/g, '') === '') {
          return false;
        }

        return true;
      });
    });
  }

  protected findOneByWord(
    items: PdfItemInterface[],
    targetWord: string,
  ): PdfItemInterface | undefined {
    return items
      .filter((item) => {
        const text = item.text.trim();
        return this.matchesWithWildcard(text, targetWord);
      })
      .sort((a, b) => {
        return a.polygon.topLeft.y - b.polygon.topLeft.y;
      })[0];
  }

  protected findManyByWord(
    items: PdfItemInterface[],
    targetWord: string,
  ): PdfItemInterface[] {
    return items
      .filter((item) => {
        const text = item.text.trim();
        return this.matchesWithWildcard(text, targetWord);
      })
      .sort((a, b) => {
        return a.polygon.topLeft.y - b.polygon.topLeft.y;
      });
  }

  private matchesWithWildcard(text: string, pattern: string): boolean {
    const normalizedText = text.trim().toLowerCase();
    const normalizedPattern = pattern.trim().toLowerCase();

    if (normalizedPattern.startsWith('%') && normalizedPattern.endsWith('%')) {
      const word = normalizedPattern.slice(1, -1);
      return normalizedText.includes(word);
    }

    if (normalizedPattern.startsWith('%')) {
      const word = normalizedPattern.slice(1);
      return normalizedText.endsWith(word);
    }

    if (normalizedPattern.endsWith('%')) {
      const word = normalizedPattern.slice(0, -1);
      return normalizedText.startsWith(word);
    }

    return normalizedText === normalizedPattern;
  }
}

@Injectable()
export class PdfJSService extends PdfUtil implements CnisProcessorGateway {
  protected override readonly _type = PdfJSService.name;

  public async validateCnisDocument(pdf: Buffer): Promise<boolean> {
    const parsedCnis = await this.parseCnisDocument(pdf);

    if (
      parsedCnis.affiliateIdentification === undefined ||
      parsedCnis.socialSecurityRelations === undefined
    ) {
      return false;
    }

    const verify = parsedCnis.socialSecurityRelations.length > 0;

    return verify;
  }

  public async parseCnisDocument(pdf: Buffer): Promise<CnisOutputModel> {
    const rawCnis = await this.parsePdfToCnis(pdf);

    const socialSecurityRelations = rawCnis.socialSecurityRelations?.map(
      (rawCnisSession) => {
        const socialSecurityAffiliationInfo =
          this.parseCnisSocialSecurityAffiliationInfo(
            rawCnisSession.socialSecurityAffiliationInfo,
          );

        const socialSecurityAffiliationEarningsHistory =
          rawCnisSession.socialSecurityAffiliationEarningsHistory.map(
            (value) => {
              return this.parseCnisSocialSecurityAffiliationEarningsHistory(
                value,
              );
            },
          );

        return CnisSocialSecurityRelationOutputModel.build({
          socialSecurityAffiliationEarningsHistory,
          socialSecurityAffiliationInfo,
        });
      },
    );

    const cnis = CnisOutputModel.build({});

    if (rawCnis.affiliateIdentification) {
      cnis.affiliateIdentification =
        this.parseCnisSessionAffiliateIdentification(
          rawCnis.affiliateIdentification,
        );
    }

    if (socialSecurityRelations) {
      cnis.socialSecurityRelations = socialSecurityRelations;
    }

    return cnis;
  }

  private parseCnisSessionAffiliateIdentification(
    data: RawCnisSessionAffiliateIdentificationInterface,
  ): CnisAffiliateIdentificationOutputModel {
    type TransformMapItemType<
      K extends keyof CnisAffiliateIdentificationOutputModel,
    > = {
      sourceKey: string;
      destinyKey: K;
      transformMethod: (
        value: string,
      ) => CnisAffiliateIdentificationOutputModel[K];
    };

    type AnyTransformMapItemType = {
      [K in keyof CnisAffiliateIdentificationOutputModel]: TransformMapItemType<K>;
    }[keyof CnisAffiliateIdentificationOutputModel];

    const transformMap: Array<AnyTransformMapItemType> = [
      {
        sourceKey: 'NIT',
        destinyKey: 'nit',
        transformMethod: (v) => v.toString(),
      },
      {
        sourceKey: 'Data de nascimento',
        destinyKey: 'dataDeNascimento',
        transformMethod: (v) => moment(v, 'DD/MM/YYYY').toDate(),
      },
      {
        sourceKey: 'CPF',
        destinyKey: 'cpf',
        transformMethod: (v) => v.toString(),
      },
      {
        sourceKey: 'Nome',
        destinyKey: 'nome',
        transformMethod: (v) => v.toString(),
      },
      {
        sourceKey: 'Nome da mãe',
        destinyKey: 'nomeDaMae',
        transformMethod: (v) => v.toString(),
      },
    ];

    const parsedContent = transformMap
      .map((transformMapStrategy) => {
        if (transformMapStrategy?.sourceKey === undefined) {
          return {};
        }

        const sourceValue = data[transformMapStrategy.sourceKey];

        if (sourceValue === undefined) {
          return {};
        }

        const destinyKey = transformMapStrategy.destinyKey;

        const destinyValue = transformMapStrategy.transformMethod(sourceValue);

        return { [destinyKey]: destinyValue };
      })
      .reduce<Record<string, unknown>>((acc, obj) => {
        for (const [key, value] of Object.entries(obj)) {
          if (value !== undefined) {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

    return CnisAffiliateIdentificationOutputModel.build({
      ...parsedContent,
    });
  }

  private parseCnisSocialSecurityAffiliationEarningsHistory(
    data: RawCnisSessionSocialSecurityAffiliationEarningsHistoryInterface,
  ): CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel {
    type TransformMapItemType<
      K extends
        keyof CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel,
    > = {
      sourceKey: string;
      destinyKey: K;
      transformMethod: (
        value: string,
      ) => CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel[K];
    };

    type AnyTransformMapItemType = {
      [K in keyof CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel]: TransformMapItemType<K>;
    }[keyof CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel];

    const transformMap: Array<AnyTransformMapItemType> = [
      {
        sourceKey: 'Competência',
        destinyKey: 'competencia',
        transformMethod: (v) => moment(v, 'MM/YYYY').toDate(),
      },
      {
        sourceKey: 'Remuneração',
        destinyKey: 'remuneracao',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Indicadores',
        destinyKey: 'indicadores',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Data Pgto.',
        destinyKey: 'dataPgto',
        transformMethod: (v) => moment(v, 'DD/MM/YYYY').toDate(),
      },
      {
        sourceKey: 'Contribuição',
        destinyKey: 'contribuicao',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Salário Contribuição',
        destinyKey: 'salarioContribuicao',
        transformMethod: (v) => String(v),
      },
    ];

    const parsedContent = transformMap
      .map((transformMapStrategy) => {
        if (transformMapStrategy?.sourceKey === undefined) {
          return {};
        }

        const sourceValue = data[transformMapStrategy.sourceKey];

        if (sourceValue === undefined) {
          return {};
        }

        const destinyKey = transformMapStrategy.destinyKey;

        const destinyValue = transformMapStrategy.transformMethod(sourceValue);

        return { [destinyKey]: destinyValue };
      })
      .reduce<Record<string, unknown>>((acc, obj) => {
        for (const [key, value] of Object.entries(obj)) {
          if (value !== undefined) {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

    return CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel.build(
      {
        ...parsedContent,
      },
    );
  }

  private parseCnisSocialSecurityAffiliationInfo(
    data: RawCnisSessionSocialSecurityAffiliationInfoInterface,
  ): CnisSessionSocialSecurityAffiliationInfoOutputModel {
    type TransformMapItemType<
      K extends keyof CnisSessionSocialSecurityAffiliationInfoOutputModel,
    > = {
      sourceKey: string;
      destinyKey: K;
      transformMethod: (
        value: string,
      ) => CnisSessionSocialSecurityAffiliationInfoOutputModel[K];
    };

    type AnyTransformMapItemType = {
      [K in keyof CnisSessionSocialSecurityAffiliationInfoOutputModel]: TransformMapItemType<K>;
    }[keyof CnisSessionSocialSecurityAffiliationInfoOutputModel];

    const transformMap: Array<AnyTransformMapItemType> = [
      {
        sourceKey: 'Seq.',
        destinyKey: 'seq',
        transformMethod: (v) => Number(v),
      },
      {
        sourceKey: 'NIT',
        destinyKey: 'nit',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Código Emp.',
        destinyKey: 'codigoEmp',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Origem do Vínculo',
        destinyKey: 'origemDoVinculo',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Matrícula do Trabalhador',
        destinyKey: 'matriculaDoTrabalhador',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Tipo Filiado no Vínculo',
        destinyKey: 'tipoFiliadoNoVinculo',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Data Início',
        destinyKey: 'dataInicio',
        transformMethod: (v) => moment(v, 'DD/MM/YYYY').toDate(),
      },
      {
        sourceKey: 'Data Fim',
        destinyKey: 'dataFim',
        transformMethod: (v) => moment(v, 'DD/MM/YYYY').toDate(),
      },
      {
        sourceKey: 'Últ. Remun.',
        destinyKey: 'ultRemun',
        transformMethod: (v) => moment(v, 'MM/YYYY').toDate(),
      },
      {
        sourceKey: 'Indicadores',
        destinyKey: 'indicadores',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'NB',
        destinyKey: 'nb',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Espécie',
        destinyKey: 'especie',
        transformMethod: (v) => String(v),
      },
      {
        sourceKey: 'Situação',
        destinyKey: 'situacao',
        transformMethod: (v) => String(v),
      },
    ];

    const parsedContent = transformMap
      .map((transformMapStrategy) => {
        if (transformMapStrategy?.sourceKey === undefined) {
          return {};
        }

        const sourceValue = data[transformMapStrategy.sourceKey];

        if (sourceValue === undefined) {
          return {};
        }

        const destinyKey = transformMapStrategy.destinyKey;

        const destinyValue = transformMapStrategy.transformMethod(sourceValue);

        return { [destinyKey]: destinyValue };
      })
      .reduce<Record<string, unknown>>((acc, obj) => {
        for (const [key, value] of Object.entries(obj)) {
          if (value !== undefined) {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

    return CnisSessionSocialSecurityAffiliationInfoOutputModel.build({
      ...parsedContent,
    });
  }

  private async parsePdfToCnis(pdf: Buffer): Promise<RawCnisInterface> {
    const rawPdfJsonData: RawPdfJsonType = await this.parsePdfToJson(pdf);

    const affiliateIdentification =
      this.extractCnisAffiliateIdentificationFromPdfData(rawPdfJsonData);
    const socialSecurityRelations =
      this.extractCnisSocialSecurityRelationFromPdfData(rawPdfJsonData);

    return {
      affiliateIdentification,
      socialSecurityRelations,
    } as RawCnisInterface;
  }

  private extractCnisAffiliateIdentificationFromPdfData(
    rawPdfJsonData: RawPdfJsonType,
  ): RawCnisSessionAffiliateIdentificationInterface {
    const firstPage = rawPdfJsonData[0];

    if (firstPage === undefined) {
      return {};
    }

    const affiliateIdentificationPlaceHolders = [
      'NIT:',
      'Data de nascimento:',
      'Nome:',
      'Nome da mãe:',
      'CPF:',
    ];

    return affiliateIdentificationPlaceHolders
      .map((placeHolder) => {
        const placeHolderPdfItem = this.findOneByWord(firstPage, placeHolder);

        if (!placeHolderPdfItem) {
          return {};
        }

        const possibleValues = firstPage.filter((possibleValue) => {
          const verticalOffSet = Math.abs(
            possibleValue.polygon.topLeft.y -
              placeHolderPdfItem.polygon.topLeft.y,
          );

          const maxAllowedOffSet = 3;

          if (verticalOffSet > maxAllowedOffSet) {
            return false;
          }

          if (
            placeHolderPdfItem.polygon.topLeft.x >=
            possibleValue.polygon.topLeft.x
          ) {
            return false;
          }

          return true;
        });

        if (possibleValues.length === 0) {
          return {};
        }

        const value = possibleValues.reduce((smallest, current) => {
          if (current.polygon.topLeft.x < smallest.polygon.topLeft.x) {
            return current;
          } else {
            return smallest;
          }
        });

        return { [placeHolder.replace(':', '')]: value.text };
      })
      .reduce((acc, obj) => ({ ...acc, ...obj }), {});
  }

  private extractCnisSocialSecurityRelationFromPdfData(
    rawPdfJsonData: RawPdfJsonType,
  ): Array<RawCnisSocialSecurityRelationInterface> {
    const perPageFilteredRelationItems: PdfItemInterface[][] =
      rawPdfJsonData.map((pageItems) => {
        const titleItem = this.findOneByWord(
          pageItems,
          'Relações Previdenciárias',
        );

        const footerItem =
          this.findOneByWord(pageItems, 'Legenda de Indicadores') ??
          this.findOneByWord(
            pageItems,
            'O INSS poderá rever a qualquer tempo%',
          );

        if (!titleItem || !footerItem) {
          return [];
        }

        return pageItems
          .filter((candidate) => {
            const isBetweenTitleAndFooter =
              candidate.polygon.topLeft.y > titleItem.polygon.topLeft.y &&
              candidate.polygon.topLeft.y < footerItem.polygon.topLeft.y;

            return isBetweenTitleAndFooter;
          })
          .sort((a, b) => a.polygon.topLeft.y - b.polygon.topLeft.y);
      });

    const verticallyStitchedPages: PdfItemInterface[][] = [];
    perPageFilteredRelationItems.forEach((currentPageItems) => {
      const previousAdjustedPage =
        verticallyStitchedPages[verticallyStitchedPages.length - 1];

      if (previousAdjustedPage) {
        const lastItemOfPreviousPage =
          previousAdjustedPage[previousAdjustedPage.length - 1];

        currentPageItems = currentPageItems.map((currentItem) => {
          if (lastItemOfPreviousPage) {
            currentItem.polygon.topLeft.y =
              currentItem.polygon.topLeft.y +
              lastItemOfPreviousPage.polygon.bottomLeft.y;
            currentItem.polygon.topRight.y =
              currentItem.polygon.topRight.y +
              lastItemOfPreviousPage.polygon.bottomLeft.y;
            currentItem.polygon.bottomLeft.y =
              currentItem.polygon.bottomLeft.y +
              lastItemOfPreviousPage.polygon.bottomLeft.y;
            currentItem.polygon.bottomRight.y =
              currentItem.polygon.bottomRight.y +
              lastItemOfPreviousPage.polygon.bottomLeft.y;
          }
          return currentItem;
        });
      }

      const consolidatedValuesByYear = this.findOneByWord(
        currentPageItems,
        'Valores Consolidados por Ano Civil',
      );

      if (consolidatedValuesByYear) {
        currentPageItems = currentPageItems.filter((item) => {
          if (
            item.polygon.topLeft.y >= consolidatedValuesByYear.polygon.topLeft.y
          ) {
            return false;
          }
          return true;
        });
      }

      verticallyStitchedPages.push(currentPageItems);
    });

    const allRelationItems = verticallyStitchedPages.flat();

    const sequenceMarkers = this.findManyByWord(allRelationItems, 'Seq.');

    return sequenceMarkers.map((currentSeqMarker, seqIndex) => {
      const headerRowColumns = allRelationItems
        .filter((candidate) => {
          if (
            candidate.polygon.topLeft.y === currentSeqMarker.polygon.topLeft.y
          ) {
            return true;
          }
          return false;
        })
        .sort((a, b) => a.polygon.topLeft.x - b.polygon.topLeft.x);
      const mergedHeaderRowColumns = this.mergeHeaderColumnsWithUpperLabels(
        allRelationItems,
        headerRowColumns,
      );
      const indicatorsValueItem = this.findIndicatorsValueForHeader(
        allRelationItems,
        mergedHeaderRowColumns,
      );

      const nextSeqMarker = sequenceMarkers[seqIndex + 1];
      let nextHeaderRowColumns: PdfItemInterface[] | undefined;
      let mergedNextHeaderRowColumns: PdfItemInterface[] | undefined;

      if (nextSeqMarker) {
        nextHeaderRowColumns = allRelationItems
          .filter((candidate) => {
            if (
              candidate.polygon.topLeft.y === nextSeqMarker.polygon.topLeft.y
            ) {
              return true;
            }
            return false;
          })
          .sort((a, b) => a.polygon.topLeft.x - b.polygon.topLeft.x);

        mergedNextHeaderRowColumns = this.mergeHeaderColumnsWithUpperLabels(
          allRelationItems,
          nextHeaderRowColumns,
        );
      }

      const highestVerticalHeaderRowColumnFromNextHeaderRowColumns =
        mergedNextHeaderRowColumns
          ? mergedNextHeaderRowColumns.reduce((prev, current) => {
              return prev.polygon.topLeft.y < current.polygon.topLeft.y
                ? prev
                : current;
            })
          : undefined;

      const remunerationsTitle = this.findManyByWord(
        allRelationItems,
        'Remunerações',
      ).find((item) => {
        if (item.polygon.topLeft.y < currentSeqMarker.polygon.topLeft.y) {
          return false;
        }
        if (
          nextSeqMarker &&
          item.polygon.topLeft.y > nextSeqMarker.polygon.topLeft.y
        ) {
          return false;
        }
        return true;
      });

      const contributionsTitle = this.findManyByWord(
        allRelationItems,
        'Contribuições',
      ).find((item) => {
        if (item.polygon.topLeft.y < currentSeqMarker.polygon.topLeft.y) {
          return false;
        }
        if (
          nextSeqMarker &&
          item.polygon.topLeft.y > nextSeqMarker.polygon.topLeft.y
        ) {
          return false;
        }
        return true;
      });

      const bottomVerticalBoundary: PdfItemInterface | undefined =
        indicatorsValueItem ??
        remunerationsTitle ??
        contributionsTitle ??
        nextSeqMarker;

      const socialSecurityAffiliationInfo = mergedHeaderRowColumns
        .map((headerColumn, headerColumnIndex) => {
          const columnValues = allRelationItems.filter((possibleValue) => {
            if (
              possibleValue.polygon.bottomLeft.y ===
              headerColumn.polygon.bottomLeft.y
            ) {
              return false;
            }

            if (
              possibleValue.polygon.topLeft.y <= headerColumn.polygon.topLeft.y
            ) {
              return false;
            }

            if (
              bottomVerticalBoundary &&
              possibleValue.polygon.topLeft.y >=
                bottomVerticalBoundary.polygon.topLeft.y
            ) {
              return false;
            }

            const headerCenterX =
              headerColumn.polygon.topLeft.x + headerColumn.geometry.width / 2;
            const valueCenterX =
              possibleValue.polygon.topLeft.x +
              possibleValue.geometry.width / 2;
            const xOffset = Math.abs(headerCenterX - valueCenterX);
            const isPossibleValuesAlignedWithHeaderColumn = xOffset < 1;

            if (isPossibleValuesAlignedWithHeaderColumn) {
              return true;
            }

            const nextHeaderColumn =
              mergedHeaderRowColumns[headerColumnIndex + 1];
            const prevHeaderColumn =
              mergedHeaderRowColumns[headerColumnIndex - 1];

            if (nextHeaderColumn) {
              const middleXBetweenColumns =
                (headerColumn.polygon.topRight.x +
                  nextHeaderColumn.polygon.topLeft.x) /
                2;

              if (possibleValue.polygon.topLeft.x >= middleXBetweenColumns) {
                return false;
              }

              if (
                possibleValue.polygon.topRight.x >
                nextHeaderColumn.polygon.topLeft.x
              ) {
                return false;
              }
            }

            if (prevHeaderColumn) {
              const middleXBetweenColumns =
                (prevHeaderColumn.polygon.topRight.x +
                  headerColumn.polygon.topLeft.x) /
                2;

              if (possibleValue.polygon.topLeft.x <= middleXBetweenColumns) {
                return false;
              }

              if (
                possibleValue.polygon.topLeft.y <
                prevHeaderColumn.polygon.topLeft.x
              ) {
                return false;
              }
            }

            return true;
          });

          return {
            [headerColumn.text]: String(
              columnValues.map((v) => v.text).join(' '),
            ),
          };
        })
        .reduce(
          (acc, cur) => ({ ...acc, ...cur }),
          {} as Record<string, string>,
        );

      if (indicatorsValueItem) {
        socialSecurityAffiliationInfo['Indicadores'] = indicatorsValueItem.text;
      }

      let socialSecurityAffiliationEarningsHistory: { [x: string]: string }[] =
        [];

      const bodySectionTitle = contributionsTitle ?? remunerationsTitle;

      if (bodySectionTitle) {
        const competenceHeader = allRelationItems.find((item) => {
          if (item.text !== 'Competência') {
            return false;
          }

          if (item.polygon.topLeft.y < bodySectionTitle.polygon.topLeft.y) {
            return false;
          }

          if (
            nextSeqMarker &&
            item.polygon.topLeft.y > nextSeqMarker.polygon.topLeft.y
          ) {
            return false;
          }

          return true;
        });

        if (competenceHeader) {
          const bodyColumns = allRelationItems
            .filter((item) => {
              if (
                item.polygon.topLeft.y === competenceHeader.polygon.topLeft.y
              ) {
                return true;
              }
              return false;
            })
            .sort((a, b) => a.polygon.topLeft.x - b.polygon.topLeft.x);

          const bodyColumnNameOccurrences: string[] = [];

          const bodyColumnsValueMap = bodyColumns
            .map((bodyColumn, bodyColumnIndex) => {
              const bodyColumnValues = allRelationItems.filter(
                (possibleValue) => {
                  if (
                    bodyColumn.polygon.topLeft.y >=
                    possibleValue.polygon.topLeft.y
                  ) {
                    return false;
                  }

                  if (
                    nextSeqMarker &&
                    possibleValue.polygon.topLeft.y >
                      nextSeqMarker.polygon.topLeft.y
                  ) {
                    return false;
                  }

                  if (highestVerticalHeaderRowColumnFromNextHeaderRowColumns) {
                    if (
                      possibleValue.polygon.topLeft.y >=
                      highestVerticalHeaderRowColumnFromNextHeaderRowColumns
                        .polygon.topLeft.y
                    ) {
                      return false;
                    }
                  }

                  const prevBodyColumn = bodyColumns[bodyColumnIndex - 1];
                  const nextBodyColumn = bodyColumns[bodyColumnIndex + 1];

                  if (prevBodyColumn) {
                    const middleXBetweenColumns =
                      (prevBodyColumn.polygon.topRight.x +
                        bodyColumn.polygon.topLeft.x) /
                      2;

                    if (
                      possibleValue.polygon.topLeft.x < middleXBetweenColumns
                    ) {
                      return false;
                    }
                  }

                  if (nextBodyColumn) {
                    const middleXBetweenColumns =
                      (bodyColumn.polygon.topRight.x +
                        nextBodyColumn.polygon.topLeft.x) /
                      2;

                    if (
                      possibleValue.polygon.topLeft.x > middleXBetweenColumns
                    ) {
                      return false;
                    }
                  }

                  return true;
                },
              );

              const occurrencesWithSamePrefix =
                bodyColumnNameOccurrences.filter((name) =>
                  name.startsWith(bodyColumn.text),
                ).length;

              bodyColumnNameOccurrences.push(bodyColumn.text);

              return {
                [`${bodyColumn.text}__${occurrencesWithSamePrefix}`]:
                  bodyColumnValues,
              };
            })
            .reduce(
              (acc, cur) => ({ ...acc, ...cur }),
              {} as Record<string, PdfItemInterface[]>,
            );

          const bodyColumnNames = Object.keys(bodyColumnsValueMap);
          const competenceColumnKey = bodyColumnNames.find((key) =>
            key.startsWith('Competência'),
          );
          const competenceColumnValues: PdfItemInterface[] =
            competenceColumnKey !== undefined
              ? (bodyColumnsValueMap[competenceColumnKey] as PdfItemInterface[])
              : [];

          const rawRelationHistory = competenceColumnValues.map(
            (_, competenceCellIndex) => {
              return bodyColumnNames
                .map((currentColumnName) => {
                  const currentColumnValues = bodyColumnsValueMap[
                    currentColumnName
                  ] as PdfItemInterface[];

                  const selectedValuesOnSameLine = currentColumnValues.filter(
                    (currentValue) => {
                      const prevCompetenceCell =
                        competenceColumnValues[competenceCellIndex - 1];
                      const nextCompetenceCell =
                        competenceColumnValues[competenceCellIndex + 1];

                      if (prevCompetenceCell) {
                        if (
                          currentValue.polygon.topLeft.y <=
                          prevCompetenceCell.polygon.bottomLeft.y
                        ) {
                          return false;
                        }
                      }

                      if (nextCompetenceCell) {
                        if (
                          currentValue.polygon.bottomLeft.y >
                          nextCompetenceCell.polygon.topLeft.y
                        ) {
                          return false;
                        }
                      }

                      return true;
                    },
                  );

                  return {
                    [currentColumnName]: selectedValuesOnSameLine
                      .map((it) => it.text)
                      .join(' '),
                  };
                })
                .reduce((acc, cur) => ({ ...acc, ...cur }), {});
            },
          );

          socialSecurityAffiliationEarningsHistory = rawRelationHistory.flatMap(
            (row) => {
              const groupMapByIndex = new Map<string, Map<string, string>>();

              Object.keys(row).forEach((keyWithIndex) => {
                const [cleanKey, strictIndex] = keyWithIndex.split('__');

                if (cleanKey === undefined || strictIndex === undefined) {
                  return;
                }

                const groupKey = `__${strictIndex}`;

                if (!groupMapByIndex.has(groupKey)) {
                  groupMapByIndex.set(groupKey, new Map());
                }

                const groupMap = groupMapByIndex.get(groupKey);
                groupMap?.set(cleanKey, row[keyWithIndex] ?? '');
              });

              return Array.from(groupMapByIndex.values())
                .map((group) => {
                  return Object.fromEntries(group);
                })
                .filter((group) => {
                  return Object.values(group).some(
                    (value) => value.trim() !== '',
                  );
                });
            },
          );
        }
      }

      return {
        socialSecurityAffiliationInfo,
        socialSecurityAffiliationEarningsHistory,
      };
    });
  }

  private findIndicatorsValueForHeader(
    pageItems: PdfItemInterface[],
    relationHeaderColumns: PdfItemInterface[],
  ): PdfItemInterface | undefined {
    let indicatorsValueItem: PdfItemInterface | undefined;

    pageItems.forEach((pageItem) => {
      const isIndicatorsTitle = pageItem.text.trim().startsWith('Indicadores');
      if (!isIndicatorsTitle) {
        return false;
      }

      const firstHeaderColumn = relationHeaderColumns[0];

      if (firstHeaderColumn) {
        const verticalDistanceFromHeader =
          pageItem.polygon.topLeft.y - firstHeaderColumn.polygon.topLeft.y;

        const indicatorsTitleVerticalRangeMin = 28;
        const indicatorsTitleVerticalRangeMax = 33;

        const isValidIndicatorsTitle =
          verticalDistanceFromHeader > indicatorsTitleVerticalRangeMin &&
          verticalDistanceFromHeader < indicatorsTitleVerticalRangeMax;

        if (!isValidIndicatorsTitle) {
          return false;
        }
      }

      indicatorsValueItem = pageItems.find((candidateValueItem) => {
        if (candidateValueItem.text.trim() === '') {
          return false;
        }
        const isOnSameLine =
          candidateValueItem.polygon.topLeft.y === pageItem.polygon.topLeft.y;
        if (!isOnSameLine) {
          return false;
        }
        const isAfterTitle =
          candidateValueItem.polygon.topLeft.x > pageItem.polygon.topRight.x;
        if (!isAfterTitle) {
          return false;
        }
        return true;
      });

      return true;
    });

    return indicatorsValueItem;
  }

  private mergeHeaderColumnsWithUpperLabels(
    pageItems: PdfItemInterface[],
    headerRowItems: PdfItemInterface[],
  ): PdfItemInterface[] {
    return headerRowItems.map((headerItem) => {
      const upperLabel = pageItems.find((candidate) => {
        const wider =
          candidate.geometry.width > headerItem.geometry.width
            ? candidate
            : headerItem;
        const narrower =
          candidate.geometry.width > headerItem.geometry.width
            ? headerItem
            : candidate;

        const isInSameColumn =
          wider.polygon.topLeft.x < narrower.polygon.topLeft.x &&
          wider.polygon.topRight.x > narrower.polygon.topRight.x;

        if (!isInSameColumn) {
          return false;
        }

        const verticalDistance =
          headerItem.polygon.topLeft.y - candidate.polygon.topLeft.y;

        const verticalDistanceMinThreshold = 9;
        const verticalDistanceMaxThreshold = 10;

        if (
          verticalDistance < verticalDistanceMaxThreshold &&
          verticalDistance > verticalDistanceMinThreshold
        ) {
          return true;
        }

        return false;
      });

      if (!upperLabel) {
        return this.clonePdfItem(headerItem);
      }

      const merged = this.clonePdfItem(headerItem);

      if (upperLabel.geometry.width > merged.geometry.width) {
        merged.geometry.width = upperLabel.geometry.width;

        merged.polygon.topLeft.x = upperLabel.polygon.topLeft.x;
        merged.polygon.topRight.x = upperLabel.polygon.topRight.x;
        merged.polygon.bottomLeft.x = upperLabel.polygon.bottomLeft.x;
        merged.polygon.bottomRight.x = upperLabel.polygon.bottomRight.x;
      }
      merged.polygon.topLeft.y = upperLabel.polygon.topLeft.y;
      merged.polygon.topRight.y = upperLabel.polygon.topRight.y;

      merged.geometry.height =
        merged.geometry.height + upperLabel.geometry.height;

      merged.text = upperLabel.text + ' ' + merged.text;

      return merged;
    });
  }

  private clonePdfItem(item: PdfItemInterface): PdfItemInterface {
    return {
      ...item,
      geometry: { ...item.geometry },
      polygon: {
        topLeft: { ...item.polygon.topLeft },
        topRight: { ...item.polygon.topRight },
        bottomLeft: { ...item.polygon.bottomLeft },
        bottomRight: { ...item.polygon.bottomRight },
      },
    };
  }
}
