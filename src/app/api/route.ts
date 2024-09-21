import type { NextApiRequest, NextApiResponse } from 'next';
import prData from './ip_PR.json';
import usData from './ip_US.json';
import coData from './ip_CO.json';
import { IpRange } from '@/types'; // Importing the IpRange type

// Function to compare two IP addresses
function isIpInRange(ip: string, startIp: string, endIp: string): boolean {
  const ipParts = ip.split('.').map(Number);
  const startIpParts = startIp.split('.').map(Number);
  const endIpParts = endIp.split('.').map(Number);

  for (let i = 0; i < 4; i++) {
    if (ipParts[i] < startIpParts[i] || ipParts[i] > endIpParts[i]) {
      return false;
    }
  }
  return true;
}

// Helper function to check in a specific file's data
function findCountryByIp(ip: string, data: IpRange[]): IpRange | undefined {
  return data.find((range) => isIpInRange(ip, range.start_ip, range.end_ip));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const forwarded = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userIp = (forwarded as string).split(',')[0]; // Get the first IP (real IP)

    // Type assertion for JSON imports as IpRange[]
    const prIpData = prData as IpRange[];
    const usIpData = usData as IpRange[];
    const coIpData = coData as IpRange[];

    // Check in PR, then CO, and fallback to US
    let countryData: IpRange | undefined = findCountryByIp(userIp, prIpData);

    if (!countryData) {
      countryData = findCountryByIp(userIp, coIpData); // Check CO if PR is not found
    }

    // Fallback to US in any case where no match is found
    if (!countryData) {
      countryData = findCountryByIp(userIp, usIpData);
    }

    // Return the matched country data, or fallback to US if still undefined
    res.status(200).json({ country_code: countryData?.country_code || 'US' });
  } catch (error) {
    // On any error, fallback to US
    res.status(200).json({ country_code: 'US' });
  }
}
