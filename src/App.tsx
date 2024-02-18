import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./components/PDFDocuments";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  return (
    <InvoiceForm />
  );
}

export default App;
