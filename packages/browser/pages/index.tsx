import * as styles from "./index.module.css";

import { FC, useState } from "react";

export const IndexPage: FC = () => {
  const [title, setTitle] = useState("test");
  return (
    <div>
      <h1>FHIR Roast Terminology Service</h1>
      <h2>{title}</h2>
      <button onClick={() => setTitle("test2")}>Test</button>
      <form>
        <input type="text" placeholder="Query" />
        <input type="submit" value="Search" />
      </form>
      <table>
        <tr>
          <th>Code</th>
          <th>Display</th>
          <th>System</th>
          <th></th>
        </tr>
        <tr>
          <td>123</td>
          <td>Test</td>
          <td>http://test.com</td>
          <td>
            <a href="#" className={styles.link}>
              JSON
            </a>
            <a href="#" className={styles.link}>
              XML
            </a>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default IndexPage;
