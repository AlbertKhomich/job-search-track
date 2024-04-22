export type CompaniesTableType = {
  id: string;
  name: string;
  status: "Beworben" | "Absage" | "Vorstellungsgespräch" | "Angebot";
  date: Date;
};
