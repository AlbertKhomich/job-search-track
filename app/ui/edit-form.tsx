"use client";

import { Card, Label, TextInput, Radio, Datepicker } from "flowbite-react";
import { editAction } from "../lib/actions";
import { ActionForm } from "../lib/definitions";
import { statuses, colors } from "./create-form";
import { useFormState, useFormStatus } from "react-dom";
import { Badge } from "flowbite-react";
import SaveButton from "./save-button";

export default function EditActionForm({ action }: { action: ActionForm }) {
  const updateActionWithId = editAction.bind(null, action.id);
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(updateActionWithId, initialState);
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <Card className="max-w-sm w-full">
      <form action={dispatch} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="companyName" value="Company Name" />
          </div>
          <TextInput
            id="companyName"
            defaultValue={action.name}
            name="companyName"
            type="text"
            aria-describedby="company-error"
          />
        </div>
        <div id="company-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
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
                <Label htmlFor={status}>
                  <div className="flex flex-wrap gap-2">
                    <Badge color={colors[index]}>{status}</Badge>
                  </div>
                </Label>
              </div>
            );
          })}
        </fieldset>
        <Datepicker
          weekStart={1}
          name="date"
          defaultDate={new Date(action.date)}
        />
        <SaveButton />
      </form>
    </Card>
  );
}
