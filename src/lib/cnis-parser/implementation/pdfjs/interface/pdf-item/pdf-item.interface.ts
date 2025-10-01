import type { PdfItemGeometryInterface } from '@lib/cnis-parser/implementation/pdfjs/interface/pdf-item/pdf-item-geometry.interface';
import type { PdfItemPolygonInterface } from '@lib/cnis-parser/implementation/pdfjs/interface/pdf-item/pdf-item-polygon.interface';

export interface PdfItemInterface {
  text: string;
  polygon: PdfItemPolygonInterface;
  geometry: PdfItemGeometryInterface;
  page: number;
}
