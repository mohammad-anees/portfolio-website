import PDFViewer from "@/app/components/shared/pdfViewer"
import { Card, CardContent } from "@/components/ui/card"


const YearOne = () => {
    const filePath = 'https://ywzfzv7xrdltbggr.public.blob.vercel-storage.com/assets/year-one.pdf'

    return (
        <div className="py-4 w-full max-w-2xl mx-auto px-4">
            <Card className="py-0">
                <CardContent className="px-0">
                    <PDFViewer source={filePath} />
                </CardContent>
            </Card>
        </div>
    )
}

export default YearOne
