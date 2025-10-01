import type { PdfItemPolygonCoordinatesInterface } from '@lib/cnis-processor/implementation/pdfjs/interface/pdf-item/pdf-item-polygon-coordinates.interface';

export interface PdfItemPolygonInterface {
  topLeft: PdfItemPolygonCoordinatesInterface;
  topRight: PdfItemPolygonCoordinatesInterface;
  bottomRight: PdfItemPolygonCoordinatesInterface;
  bottomLeft: PdfItemPolygonCoordinatesInterface;
}
