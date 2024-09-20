import type { NextApiRequest, NextApiResponse } from 'next';
import ipData from './ip.json'; // Directly importing ip.json
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const forwarded = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userIp = (forwarded as string).split(',')[0]; // Get the first IP (real IP)

  // Cast ipData to an array of IpRange
  const countryData = (ipData as IpRange[]).find((range) => 
    isIpInRange(userIp, range.start_ip, range.end_ip)
  );

  if (countryData) {
    res.status(200).json({ country_code: countryData.country_code });
  } else {
    res.status(404).json({ error: 'Country not found' });
  }
}
