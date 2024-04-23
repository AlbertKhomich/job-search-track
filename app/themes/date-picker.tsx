import type { CustomFlowbiteTheme } from "flowbite-react";

export const customThemeDatePicker: CustomFlowbiteTheme["datepicker"] = {
  popup: {
    root: {
      inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-sky-950",
    },
    header: {
      selectors: {
        button: {
          base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-neutral-300 dark:text-cyan-950 dark:hover:bg-neutral-200",
        },
      },
    },
    footer: {
      button: {
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-neutral-300 dark:text-cyan-950 dark:hover:bg-neutral-200",
      },
    },
  },
  views: {
    days: {
      header: {
        title:
          "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-cyan-600",
      },
      items: {
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-red-600",
        },
      },
    },
    months: {
      items: {
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-red-600",
        },
      },
    },
    years: {
      items: {
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-red-600",
        },
      },
    },
    decades: {
      items: {
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-red-600",
        },
      },
    },
  },
};
