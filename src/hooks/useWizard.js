import { useContext } from "react";
import WizardContext from "../components/Wizard";

function useWizard() {
  return useContext(WizardContext);
}

export default useWizard;
