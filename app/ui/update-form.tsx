"use client";

import {
  Card,
  Label,
  TextInput,
  Radio,
  Datepicker,
  Button,
} from "flowbite-react";
import { updateAction } from "../lib/actions";
import { ActionForm } from "../lib/definitions";
import { statuses } from "./create-form";

export default function UpdateActionForm({ action }: { action: ActionForm }) {
  const updateActionWithId = updateAction.bind(null, action.id);

  return (
    <Card className="max-w-sm w-full">
      <form action={updateActionWithId} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="companyName" value="Company Name" />
          </div>
          <TextInput
            id="companyName"
            defaultValue={action.name}
            name="companyName"
            type="text"
            disabled
          />
        </div>
        <fieldset className="flex max-w-md flex-col gap-4">
          <legend className="mb-4">Set Status</legend>
          {statuses.map((status, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <Radio
                  id={status}
                  name="status"
                  value={status}
                  defaultChecked={status === action.status ?? true}
                />
                <Label htmlFor={status}>{status}</Label>
              </div>
            );
          })}
        </fieldset>
        <Datepicker weekStart={1} name="date" />
        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
}
