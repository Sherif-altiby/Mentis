import "./PdfViewer.scss";

const PdfViewerComponent = () => {
  const pdfUrl =
    "http://127.0.0.1:8000/storage/files/57R3Y8PkV9bT9v5tEGYZaWUB9fzqCPoP2vs6qEuX.pdf";

  return (
    <div className="note-pdf">
      <iframe src={pdfUrl} title="PDF Viewer" />
    </div>
  );
};

export default PdfViewerComponent;
