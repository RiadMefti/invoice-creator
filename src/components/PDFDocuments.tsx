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
    justifyContent:"space-between",
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
  footer: {
    
  },
});

const PDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headers}>
        <Text style={{ fontSize: 24 }}>Riad Mefti</Text>
        <View style={styles.adress}>
          {" "}
          <Text>1234 Street Name</Text>
          <Text>H1S-2W4</Text>
          <Text>Qc Canada</Text>
        </View>
      </View>
      <View style={styles.dateNumberRow}>
        <Text>Date: 30 septembre 2024</Text>
        <Text>Facture # 12344512</Text>
      </View>
      <View style={styles.CompagnyInfo}>
        <View>
          {" "}
          <Text style={{ fontSize: "16", marginBottom: 6 }}>
            Nom entreprise
          </Text>
          <View style={styles.adress}>
            {" "}
            <Text>1234 Street Name</Text>
            <Text>H1S-2W4</Text>
            <Text>Qc Canada</Text>
          </View>
        </View>
        <View
          style={{
            gap: 4,
          }}
        >
          <View style={styles.info}>
            <Text style={styles.title}>Project:</Text>
            <Text>Creation d un site web</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>Téléphone:</Text>
            <Text>514-593-6036</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>Email:</Text>
            <Text>test@test.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.dateNumberRow}>
        <Text>Description</Text>
        <Text>Total</Text>
      </View>
      <View style={styles.CompagnyInfo}>
        <Text style={{ maxWidth: "70%" }}>
          Ceci est un description du produit acheté. Je veux pouvoir remapper
          mon site pour qu'il soit magnifique. De ce fait je veux pouvoir etre
          en mesure de manger plen de chocolat
        </Text>
        <Text>1000$</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.sousTotal}>
          <Text>Subtotal</Text>
          <Text>1000$</Text>
        </View>
        <View style={styles.taxesBox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>TPS</Text>
            <Text>5%</Text>
            <Text>100,23$</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>TVQ</Text>
            <Text>9.975%</Text>
            <Text>300,23$</Text>
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
          <Text style={{ fontSize: 16 }}>1400$</Text>
        </View>{" "}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>TPS #1238123</Text>
          <Text>TVQ #1238123</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
