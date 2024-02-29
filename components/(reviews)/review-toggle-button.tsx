"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { toggleReview } from "@/actions/review-toggle-action";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type Props = {
  id: string;
  state: boolean;
};

const ReviewToggleButton = ({ id, state }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleToggle = async () => {
    try {
      setIsLoading(true);
      const res = await toggleReview(id);
      if (!res.success) return toast.error(res.error);
      else {
        toast.success("Successfilly toggled");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleToggle}>
      {!!state ? "Disable" : "Enable"}{" "}
      {isLoading && <Loader className="ml-3 h-3 w-3 animate-spin" />}
    </Button>
  );
};

export default ReviewToggleButton;
