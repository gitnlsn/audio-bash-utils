import { execPromise } from './execPromise';

interface ConvertProps {
  filePath: string;
  outfilePath: string;
}

export const convert = async ({
  filePath,
  outfilePath,
}: ConvertProps) => {
  return await execPromise(`ffmpeg -y -i ${filePath} -ar 16000 ${outfilePath}`);
};
