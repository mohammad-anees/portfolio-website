import PDFViewer from "@/app/components/shared/pdfViewer"
import { Card, CardContent } from "@/components/ui/card"

const YearTwo = () => {
    const filePath = 'https://ywzfzv7xrdltbggr.public.blob.vercel-storage.com/assets/year-two.pdf'

    return (
        <div className="py-4 w-full max-w-2xl mx-auto px-4">
            <Card>
                <CardContent>
                    <PDFViewer source={filePath} />
                </CardContent>
            </Card>
        </div>
    )
}

export default YearTwo
