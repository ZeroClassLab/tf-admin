import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { serviceTypeListState } from "../../servicetype/recoils";
import MenuItem from "@mui/material/MenuItem";
import { formServiceTypeState } from "../recoils";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectUi from "../wrappedUi/SelectUi";

const LABEL_ID = "editpage-service-label-id";
const LABEL = "서비스";

const FormServiceTypeSelect = () => {
    const serviceTypeList = useRecoilValue(serviceTypeListState);
    const [serviceEditorType, setServiceEditorType] =
        useRecoilState(formServiceTypeState);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const selectedService = serviceTypeList.filter(
            (service) => `${service.name}` === value
        )[0];
        setServiceEditorType(selectedService);
    };
    return (
        <SelectUi
            labelId={LABEL_ID}
            label={LABEL}
            value={serviceEditorType.name}
            handleChange={handleChange}
        >
            {serviceTypeList
                .filter((service) => service.isValid)
                .map((service) => {
                    return (
                        <MenuItem
                            key={`service-${service._id}`}
                            value={`${service.name}`}
                        >
                            {service.name}
                        </MenuItem>
                    );
                })}
        </SelectUi>
    );
};

export default FormServiceTypeSelect;
