import { execPromise } from "./execPromise";
import { mkTemp } from "./mkTemp";
import { rms } from "./rms";

interface RecordWithFilterProps {
  duration?: number;
}

export const recordWithFilter = async ({
  duration = 10,
}: RecordWithFilterProps) => {
  const tempPath = await mkTemp({
    ext: ".wav",
    dryRun: true,
  });

  const outPath = await mkTemp({
    ext: ".wav",
    dryRun: true,
  });

  await execPromise(`
    arecord -d ${duration} -f cd | 
        ffmpeg -i pipe: -af "highpass=f=200, lowpass=f=3000" -f wav pipe:1 |
        ffmpeg -i pipe: -af "afftdn=nf=-20:nr=97" ${tempPath}
  `);

  const rmsValue = await rms({
    filePath: tempPath,
  });

  await execPromise(`
    ffmpeg -i "${tempPath}" -af "volume=${-rmsValue}dB" ${outPath}
  `);

  await execPromise(`rm ${tempPath}`);

  return {
    outPath,
  };
};
