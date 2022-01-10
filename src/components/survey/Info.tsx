// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import BasicInputField from "../inputs/BasicInputField";
// import { BasicInputFieldData, InputFieldTypes } from "../inputs/InputFieldType";
// import { InfoProps } from "./infotypes";

// const Info: React.VFC<InfoProps> = ({
//     sectionTitle,
//     sectionSubtitle,
//     sectionData,
//     formState,
//     control,
// }) => {
//     return (
//         <Box
//             sx={{
//                 pb: 2,
//                 pt: 5,
//             }}
//         >
//             <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
//                 {sectionTitle}
//             </Typography>

//             <Typography variant="subtitle1" sx={{ mt: 2, mb: 4 }}>
//                 {sectionSubtitle}
//             </Typography>

//             {/* container */}
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     width: "60%",
//                 }}
//             >
//                 {sectionData.map((datum: BasicInputFieldData) => {
//                     const isBasic = datum.type === InputFieldTypes.BASIC;
//                     const isLong = datum.type === InputFieldTypes.LONG;
//                     if (isBasic || isLong) {
//                         return (
//                             <BasicInputField
//                                 {...datum.data}
//                                 key={datum.data.name}
//                                 control={control}
//                                 formState={formState}
//                                 isMultiline={isLong ?? true}
//                             />
//                         );
//                     } else {
//                         return <></>;
//                     }
//                 })}
//             </Box>
//         </Box>
//     );
// };

// export default Info;

import React from "react";

const Info = () => {
    return <div></div>;
};

export default Info;
