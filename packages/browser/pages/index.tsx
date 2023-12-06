import { Coding } from "@bonfhir/core/r5";
import styles from "./index.module.css";

import { FC, useState } from "react";

const jsonUrl = (coding: Coding) => {
  return `/CodeSystem/$lookup?system=${coding.system}&code=${coding.code}&_format=json`;
};

const xmlUrl = (coding: Coding) => {
  return `/CodeSystem/$lookup?system=${coding.system}&code=${coding.code}&_format=xml`;
};

interface SearchFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const SearchForm: FC<SearchFormProps> = (props) => {
  return (
    <form {...props}>
      <input type="text" placeholder="Query" />
      <input type="submit" value="Search" />
    </form>
  );
};

const TableCoding: FC<{ codings: Array<Coding> }> = ({ codings }) => {
  return (
    <table>
      <tr>
        <th>Code</th>
        <th>Display</th>
        <th>System</th>
        <th></th>
      </tr>
      {codings.map((coding) => (
        <TableRowCoding coding={coding} />
      ))}
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
        code: "123",
        display: "Test",
        system: "http://test.com",
      },
    ]);
  };
  return (
    <div className={styles.pageContainer}>
      <h1 className="title">FHIR Roast Terminology Service</h1>
      <SearchForm onSubmit={searchFormHandler} />
      <TableCoding codings={codings} />
    </div>
  );
};

export default IndexPage;
