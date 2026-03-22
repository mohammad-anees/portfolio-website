'use client'

import { ArrowLeftIcon, ArrowRightIcon, ExternalLink, Loader } from 'lucide-react';
import { useState, useRef, useEffect, ComponentType } from 'react';
import type { DocumentProps, PageProps } from 'react-pdf';
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';

interface PDFViewerProps {
    source: string
}

interface PdfComponents {
    Document: ComponentType<DocumentProps>
    Page: ComponentType<PageProps>
}

const PDFViewer = ({ source }: PDFViewerProps) => {
    const [pdf, setPdf] = useState<PdfComponents | null>(null);
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [docProgress, setDocProgress] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        import('react-pdf').then(({ Document, Page, pdfjs }) => {
            import('react-pdf/dist/Page/AnnotationLayer.css' as never);
            import('react-pdf/dist/Page/TextLayer.css' as never);
            pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
            setPdf({ Document, Page });
        });
    }, []);

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
        setDocProgress(100);
    }

    function goToPage(next: number) {
        setIsPageLoading(true);
        setPageNumber(next);
    }

    const isLoading = !pdf || isPageLoading;
    const showDeterminate = docProgress > 0 && docProgress < 100;
    const pageWidth = containerWidth || undefined;
    const prevPage = pageNumber - 1;
    const nextPage = pageNumber + 1;

    return (
        <div className="flex w-full">
            <div ref={containerRef} className="w-full overflow-hidden space-y-1.5">
                {(!pdf || showDeterminate || isLoading) && (
                    <Progress
                        value={showDeterminate ? docProgress : 0}
                        className="h-1 w-9/10 rounded-none my-4 mx-auto"
                    />
                )}
                <div className="relative w-full overflow-hidden rounded-t-xl">
                    {pdf && (
                        <pdf.Document
                            file={source}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadProgress={({ loaded, total }) => setDocProgress(Math.round(loaded / total * 100))}
                            loading={null}
                        >
                            <pdf.Page
                                pageNumber={pageNumber}
                                width={pageWidth}
                                onRenderSuccess={() => setIsPageLoading(false)}
                            />
                            {prevPage >= 1 && (
                                <div className="hidden">
                                    <pdf.Page pageNumber={prevPage} width={pageWidth} />
                                </div>
                            )}
                            {nextPage <= numPages && (
                                <div className="hidden">
                                    <pdf.Page pageNumber={nextPage} width={pageWidth} />
                                </div>
                            )}
                        </pdf.Document>
                    )}
                </div>

                <div className="flex justify-between px-4 pb-1.5">
                    <ButtonGroup>
                        <ButtonGroup>
                            <Button
                                variant="outline"
                                onClick={() => goToPage(pageNumber - 1)} disabled={pageNumber === 1}>
                                <ArrowLeftIcon />
                            </Button>
                            <Button variant="outline" disabled>
                                {!isLoading ? <>{pageNumber} / {numPages}</> : <Loader className="animate-spin" />}
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
