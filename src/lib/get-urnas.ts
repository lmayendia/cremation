import { cookies } from "next/headers";
import { query } from "./strapi";

export async function getUrnasInfo() {
  // Read the user-country cookie
  const userCountryCookie = cookies().get('user-country')?.value || 'US';
  
  // Determine if the country code ends with 's' to use the appropriate pluralization
  const pluralSuffix = userCountryCookie.toLocaleLowerCase().endsWith('s') ? 'es' : 's';
  
  // Construct the query based on the plural suffix
  const res = await query(
    `urnas-${userCountryCookie.toLocaleLowerCase()}${pluralSuffix}?fields=id,documentId,name,isAvailable,price,description,url&populate[image][fields]=url`
  );
  
  return res;
}
