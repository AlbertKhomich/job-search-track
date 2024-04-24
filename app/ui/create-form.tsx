import { Button, Label, TextInput, Card } from "flowbite-react";
import { addCompany } from "../lib/actions";

export default function AddForm() {
  return (
    <Card className="max-w-sm w-full">
      <form action={addCompany} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="companyName" value="Company Name" />
          </div>
          <TextInput id="companyName" name="companyName" type="text" required />
        </div>
        <Button className="w-16" type="submit">
          Save
        </Button>
      </form>
    </Card>
  );
}
