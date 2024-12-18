// app/api/pricing/[country]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/strapi';
import { PricingData } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  const { country } = params;

  if (!country) {
    return NextResponse.json(
      { error: 'Country parameter is required.' },
      { status: 400 }
    );
  }
  try {
    const pluralSuffix = country.toLocaleLowerCase().endsWith("s") ? "es" : "s";
    console.log("Plural", pluralSuffix)
    console.log(`Fetching to: pricing-${country.toLowerCase()}${pluralSuffix}`)
    const data: PricingData = await query(`pricing-${country.toLowerCase()}${pluralSuffix}`);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json(
      { error: 'An error occurred fetching the pricing.' },
      { status: 500 }
    );
  }
}
