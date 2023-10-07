import { rms } from "../rms";

interface UseRMSProps {
  filePath: string;
}

const useRMS = async ({ filePath }: UseRMSProps) => {
  const value = await rms({
    filePath,
  });

  return {
    rms: value,
  };
};

const args = process.argv.slice(2);
useRMS({ filePath: args[0] })
  .then(({ rms }) => console.log(rms))
  .catch(console.error);
