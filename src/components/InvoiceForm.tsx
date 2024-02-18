import { FC, useEffect, useState } from "react";
import {
  TextInput,
  NumberInput,
  Textarea,
  Group,
  Box,
  Paper,
  Title,
  Space,
  Divider,
  Grid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocuments";

interface InvoiceFormProps {}

const InvoiceForm: FC<InvoiceFormProps> = () => {
  const form = useForm({
    initialValues: {
      myCompanyName: "",
      myAddress: "",
      myZipCode: "",
      myProvince: "",
      invoiceDate: "",
      invoiceNumber: uuidv4(), // Generate unique ID for each form instance
      clientCompanyName: "",
      clientAddress: "",
      clientZipCode: "",
      clientProvince: "",
      project: "",
      phone: "",
      email: "",
      description: "",
      amountBeforeTaxes: 0,
      TPSNumber: "",
      TVQNumber: "",
    },
  });

  useEffect(() => {
    // Automatically generate a new invoice number each time the component mounts
    form.setFieldValue("invoiceNumber", uuidv4());
  }, []);
  const [tps, setTps] = useState(0);
  const [tvq, setTvq] = useState(0);
  const [totalIncludingTaxes, setTotalIncludingTaxes] = useState(0);

  useEffect(() => {
    const TPSRate = 0.05;
    const TVQRate = 0.09975;
    const amountBeforeTaxes =
      parseFloat(String(form.values.amountBeforeTaxes)) || 0; // Fallback to 0 if input is invalid

    const calculatedTPS = amountBeforeTaxes * TPSRate;
    const calculatedTVQ = amountBeforeTaxes * TVQRate;
    const total = amountBeforeTaxes + calculatedTPS + calculatedTVQ;

    setTps(calculatedTPS);
    setTvq(calculatedTVQ);
    setTotalIncludingTaxes(total);
  }, [form.values.amountBeforeTaxes]);
  // Inside your InvoiceForm component, at the end before the return statement
  const pdfProps = {
    myCompanyName: form.values.myCompanyName,
    myAddress: form.values.myAddress,
    myZipCode: form.values.myZipCode,
    myProvince: form.values.myProvince,
    invoiceDate: form.values.invoiceDate,
    invoiceNumber: form.values.invoiceNumber,
    clientCompanyName: form.values.clientCompanyName,
    clientAddress: form.values.clientAddress,
    clientZipCode: form.values.clientZipCode,
    clientProvince: form.values.clientProvince,
    project: form.values.project,
    phone: form.values.phone,
    email: form.values.email,
    description: form.values.description,
    amountBeforeTaxes: form.values.amountBeforeTaxes,
    TPSNumber: form.values.TPSNumber,
    TVQNumber: form.values.TVQNumber,
    // Add all other form values here
  };

  return (
    <Box style={{ maxWidth: 800 }} mx="auto">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={3}>Invoice Form</Title>
        <Text>Invoice Number: {form.values.invoiceNumber}</Text>
        <Space h="md" />
        <form>
          {/* My Company Information */}
          <TextInput
            label="My Company Name"
            {...form.getInputProps("myCompanyName")}
          />
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="My Address"
                {...form.getInputProps("myAddress")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                label="Zip Code"
                {...form.getInputProps("myZipCode")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                label="Province"
                {...form.getInputProps("myProvince")}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="My TPS #"
                {...form.getInputProps("TPSNumber")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="My TVQ #"
                {...form.getInputProps("TVQNumber")}
              />
            </Grid.Col>
          </Grid>

          {/* Invoice Details */}
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                type="date"
                label="Invoice Date"
                placeholder="Pick date"
                {...form.getInputProps("invoiceDate")}
                onChange={(event) =>
                  form.setFieldValue("invoiceDate", event.currentTarget.value)
                }
                value={form.values.invoiceDate}
              />
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>
          </Grid>
          <Divider label="Client Information" labelPosition="center" />

          {/* Client's Company Information */}
          <TextInput
            label="Client's Company Name"
            {...form.getInputProps("clientCompanyName")}
          />
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Client's Address"
                {...form.getInputProps("clientAddress")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                label="Zip Code"
                {...form.getInputProps("clientZipCode")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                label="Province"
                {...form.getInputProps("clientProvince")}
              />
            </Grid.Col>
          </Grid>

          {/* Project Details */}
          <Grid>
            <Grid.Col span={6}>
              <TextInput label="Project" {...form.getInputProps("project")} />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput label="Phone" {...form.getInputProps("phone")} />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput label="Email" {...form.getInputProps("email")} />
            </Grid.Col>
          </Grid>

          {/* Description and Amount */}
          <Textarea
            label="Description"
            {...form.getInputProps("description")}
          />
          <NumberInput
            label="Amount Before Taxes"
            {...form.getInputProps("amountBeforeTaxes")}
          />

          {/* Tax Numbers */}
        </form>
        <Group mt="md">
          <Box>
            <Title order={4}>TPS: ${tps.toFixed(2)}</Title>
            <Title order={4}>TVQ: ${tvq.toFixed(2)}</Title>
            <Title order={4}>
              Total Including Taxes: ${totalIncludingTaxes.toFixed(2)}
            </Title>
          </Box>
        </Group>
        <PDFDownloadLink
          document={<PDFDocument data={pdfProps} />}
          fileName={`Invoice_${form.values.invoiceNumber}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Preparing document..." : "Download Invoice PDF"
          }
        </PDFDownloadLink>
      </Paper>
    </Box>
  );
};

export default InvoiceForm;
