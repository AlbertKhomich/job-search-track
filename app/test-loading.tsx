import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    </div>
  );
}
