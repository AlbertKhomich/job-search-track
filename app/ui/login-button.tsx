import { Button } from "flowbite-react";
import { useFormStatus } from "react-dom";

export default function LogInButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} isProcessing={pending}>
      Log in
    </Button>
  );
}
