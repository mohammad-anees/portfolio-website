'use client'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { ArrowLeftIcon, ArrowRightIcon, ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    source: string
}

const PDFViewer = ({ source }: PDFViewerProps) => {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => {
            setContainerWidth(entries[0].contentRect.width);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    function goToPage(next: number) {
        setIsPageLoading(true);
        setPageNumber(next);
    }

    const pageWidth = containerWidth || undefined;
    const prevPage = pageNumber - 1;
    const nextPage = pageNumber + 1;

    return (
        <div className="flex w-full">
            <div ref={containerRef} className="w-full overflow-hidden space-y-1.5">
                <Document file={source} onLoadSuccess={onDocumentLoadSuccess}>
                    <div className="relative">
                        {isPageLoading && (
                            <Skeleton
                                className="absolute inset-0 z-10"
                                style={{ height: containerWidth ? containerWidth * 1.414 : 600 }}
                            />
                        )}
                        <Page
                            pageNumber={pageNumber}
                            width={pageWidth}
                            onRenderSuccess={() => setIsPageLoading(false)}
                        />
                    </div>

                    {prevPage >= 1 && (
                        <div className="hidden">
                            <Page pageNumber={prevPage} width={pageWidth} />
                        </div>
                    )}
                    {nextPage <= numPages && (
                        <div className="hidden">
                            <Page pageNumber={nextPage} width={pageWidth} />
                        </div>
                    )}
                </Document>

                <div className="flex justify-between">
                    <ButtonGroup>
                        <ButtonGroup>
                            <Button
                                variant="outline"
                                onClick={() => goToPage(pageNumber - 1)} disabled={pageNumber === 1}>
                                <ArrowLeftIcon />
                            </Button>
                            <Button variant="outline" disabled>
                                {pageNumber}/{numPages}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => goToPage(pageNumber + 1)} disabled={pageNumber === numPages}>
                                <ArrowRightIcon />
                            </Button>
                        </ButtonGroup>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="ghost">
                            <Link href={source} target='_blank'><ExternalLink /></Link>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}

export default PDFViewer
