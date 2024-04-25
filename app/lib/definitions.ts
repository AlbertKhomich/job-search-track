export type CompaniesTableType = {
  id: string;
  name: string;
  status: "Beworben" | "Absage" | "Vorstellungsgespräch" | "Angebot";
  date: string;
};

export type CompanyField = {
  id: string;
  name: string;
};

export type ActionForm = {
  id: string;
  name: string;
  company_id: string;
  status: "Beworben" | "Absage" | "Vorstellungsgespräch" | "Angebot";
  date: string;
};
