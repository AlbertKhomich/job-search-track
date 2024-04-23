"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";
import { Datepicker } from "flowbite-react";
import { customThemeDatePicker } from "../themes/date-picker";

export default function DatePicker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleDateStart = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("startDate", term);
    } else {
      params.delete("startDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleDateEnd = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("endDate", term);
    } else {
      params.delete("endDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="grid grid-cols-2">
      <div className="mx-3">
        <Datepicker
          theme={customThemeDatePicker}
          title="From"
          weekStart={1}
          defaultDate={new Date("2024.01.01")}
          onSelectedDateChanged={(date) => {
            handleDateStart(moment(date).format("YYYY.MM.DD"));
          }}
        />
      </div>
      <div className="mx-3">
        <Datepicker
          theme={customThemeDatePicker}
          title="To"
          weekStart={1}
          onSelectedDateChanged={(date) => {
            handleDateEnd(moment(date).format("YYYY.MM.DD"));
          }}
        />
      </div>
    </div>
  );
}
