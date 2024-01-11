import axios from 'axios';
const SBT_MINT_API_URL = 'https://trust-authy-api.vercel.app/api/mintTo';

export async function mintToAPI(toAddress: string): Promise<any> {
  try {
    const response = await axios.post(
      SBT_MINT_API_URL,
      {
        to: toAddress,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
