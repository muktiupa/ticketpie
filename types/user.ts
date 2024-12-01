export interface User {
  username: string;
  agencyDetails?: {
    brandName?: string;
    companyName?: string;
    address?: string;
    gstin?: string;
    support?: {
      phone?: string;
      email?: string;
      whatsapp?: string;
    };
    logo?: string;
  };
}

