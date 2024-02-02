'use client'

import { Inputs } from "@/actions/superadmin-toggles-actions";
import { useToggle } from "@/hooks/toogle.hook";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

type Props = {
  type: Inputs;
  id: string;
};

const ToggleButon = ({ id, type }: Props) => {
  const { isLoading, toggle } = useToggle({ id, type });

  return (
    <Button onClick={toggle} disabled={isLoading}>
      Activate {isLoading && <Loader className="w-3 h-3 ml-2 animate-spin" />}
    </Button>
  );
};

export default ToggleButon;
