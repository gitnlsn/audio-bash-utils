import { record } from "../record";
import { recordWithFilter } from "../recordWithFilter";
import { rms } from "../rms";

interface UseRMSProps {
  filter: boolean;
}

const useRecord = async ({ filter }: UseRMSProps) => {
  if (filter) {
    return await recordWithFilter({
      duration: 10,
    });
  }

  return await record({
    duration: 10,
  });
};

const args = process.argv.slice(2);
useRecord({ filter: args[0] === "-f" })
  .then(({ outPath }) => console.log(outPath))
  .catch(console.error);
