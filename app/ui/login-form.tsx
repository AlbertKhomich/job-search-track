"use client";

import { useFormState } from "react-dom";
import { authenticate } from "../lib/actions";
import { Card, Label, TextInput } from "flowbite-react";
import LogInButton from "./login-button";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Card className="max-w-sm w-full">
      <form action={dispatch} className="flex flex-col gap-4">
        <div>
          <h1 className="mb-4">Please log in to continue.</h1>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <div className="mb-2 mt-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            minLength={6}
          />
        </div>
        <div id="company-error" aria-live="polite" aria-atomic="true"></div>
        <LogInButton />
        <div aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </Card>
  );
}
