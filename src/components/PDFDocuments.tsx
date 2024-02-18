// PDFDocument.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 28,
    fontSize: 12,
    fontWeight: 400,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
  },
  adress: {
    flexDirection: "column",
    fontSize: 12,
  },
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateNumberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    padding: 4,
    borderBottom: 2,
    marginBottom: 36,
  },
  sousTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    padding: 4,
    borderBottom: 2,
    marginBottom: 12,
    marginLeft: "15%",
  },
  CompagnyInfo: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 8,
  },
  info: {
    flexDirection: "row",
    gap: 4,
  },
  taxesBox: {
    justifyContent: "center",
    marginLeft: "30%",
    marginRight: "20%",

    gap: 4,
  },
  footer: {},
});

interface InvoiceFormData {
  myCompanyName: string;
  myAddress: string;
  myZipCode: string;
  myProvince: string;
  invoiceDate: string;
  invoiceNumber: string;
  clientCompanyName: string;
  clientAddress: string;
  clientZipCode: string;
  clientProvince: string;
  project: string;
  phone: string;
  email: string;
  description: string;
  amountBeforeTaxes: number;
  TPSNumber: string;
  TVQNumber: string;
}

const PDFDocument: React.FC<{ data: InvoiceFormData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Use data from props to dynamically set values */}
      <View style={styles.headers}>
        <Text style={{ fontSize: 24 }}>{data.myCompanyName}</Text>
        <View style={styles.adress}>
          <Text>{data.myAddress}</Text>
          <Text>{data.myZipCode}</Text>
          <Text>{data.myProvince}</Text>
        </View>
      </View>

      <View style={styles.dateNumberRow}>
        <Text>Date: {data.invoiceDate}</Text>
        <Text>Facture # {data.invoiceNumber}</Text>
      </View>

      {/* Client information */}
      <View style={styles.CompagnyInfo}>
        <View>
          <Text style={{ fontSize: 16 }}>{data.clientCompanyName}</Text>
          <View style={styles.adress}>
            <Text>{data.clientAddress}</Text>
            <Text>{data.clientZipCode}</Text>
            <Text>{data.clientProvince}</Text>
          </View>
        </View>

        {/* Project, Phone, Email */}
        <View style={{ gap: 4 }}>
          <View style={styles.info}>
            <Text>Project: {data.project}</Text>
          </View>
          <View style={styles.info}>
            <Text>Téléphone: {data.phone}</Text>
          </View>
          <View style={styles.info}>
            <Text>Email: {data.email}</Text>
          </View>
        </View>
      </View>

      {/* Description and Amount */}
      <View style={styles.dateNumberRow}>
        <Text>Description</Text>
        <Text>Total</Text>
      </View>
      <View style={styles.CompagnyInfo}>
        <Text>{data.description}</Text>
        <Text>{`$${data.amountBeforeTaxes.toFixed(2)}`}</Text>
      </View>

      {/* Taxes and Total */}
      <View style={styles.footer}>
        {/* Subtotal, Taxes, and Total */}
        <View style={styles.sousTotal}>
          <Text>Subtotal</Text>
          <Text>{`$${data.amountBeforeTaxes.toFixed(2)}`}</Text>
        </View>

        {/* Dynamically calculate taxes based on subtotal */}
        <View style={styles.taxesBox}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>TPS:</Text>
            <Text>{`$${(data.amountBeforeTaxes * 0.05).toFixed(2)}`}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>TVQ :</Text>
            <Text>{`$${(data.amountBeforeTaxes * 0.09975).toFixed(2)}`}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginLeft: "60%",
            marginTop: 18,
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <Text>Total taxes incluese:</Text>
          <Text>{`$${(
            data.amountBeforeTaxes +
            data.amountBeforeTaxes * 0.05 +
            data.amountBeforeTaxes * 0.09975
          ).toFixed(2)}`}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>TPS#: {data.TPSNumber}</Text>
          <Text>TVQ#: {data.TVQNumber}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
