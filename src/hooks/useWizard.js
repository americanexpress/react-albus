import { useContext } from "react";
import WizardContext from "../wizardContext";

function useWizard() {
  return useContext(WizardContext);
}

export default useWizard;
