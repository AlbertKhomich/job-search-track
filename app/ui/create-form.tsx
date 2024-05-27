"use client";

import { Label, TextInput, Card, Radio } from "flowbite-react";
import { addCompany } from "../lib/actions";
import { Datepicker } from "flowbite-react";
import { useFormState } from "react-dom";
import { Badge } from "flowbite-react";
import SaveButton from "./save-button";
import { useEffect, useRef } from "react";

export const statuses = [
  "Beworben",
  "Absage",
  "Vorstellungsgespräch",
  "Angebot",
];

export const colors = ["gray", "failure", "warning", "success"];

export default function AddForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(addCompany, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Card className="max-w-sm w-full">
      <form action={dispatch} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="companyName" value="Company Name" />
          </div>
          <TextInput
            id="companyName"
            name="companyName"
            type="text"
            aria-describedby="company-error"
            ref={inputRef}
          />
          <div id="company-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
                  defaultChecked={index === 0 ?? true}
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
        <Datepicker weekStart={1} name="date" />
        <SaveButton />
      </form>
    </Card>
  );
}
