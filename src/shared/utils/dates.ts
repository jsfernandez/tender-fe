import { COUNTRY_LABEL } from "../../const/times"

export const convertToCLTime = (date: Date): string => {

    return (date).toLocaleDateString(COUNTRY_LABEL.CL, { day:"2-digit", month: "long", year:"numeric" })
}
