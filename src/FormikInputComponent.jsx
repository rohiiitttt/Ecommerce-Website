import { useField } from "formik";
import InputComponent from "./InputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const FormikInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block mb-2 font-bold text-gray-700 sr-only">
        {label}
      </label>
      <InputComponent {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default FormikInputComponent;
