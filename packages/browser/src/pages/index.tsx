import { Coding } from "@bonfhir/core/r5";
import styles from "./index.module.css";
import { FC, useState } from "react";
import SearchForm from "../components/SearchForm";

const jsonUrl = (coding: Coding) => {
  return `/CodeSystem/$lookup?system=${coding.system}&code=${coding.code}&_format=json`;
};

const xmlUrl = (coding: Coding) => {
  return `/CodeSystem/$lookup?system=${coding.system}&code=${coding.code}&_format=xml`;
};

const TableCoding: FC<{ codings: Array<Coding> }> = ({ codings }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <b>Code</b>
          </th>
          <th>
            <b>Display</b>
          </th>
          <th>
            <b>System</b>
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {codings.map((coding) => (
          <TableRowCoding coding={coding} key={coding.id} />
        ))}
      </tbody>
    </table>
  );
};

const TableRowCoding: FC<{ coding: Coding }> = ({ coding }) => {
  return (
    <tr>
      <td>{coding.code}</td>
      <td>{coding.display}</td>
      <td>{coding.system}</td>
      <td>
        <a href={jsonUrl(coding)} className={styles.link}>
          JSON
        </a>
        <a href={xmlUrl(coding)} className={styles.link}>
          XML
        </a>
      </td>
    </tr>
  );
};

export const IndexPage: FC = () => {
  const [codings, setCodings] = useState<Coding[]>([]);
  const searchFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCodings([
      {
        id: "1",
        code: "123",
        display: "Test",
        system: "http://test.com",
      },
    ]);
  };
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>FHIR Roast Terminology Service</h1>

      <SearchForm onSubmit={searchFormHandler} />

      <hr />

      <div className={styles.content}>
        <TableCoding codings={codings} />
      </div>
    </div>
  );
};

export default IndexPage;
