import { FC } from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const SearchForm: FC<SearchFormProps> = (props) => {
  return (
    <form className={styles.form} {...props}>
      <input type="text" placeholder="Query" className={styles.textInput} />
      <input type="submit" value="Search" className={styles.submit} />
    </form>
  );
};

export default SearchForm;
