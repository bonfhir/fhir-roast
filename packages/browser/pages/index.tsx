import * as styles from "./index.module.css";

import { FC } from "react";

const IndexPage: FC = () => {
  return (
    <div>
      <h1>FHIR Roast Terminology Service</h1>
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
