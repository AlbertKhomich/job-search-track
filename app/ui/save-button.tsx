import { Button } from "flowbite-react";
import { useFormStatus } from "react-dom";

export default function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} isProcessing={pending}>
      Save
    </Button>
  );
}
