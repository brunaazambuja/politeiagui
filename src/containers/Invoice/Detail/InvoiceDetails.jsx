import React, { useState, memo } from "react";
import { Spinner, Text, H4, Table, Link as UiLink } from "pi-ui";
import Link from "src/components/Link";
import { useInvoices } from "./hooks";
import { formatCentsToUSD } from "src/utils";
import useAdminInvoices from "src/hooks/api/useAdminInvoices";
import styles from "./Detail.module.css";

const headers = ["Date", "Invoice", "Total (USD)"];

const printInvoiceInfo = ({
  total,
  censorshiprecord: { token },
  input: { month, year }
}) => ({
  Date: `${month}/${year}`,
  Invoice: (
    <Link to={`/invoices/${token}`} className={styles.invoiceLinkWrapper}>
      <Text color="primary">{token.substring(0, 7)}</Text>
    </Link>
  ),
  "Total (USD)": formatCentsToUSD(total)
});

const FetchInvoices = () => {
  const { loading } = useAdminInvoices();
  return loading ? <Spinner /> : null;
};

const InvoiceDetails = ({ token, userid, start, end }) => {
  const [showStats, setShowStats] = useState(false);
  const toggleShowStats = () => setShowStats(!showStats);
  const { invoices } = useInvoices(token, userid, start, end);
  const shouldPrintTable = showStats && invoices && invoices.length > 0;
  const shouldPrintEmptyMessage = invoices && invoices.length === 0;
  return (
    <>
      <div className={styles.titleLinkWrapper}>
        <H4>Past 3 months invoices</H4>
        {!invoices && <FetchInvoices />}
        <UiLink className={styles.uilink} onClick={toggleShowStats}>
          {shouldPrintEmptyMessage ? "" : showStats ? "Hide" : "Show"}
        </UiLink>
      </div>
      {shouldPrintTable ? (
        <Table headers={headers} data={invoices.map(printInvoiceInfo)} />
      ) : (
        shouldPrintEmptyMessage && (
          <Text>No invoices for the past 3 months</Text>
        )
      )}
    </>
  );
};

export default memo(InvoiceDetails);
