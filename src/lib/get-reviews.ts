import { query } from "./strapi";

export async function getReviews() {
  // Read the user-country cookie
  const res = await query(
    `testimonios?fields[0]=name&fields[1]=location&fields[2]=testimonial&populate[img][fields]=url`
  );
  return res;
}
