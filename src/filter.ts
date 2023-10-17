import { execPromise } from "./execPromise";
import { mkTemp } from "./mkTemp";
import { rms } from "./rms";

interface FilterProps {
  inputFile: string;
  outputFile: string;
}

export const filter = async ({ inputFile, outputFile }: FilterProps) => {
  const tempFile = await mkTemp({
    ext: ".wav",
    dryRun: true,
  });

  await execPromise(`
    ffmpeg -i "${inputFile}" -af "highpass=f=300, lowpass=f=3000" -f wav pipe:1 |
    ffmpeg -i pipe: -af "afftdn=nf=-50:nr=97" ${tempFile}
    `);

  const rmsValue = await rms({ filePath: tempFile });

  await execPromise(`
    ffmpeg -i "${tempFile}" -af "volume=${-rmsValue}dB" ${outputFile}
    `);

  await execPromise(`rm ${tempFile}`);
};
