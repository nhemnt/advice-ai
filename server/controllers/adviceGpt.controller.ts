import { openai } from '@/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next'
import { MissingFieldError, InternalError } from '../errors';


function generatePrompt(data: string) {
  return `People come to you seeking advice on various personal and professional issues. You have a wealth of experience and knowledge, and you enjoy helping others by offering guidance and support. For the following problem or concern: ${data}, please provide concise and helpful advice (20-50 words).`;
}

type Body = {
  prompt: string;
};

export const adviceGpt = async (req: NextApiRequest, res: NextApiResponse) => {
  const { OPENAI_API_KEY } = process.env;

 
  if (OPENAI_API_KEY === null) {
    throw new MissingFieldError('Missing webhook URI');
  }
 


  try {
  const { prompt } = req.body as Body;


  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(prompt),
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [":"],
  });
  res.status(200).json({ result: response.data.choices[0].text });
}
catch(err: any){
    // err contains sensitive info
    throw new InternalError(err);
  }
};
