import { execPromise } from "./execPromise";
import { mkTemp } from "./mkTemp";

interface RecordProps {
  duration?: number;
}

export const record = async ({ duration = 10 }: RecordProps) => {
  const outPath = await mkTemp({
    ext: ".wav",
    dryRun: true,
  });

  await execPromise(
    `arecord -d ${duration} -f cd | ffmpeg -i pipe: ${outPath}`
  );

  return {
    outPath,
  };
};
