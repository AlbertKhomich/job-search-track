import { Badge, Card } from "flowbite-react";
import { EditCompany, UpdateCompany } from "./buttons";
import { DeleteAction } from "./deleteModal";
import { Session } from "next-auth";
import moment from "moment";

export default function Company({
  name,
  status,
  date,
  id,
  session,
}: {
  name: string;
  status: "Beworben" | "Absage" | "Vorstellungsgespräch" | "Angebot";
  date: string;
  id: string;
  session: Session | null;
}) {
  const d = moment(date).format("DD.MM.YYYY");

  const badges = {
    Beworben: "gray",
    beworben: "gray",
    Absage: "failure",
    Vorstellungsgespräch: "warning",
    Angebot: "success",
  };

  return (
    <>
      <Card className="w-full lg:w-8/12 mb-1">
        <div className="sm:flex">
          <div className="flex-1">
            <p className="pb-2 md:pb-0 text-gray-900 dark:text-white font-bold">
              {name}&nbsp;
            </p>
          </div>
          <div className="flex">
            <Badge color={badges[`${status}`]}>{status}&nbsp;</Badge>
          </div>
          <div>
            <p className="pt-2 md:pt-0 text-gray-600 dark:text-gray-400 text-end ms-5">
              {d}&nbsp;
            </p>
          </div>
          {session?.user && (
            <>
              <div className="flex">
                <div className="flex-1 me-5 ms-5">
                  <UpdateCompany id={id} />
                </div>
                <div className="flex-1 me-5">
                  <EditCompany id={id} />
                </div>
                <div className="flex-1">
                  <DeleteAction id={id} companyTitle={name} />
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  );
}
