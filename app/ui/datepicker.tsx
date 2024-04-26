"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";
import { Datepicker } from "flowbite-react";

export default function DatePicker({
  dateStart,
  dateEnd,
}: {
  dateStart: string;
  dateEnd: string;
}) {
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

  const handleDateEnd = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("endDate", term);
    } else {
      params.delete("endDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="inline-grid grid-cols-2">
      <div className="w-auto mr-4">
        <Datepicker
          title="From"
          weekStart={1}
          name="from"
          defaultDate={new Date(dateStart)}
          onSelectedDateChanged={(date) => {
            handleDateStart(moment(date).format("YYYY.MM.DD"));
          }}
        />
      </div>
      <div className="w-auto mr-4">
        <Datepicker
          title="To"
          name="to"
          weekStart={1}
          defaultDate={new Date(dateEnd)}
          onSelectedDateChanged={(date) => {
            handleDateEnd(moment(date).format("YYYY.MM.DD"));
          }}
        />
      </div>
    </div>
  );
}
