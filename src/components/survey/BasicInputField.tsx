// import { Controller } from "react-hook-form";

// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import FormHelperText from "@mui/material/FormHelperText";

// import { useLocalStorage } from "../hook/useLocalStorage";
// import { BasicInputFieldProps } from "./InputFieldType";

// interface BasicInputFieldProps {}

// const BasicInputField: React.VFC<BasicInputFieldProps> = ({
//     id, // element
//     name,
//     label,
//     // autoComplete,
//     // localStorageValueKey,

//     control,
//     formState,

//     isMultiline = false,
// }) => {
//     const [value, setValue] = useLocalStorage(localStorageValueKey ?? name, "");
//     return (
//         <>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field }) => (
//                     <FormControl sx={{ mt: 2, mb: 2 }}>
//                         <TextField
//                             id={id}
//                             label={label}
//                             variant={isMultiline ? "outlined" : "standard"}
//                             multiline={isMultiline}
//                             rows={isMultiline ? 6 : undefined}
//                             autoComplete={autoComplete ?? name}
//                             {...field}
//                             value={value}
//                             onChange={(e) => {
//                                 setValue(e.target.value);
//                                 return field.onChange(e.target.value);
//                             }}
//                             error={!!formState.errors?.[name]}
//                         />
//                         <FormHelperText error={!!formState.errors?.[name]}>
//                             {formState.errors &&
//                                 formState.errors?.[name]?.message}
//                         </FormHelperText>
//                     </FormControl>
//                 )}
//             />
//         </>
//     );
// };

// export default BasicInputField;
import React from "react";

const BasicInputField = () => {
    return <div></div>;
};

export default BasicInputField;
