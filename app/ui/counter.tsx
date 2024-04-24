import { Card } from "flowbite-react";

export default function CounterCard({ countTotal }: { countTotal: number }) {
  return (
    <Card className="max-w-sm w-52 text-center mb-4">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Total: {countTotal}
      </h5>
    </Card>
  );
}
